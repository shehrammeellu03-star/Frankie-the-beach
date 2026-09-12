import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateIcons() {
  const iconSvgPath = path.resolve('public/icon.svg');
  const maskableSvgPath = path.resolve('public/icon-maskable.svg');

  const iconSvg = fs.readFileSync(iconSvgPath);
  const maskableSvg = fs.readFileSync(maskableSvgPath);

  console.log('Generating PWA icons with sharp...');

  // 1. pwa-192x192.png
  await sharp(iconSvg)
    .resize(192, 192)
    .png()
    .toFile('public/pwa-192x192.png');
  console.log('Generated public/pwa-192x192.png');

  // 2. pwa-512x512.png
  await sharp(iconSvg)
    .resize(512, 512)
    .png()
    .toFile('public/pwa-512x512.png');
  console.log('Generated public/pwa-512x512.png');

  // 3. pwa-maskable-512x512.png
  await sharp(maskableSvg)
    .resize(512, 512)
    .png()
    .toFile('public/pwa-maskable-512x512.png');
  console.log('Generated public/pwa-maskable-512x512.png');

  // 4. apple-touch-icon.png (180x180)
  await sharp(iconSvg)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');
  console.log('Generated public/apple-touch-icon.png');

  // 5. Duplicate to public/images/apple-touch-icon.png
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }
  fs.copyFileSync('public/apple-touch-icon.png', 'public/images/apple-touch-icon.png');
  console.log('Copied to public/images/apple-touch-icon.png');

  // 6. favicon.png (64x64)
  await sharp(iconSvg)
    .resize(64, 64)
    .png()
    .toFile('public/favicon.png');
  console.log('Generated public/favicon.png');

  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
