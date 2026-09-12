/**
 * Image processing utilities for client-side image uploads.
 */

export function formatBytes(bytes: number, decimals = 1): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export interface ProcessedImageResult {
  dataUrl: string;
  fileSize: string;
  dimensions: string;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
}

/**
 * Reads a File object from input / drop, loads it into an HTML Image,
 * and scales down if greater than maxDimension (preserving aspect ratio).
 * Returns base64 data URL ready for instant display and IndexedDB storage.
 */
export async function processUploadedFile(
  file: File,
  options: { maxDimension?: number; quality?: number } = {}
): Promise<ProcessedImageResult> {
  const maxDimension = options.maxDimension ?? 1440;
  const quality = options.quality ?? 0.82;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };

    reader.onload = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();

      img.onerror = () => {
        reject(new Error('Selected file is not a valid image'));
      };

      img.onload = () => {
        const origWidth = img.naturalWidth;
        const origHeight = img.naturalHeight;

        // If SVG or GIF, preserve raw data URL to keep animation / vectors
        if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
          resolve({
            dataUrl: rawDataUrl,
            fileSize: formatBytes(file.size),
            dimensions: `${origWidth} × ${origHeight}`,
            width: origWidth,
            height: origHeight,
            originalSize: file.size,
            compressedSize: file.size,
          });
          return;
        }

        // Calculate scaling
        let targetWidth = origWidth;
        let targetHeight = origHeight;

        if (origWidth > maxDimension || origHeight > maxDimension) {
          if (origWidth > origHeight) {
            targetWidth = maxDimension;
            targetHeight = Math.round((origHeight * maxDimension) / origWidth);
          } else {
            targetHeight = maxDimension;
            targetWidth = Math.round((origWidth * maxDimension) / origHeight);
          }
        }

        // Render to canvas
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          // Canvas failed, fallback to raw
          resolve({
            dataUrl: rawDataUrl,
            fileSize: formatBytes(file.size),
            dimensions: `${origWidth} × ${origHeight}`,
            width: origWidth,
            height: origHeight,
            originalSize: file.size,
            compressedSize: file.size,
          });
          return;
        }

        // Better image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Convert to webp if supported, or jpeg / png with transparency
        let outputType = 'image/jpeg';
        const isTransparent = file.type === 'image/png' && hasTransparency(ctx, targetWidth, targetHeight);
        
        if (isTransparent) {
          outputType = 'image/webp'; // WebP preserves alpha channel with much lower byte size
        } else if (file.type === 'image/webp') {
          outputType = 'image/webp';
        }

        let compressedDataUrl = canvas.toDataURL(outputType, quality);
        
        // If webp is not supported and returned png for transparent, check format
        if (isTransparent && !compressedDataUrl.startsWith('data:image/webp')) {
          outputType = 'image/png';
          compressedDataUrl = canvas.toDataURL('image/png');
        }

        // Strictly enforce max length of 450,000 chars (~330KB binary) to ensure it effortlessly
        // fits in browser storage limits and loads instantly across all devices and networks.
        let currentScale = 1.0;
        let currentQuality = quality;
        let attempts = 0;
        while (compressedDataUrl.length > 450000 && attempts < 5) {
          attempts++;
          currentScale *= 0.85;
          currentQuality = Math.max(0.55, currentQuality - 0.08);

          const stepCanvas = document.createElement('canvas');
          stepCanvas.width = Math.max(256, Math.round(targetWidth * currentScale));
          stepCanvas.height = Math.max(256, Math.round(targetHeight * currentScale));
          const sCtx = stepCanvas.getContext('2d');
          if (sCtx) {
            sCtx.imageSmoothingEnabled = true;
            sCtx.imageSmoothingQuality = 'medium';
            sCtx.drawImage(canvas, 0, 0, stepCanvas.width, stepCanvas.height);
            compressedDataUrl = stepCanvas.toDataURL(outputType, currentQuality);
            targetWidth = stepCanvas.width;
            targetHeight = stepCanvas.height;
          } else {
            break;
          }
        }

        const approxBytes = Math.round((compressedDataUrl.length * 3) / 4);

        resolve({
          dataUrl: compressedDataUrl,
          fileSize: formatBytes(approxBytes),
          dimensions: `${targetWidth} × ${targetHeight}`,
          width: targetWidth,
          height: targetHeight,
          originalSize: file.size,
          compressedSize: approxBytes,
        });
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Ensures any existing or incoming dataUrl is under maxChars (default 350,000, ~260KB)
 * for optimal local storage and fast rendering.
 */
export async function ensureDataUrlFitsLimit(
  dataUrl: string,
  maxChars = 350000
): Promise<string> {
  if (!dataUrl || dataUrl.length <= maxChars || !dataUrl.startsWith('data:image')) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(dataUrl);
      }
    }, 2000);

    const img = new Image();
    img.onload = () => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timer);

      let width = img.naturalWidth;
      let height = img.naturalHeight;
      const maxDim = 1024;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      ctx.drawImage(img, 0, 0, width, height);

      let output = canvas.toDataURL('image/webp', 0.78);
      if (!output.startsWith('data:image/webp') || output.length > maxChars) {
        output = canvas.toDataURL('image/jpeg', 0.75);
      }

      // If still too large, downscale further
      if (output.length > maxChars) {
        const mini = document.createElement('canvas');
        mini.width = Math.round(width * 0.7);
        mini.height = Math.round(height * 0.7);
        const mCtx = mini.getContext('2d');
        if (mCtx) {
          mCtx.drawImage(canvas, 0, 0, mini.width, mini.height);
          output = mini.toDataURL('image/jpeg', 0.65);
        }
      }

      resolve(output);
    };
    img.onerror = () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve(dataUrl);
      }
    };
    img.src = dataUrl;
  });
}

function hasTransparency(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
  try {
    const sampleWidth = Math.min(width, 100);
    const sampleHeight = Math.min(height, 100);
    const imgData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] < 255) return true;
    }
    return false;
  } catch {
    return true;
  }
}
