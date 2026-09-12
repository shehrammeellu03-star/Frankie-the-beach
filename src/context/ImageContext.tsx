import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UploadedImage, GalleryItem, MenuItem } from '../types';
import { OFFICIAL_MENU, CLIENT_IMAGES } from '../data/restaurantData';
import { DEFAULT_GALLERY_ITEMS } from '../data/galleryData';
import {
  getAllUploadedImages,
  saveUploadedImage,
  deleteUploadedImage as dbDeleteUploadedImage,
  getAllSlotOverrides,
  saveSlotOverride as dbSaveSlotOverride,
  deleteSlotOverride as dbDeleteSlotOverride,
  clearAllSlotOverrides,
  getAllCustomGalleryItems,
  saveCustomGalleryItem,
  deleteCustomGalleryItem as dbDeleteCustomGalleryItem,
  getAllCustomMenuItems,
  saveCustomMenuItem,
  deleteCustomMenuItem as dbDeleteCustomMenuItem,
  exportAllMediaData,
  importMediaData,
  clearEntireMediaDb,
  getStoredOverridesSync,
  isMockupUrl,
} from '../utils/imageDb';
import { processUploadedFile, formatBytes } from '../utils/imageHelpers';
import { getAllAliasesForSlot, resolveImageOverride } from '../utils/slotMapping';

interface UploadOptions {
  destination?: 'library' | 'menu' | 'site' | 'gallery' | 'gallery-slot' | 'new-menu-item' | 'logo';
  targetKey?: string;
  title?: string;
  category?: string;
  description?: string;
  price?: number;
}

interface ImageContextType {
  uploadedImages: UploadedImage[];
  slotOverrides: Record<string, string>;
  menuItems: MenuItem[];
  galleryItems: GalleryItem[];
  clientImages: typeof CLIENT_IMAGES;
  isLoading: boolean;
  storageStats: { imageCount: number; totalBytes: string };
  getImage: (slotKey: string, fallbackSrc: string) => string;
  uploadImage: (file: File, options?: UploadOptions) => Promise<UploadedImage>;
  assignSlotOverride: (slotKey: string, imageUrl: string) => Promise<void>;
  removeSlotOverride: (slotKey: string) => Promise<void>;
  deleteUploadedImage: (id: string) => Promise<void>;
  addCustomGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deleteCustomGalleryItem: (id: string) => Promise<void>;
  addCustomMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  deleteCustomMenuItem: (id: string) => Promise<void>;
  resetAllOverrides: () => Promise<void>;
  exportBackup: () => Promise<string>;
  importBackup: (jsonString: string) => Promise<boolean>;
  clearAllMedia: () => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  // Synchronous hydration from localStorage ensures immediate first-frame rendering
  const [slotOverrides, setSlotOverrides] = useState<Record<string, string>>(() => getStoredOverridesSync());
  const [customGalleryItems, setCustomGalleryItems] = useState<GalleryItem[]>([]);
  const [customMenuItems, setCustomMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Initial hydration from local IndexedDB
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [images, overrides, gallery, menu] = await Promise.all([
          getAllUploadedImages(),
          getAllSlotOverrides(),
          getAllCustomGalleryItems(),
          getAllCustomMenuItems(),
        ]);
        if (isMounted) {
          const cleanOverrides: Record<string, string> = {};
          for (const [k, v] of Object.entries(overrides)) {
            if (typeof v === 'string' && !isMockupUrl(v)) {
              cleanOverrides[k] = v;
            }
          }
          setUploadedImages(images);
          setSlotOverrides((prev) => ({ ...prev, ...cleanOverrides }));
          setCustomGalleryItems(gallery);
          setCustomMenuItems(menu);
        }
      } catch (e) {
        console.warn('Failed to load media state from IndexedDB:', e);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Listen for media update events across window/tabs
  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail?.cleared) {
        setSlotOverrides({});
      } else if (custom.detail?.slotKey) {
        const { slotKey, imageUrl } = custom.detail;
        setSlotOverrides((prev) => {
          if (!imageUrl) {
            const next = { ...prev };
            delete next[slotKey];
            return next;
          }
          return { ...prev, [slotKey]: imageUrl };
        });
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'frankies_slot_overrides') {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : {};
          setSlotOverrides(parsed);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('frankies:media-update', handleUpdate);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('frankies:media-update', handleUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Compute reactive menuItems by applying overrides to OFFICIAL_MENU and adding custom items
  const menuItems = useMemo(() => {
    const hasOverrides = Object.keys(slotOverrides).length > 0;
    if (!hasOverrides && customMenuItems.length === 0) {
      return OFFICIAL_MENU;
    }

    const baseModified = hasOverrides
      ? OFFICIAL_MENU.map((item) => {
          const override = resolveImageOverride(`menu:${item.id}`, slotOverrides);
          if (override) {
            return { ...item, image: override, fallbackImage: override };
          }
          return item;
        })
      : OFFICIAL_MENU;

    const customWithOverrides = customMenuItems
      .filter((item) => (item.category as string) !== 'sides' && (item.category as string) !== 'drinks')
      .map((item) => {
        const override = hasOverrides ? resolveImageOverride(`menu:${item.id}`, slotOverrides) : undefined;
        if (override) {
          return { ...item, image: override, fallbackImage: override };
        }
        return item;
      });

    return [...baseModified, ...customWithOverrides];
  }, [slotOverrides, customMenuItems]);

  // Compute reactive galleryItems by merging DEFAULT_GALLERY_ITEMS + custom gallery items
  const galleryItems = useMemo(() => {
    const hasOverrides = Object.keys(slotOverrides).length > 0;
    if (!hasOverrides && customGalleryItems.length === 0) {
      return DEFAULT_GALLERY_ITEMS;
    }

    const defaultApplied = hasOverrides
      ? DEFAULT_GALLERY_ITEMS.map((item) => {
          const override = resolveImageOverride(`gallery:${item.id}`, slotOverrides);
          if (override) {
            return { ...item, src: override, fallbackSrc: override };
          }
          return item;
        })
      : DEFAULT_GALLERY_ITEMS;

    return [...customGalleryItems, ...defaultApplied];
  }, [slotOverrides, customGalleryItems]);

  // Compute reactive clientImages with site slot overrides
  const clientImages = useMemo(() => {
    if (Object.keys(slotOverrides).length === 0) {
      return CLIENT_IMAGES;
    }

    const copy: Record<string, string> = { ...CLIENT_IMAGES };
    for (const key of Object.keys(copy)) {
      const override = resolveImageOverride(key, slotOverrides);
      if (override) {
        copy[key] = override;
      }
    }
    // Also include extra homepage & attraction slot keys
    const extraKeys = ['heroBg', 'heroBurger', 'heroDrink', 'sunsetBeach', 'childrenScooter'];
    for (const key of extraKeys) {
      const override = resolveImageOverride(key, slotOverrides);
      if (override) {
        copy[key] = override;
      }
    }
    return copy as typeof CLIENT_IMAGES & Record<string, string>;
  }, [slotOverrides]);

  // Dynamically update browser tab favicon and touch icons whenever logo changes
  useEffect(() => {
    const currentLogo = clientImages.logo;
    if (!currentLogo) return;

    try {
      const selectors = [
        "link[rel*='icon']",
        "link[rel='apple-touch-icon']",
        "link[rel='apple-touch-icon-precomposed']",
      ];
      const existingLinks = document.querySelectorAll<HTMLLinkElement>(selectors.join(', '));
      if (existingLinks.length > 0) {
        existingLinks.forEach((link) => {
          link.href = currentLogo;
        });
      } else {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = currentLogo;
        document.head.appendChild(link);
      }
    } catch (e) {
      console.warn('Failed to update browser favicon:', e);
    }
  }, [clientImages.logo]);

  // Compute storage statistics
  const storageStats = useMemo(() => {
    let bytes = 0;
    uploadedImages.forEach((img) => {
      if (img.dataUrl) {
        bytes += Math.round((img.dataUrl.length * 3) / 4);
      }
    });
    return {
      imageCount: uploadedImages.length,
      totalBytes: formatBytes(bytes),
    };
  }, [uploadedImages]);

  // Helper to query any slot with fallback
  const getImage = useCallback(
    (slotKey: string, fallbackSrc: string): string => {
      return resolveImageOverride(slotKey, slotOverrides) || fallbackSrc;
    },
    [slotOverrides]
  );

  // Assign slot override with full alias mapping
  const assignSlotOverride = useCallback(async (slotKey: string, imageUrl: string) => {
    const allAliases = getAllAliasesForSlot(slotKey);
    const updates: Record<string, string> = {};
    for (const key of allAliases) {
      updates[key] = imageUrl;
      await dbSaveSlotOverride(key, imageUrl);
    }
    setSlotOverrides((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('frankies_slot_overrides', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const removeSlotOverride = useCallback(async (slotKey: string) => {
    const allAliases = getAllAliasesForSlot(slotKey);
    for (const key of allAliases) {
      await dbDeleteSlotOverride(key);
    }
    setSlotOverrides((prev) => {
      const next = { ...prev };
      allAliases.forEach((k) => delete next[k]);
      return next;
    });
  }, []);

  // Core Upload Image Function
  const uploadImage = useCallback(
    async (file: File, options: UploadOptions = {}): Promise<UploadedImage> => {
      const { dataUrl, fileSize, dimensions } = await processUploadedFile(file);

      const newId = 'img_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const title = options.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

      const newImage: UploadedImage = {
        id: newId,
        title,
        dataUrl,
        fileSize,
        dimensions,
        createdAt: Date.now(),
        category: options.category || 'general',
        assignedSlot: options.targetKey,
      };

      // Save to local IndexedDB
      await saveUploadedImage(newImage);
      setUploadedImages((prev) => [newImage, ...prev]);

      // If user specified a direct destination, apply it immediately to all aliases
      if (
        (options.destination === 'menu' ||
          options.destination === 'site' ||
          options.destination === 'gallery-slot' ||
          options.destination === 'logo' ||
          (options.destination === 'gallery' && options.targetKey)) &&
        (options.targetKey || options.destination === 'logo')
      ) {
        const target = options.destination === 'logo' ? 'site:logo' : options.targetKey!;
        await assignSlotOverride(target, dataUrl);
      } else if (options.destination === 'gallery') {
        const galleryItem: GalleryItem = {
          id: 'custom_g_' + Date.now(),
          src: dataUrl,
          fallbackSrc: dataUrl,
          title: options.title || title,
          category: (options.category as any) || 'burgers-dogs',
          desc: options.description || 'Uploaded beach photo from Frankie’s customer gallery.',
        };
        await saveCustomGalleryItem(galleryItem);
        setCustomGalleryItems((prev) => [galleryItem, ...prev]);
      } else if (options.destination === 'new-menu-item' && options.title) {
        const menuItem: MenuItem = {
          id: 'custom_m_' + Date.now(),
          name: options.title,
          price: options.price || 9.5,
          description: options.description || 'Freshly made beach favorite at Frankie’s @ The Beach.',
          image: dataUrl,
          fallbackImage: dataUrl,
          category: (options.category as any) || 'burgers',
          popular: true,
        };
        await saveCustomMenuItem(menuItem);
        setCustomMenuItems((prev) => [menuItem, ...prev]);
      }

      return newImage;
    },
    [assignSlotOverride]
  );

  const deleteUploadedImage = useCallback(
    async (id: string) => {
      const target = uploadedImages.find((img) => img.id === id);
      await dbDeleteUploadedImage(id);
      setUploadedImages((prev) => prev.filter((img) => img.id !== id));

      // Also clean up any slot overrides pointing to this image
      if (target?.dataUrl) {
        const toDeleteSlots: string[] = [];
        for (const [key, val] of Object.entries(slotOverrides)) {
          if (val === target.dataUrl) {
            toDeleteSlots.push(key);
            await dbDeleteSlotOverride(key);
          }
        }
        if (toDeleteSlots.length > 0) {
          setSlotOverrides((prev) => {
            const next = { ...prev };
            toDeleteSlots.forEach((k) => delete next[k]);
            return next;
          });
        }
      }
    },
    [uploadedImages, slotOverrides]
  );

  const addCustomGalleryItem = useCallback(async (item: Omit<GalleryItem, 'id'>) => {
    const fullItem: GalleryItem = {
      ...item,
      id: 'custom_g_' + Date.now(),
    };
    await saveCustomGalleryItem(fullItem);
    setCustomGalleryItems((prev) => [fullItem, ...prev]);
  }, []);

  const deleteCustomGalleryItem = useCallback(async (id: string) => {
    await dbDeleteCustomGalleryItem(id);
    setCustomGalleryItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const addCustomMenuItem = useCallback(async (item: Omit<MenuItem, 'id'>) => {
    const fullItem: MenuItem = {
      ...item,
      id: 'custom_m_' + Date.now(),
    };
    await saveCustomMenuItem(fullItem);
    setCustomMenuItems((prev) => [fullItem, ...prev]);
  }, []);

  const deleteCustomMenuItem = useCallback(async (id: string) => {
    await dbDeleteCustomMenuItem(id);
    setCustomMenuItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const resetAllOverrides = useCallback(async () => {
    await clearAllSlotOverrides();
    setSlotOverrides({});
    try {
      localStorage.removeItem('frankies_slot_overrides');
    } catch {}
  }, []);

  const exportBackup = useCallback(async () => {
    return await exportAllMediaData();
  }, []);

  const importBackup = useCallback(async (jsonString: string) => {
    const success = await importMediaData(jsonString);
    if (success) {
      const [images, overrides, gallery, menu] = await Promise.all([
        getAllUploadedImages(),
        getAllSlotOverrides(),
        getAllCustomGalleryItems(),
        getAllCustomMenuItems(),
      ]);
      setUploadedImages(images);
      setSlotOverrides(overrides);
      setCustomGalleryItems(gallery);
      setCustomMenuItems(menu);
      try {
        localStorage.setItem('frankies_slot_overrides', JSON.stringify(overrides));
      } catch {}
      return true;
    }
    return false;
  }, []);

  const clearAllMedia = useCallback(async () => {
    await clearEntireMediaDb();
    setUploadedImages([]);
    setSlotOverrides({});
    setCustomGalleryItems([]);
    setCustomMenuItems([]);
    try {
      localStorage.removeItem('frankies_slot_overrides');
    } catch {}
  }, []);

  return (
    <ImageContext.Provider
      value={{
        uploadedImages,
        slotOverrides,
        menuItems,
        galleryItems,
        clientImages,
        isLoading,
        storageStats,
        getImage,
        uploadImage,
        assignSlotOverride,
        removeSlotOverride,
        deleteUploadedImage,
        addCustomGalleryItem,
        deleteCustomGalleryItem,
        addCustomMenuItem,
        deleteCustomMenuItem,
        resetAllOverrides,
        exportBackup,
        importBackup,
        clearAllMedia,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};
