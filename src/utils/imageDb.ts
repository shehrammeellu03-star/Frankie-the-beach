import { UploadedImage, GalleryItem, MenuItem } from '../types';

const DB_NAME = 'frankies_media_db';
const DB_VERSION = 2;

const STORES = {
  IMAGES: 'uploaded_images',
  OVERRIDES: 'slot_overrides',
  GALLERY: 'custom_gallery_items',
  MENU: 'custom_menu_items',
};

const CURRENT_STORAGE_VERSION = 'v5_authentic_frankies_photos';

export function isMockupUrl(url: string | undefined): boolean {
  if (!url || typeof url !== 'string') return true;
  const lower = url.toLowerCase();
  return (
    lower.includes('unsplash.com') ||
    lower.includes('placeholder') ||
    lower.includes('mockup')
  );
}

// Synchronous read from localStorage with automatic cache invalidation of stale mockups
export function getStoredOverridesSync(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const version = localStorage.getItem('frankies_storage_version');
    if (version !== CURRENT_STORAGE_VERSION) {
      // Clear out legacy mock data that was previously cached in older versions
      localStorage.removeItem('frankies_slot_overrides');
      localStorage.setItem('frankies_storage_version', CURRENT_STORAGE_VERSION);
      return {};
    }

    const raw = localStorage.getItem('frankies_slot_overrides');
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const sanitized: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'string' && !isMockupUrl(value)) {
        sanitized[key] = value;
      }
    }
    return sanitized;
  } catch {
    return {};
  }
}

function openDb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORES.IMAGES)) {
          db.createObjectStore(STORES.IMAGES, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.OVERRIDES)) {
          db.createObjectStore(STORES.OVERRIDES, { keyPath: 'slotKey' });
        }
        if (!db.objectStoreNames.contains(STORES.GALLERY)) {
          db.createObjectStore(STORES.GALLERY, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.MENU)) {
          db.createObjectStore(STORES.MENU, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.warn('IndexedDB unavailable, using localStorage fallback');
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

// UPLOADED IMAGES
export async function getAllUploadedImages(): Promise<UploadedImage[]> {
  const db = await openDb();
  if (!db) {
    try {
      const raw = localStorage.getItem('frankies_local_images');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.IMAGES, 'readonly');
      const store = tx.objectStore(STORES.IMAGES);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

export async function saveUploadedImage(image: UploadedImage): Promise<void> {
  const db = await openDb();
  if (!db) {
    try {
      const all = await getAllUploadedImages();
      const next = [image, ...all.filter((i) => i.id !== image.id)];
      localStorage.setItem('frankies_local_images', JSON.stringify(next.slice(0, 5)));
    } catch {
      // ignore
    }
    return;
  }

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.IMAGES, 'readwrite');
      const store = tx.objectStore(STORES.IMAGES);
      store.put(image);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    } catch (e) {
      reject(e);
    }
  });
}

export async function deleteUploadedImage(id: string): Promise<void> {
  const db = await openDb();
  if (!db) {
    try {
      const all = await getAllUploadedImages();
      localStorage.setItem('frankies_local_images', JSON.stringify(all.filter((i) => i.id !== id)));
    } catch {
      // ignore
    }
    return;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.IMAGES, 'readwrite');
      const store = tx.objectStore(STORES.IMAGES);
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

// SLOT OVERRIDES (slotKey -> imageUrl)
export async function getAllSlotOverrides(): Promise<Record<string, string>> {
  const db = await openDb();
  if (!db) {
    try {
      const raw = localStorage.getItem('frankies_slot_overrides');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.OVERRIDES, 'readonly');
      const store = tx.objectStore(STORES.OVERRIDES);
      const req = store.getAll();
      req.onsuccess = () => {
        const records: Array<{ slotKey: string; imageUrl: string }> = req.result || [];
        const map: Record<string, string> = {};
        records.forEach((r) => {
          map[r.slotKey] = r.imageUrl;
        });
        resolve(map);
      };
      req.onerror = () => resolve({});
    } catch {
      resolve({});
    }
  });
}

export async function saveSlotOverride(slotKey: string, imageUrl: string): Promise<void> {
  // 1. Immediately mirror to localStorage for synchronous, zero-lag reads
  try {
    const raw = localStorage.getItem('frankies_slot_overrides');
    const map = raw ? JSON.parse(raw) : {};
    map[slotKey] = imageUrl;
    localStorage.setItem('frankies_slot_overrides', JSON.stringify(map));
  } catch {
    // ignore quota/privacy errors
  }

  // 2. Broadcast change event across window
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('frankies:media-update', { detail: { slotKey, imageUrl } }));
  }

  // 3. Persist into IndexedDB
  const db = await openDb();
  if (!db) return;

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.OVERRIDES, 'readwrite');
      const store = tx.objectStore(STORES.OVERRIDES);
      store.put({ slotKey, imageUrl, updatedAt: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve(); // resolve anyway so caller doesn't fail
    } catch {
      resolve();
    }
  });
}

export async function deleteSlotOverride(slotKey: string): Promise<void> {
  // 1. Remove from localStorage
  try {
    const raw = localStorage.getItem('frankies_slot_overrides');
    if (raw) {
      const map = JSON.parse(raw);
      delete map[slotKey];
      localStorage.setItem('frankies_slot_overrides', JSON.stringify(map));
    }
  } catch {
    // ignore
  }

  // 2. Broadcast change event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('frankies:media-update', { detail: { slotKey, imageUrl: null } }));
  }

  const db = await openDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.OVERRIDES, 'readwrite');
      const store = tx.objectStore(STORES.OVERRIDES);
      store.delete(slotKey);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function clearAllSlotOverrides(): Promise<void> {
  try {
    localStorage.removeItem('frankies_slot_overrides');
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('frankies:media-update', { detail: { cleared: true } }));
  }

  const db = await openDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.OVERRIDES, 'readwrite');
      const store = tx.objectStore(STORES.OVERRIDES);
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

// CUSTOM GALLERY ITEMS
export async function getAllCustomGalleryItems(): Promise<GalleryItem[]> {
  const db = await openDb();
  if (!db) {
    try {
      const raw = localStorage.getItem('frankies_custom_gallery');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.GALLERY, 'readonly');
      const store = tx.objectStore(STORES.GALLERY);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

export async function saveCustomGalleryItem(item: GalleryItem): Promise<void> {
  const db = await openDb();
  if (!db) return;

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.GALLERY, 'readwrite');
      const store = tx.objectStore(STORES.GALLERY);
      store.put(item);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    } catch (e) {
      reject(e);
    }
  });
}

export async function deleteCustomGalleryItem(id: string): Promise<void> {
  const db = await openDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.GALLERY, 'readwrite');
      const store = tx.objectStore(STORES.GALLERY);
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

// CUSTOM MENU ITEMS
export async function getAllCustomMenuItems(): Promise<MenuItem[]> {
  const db = await openDb();
  if (!db) return [];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.MENU, 'readonly');
      const store = tx.objectStore(STORES.MENU);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

export async function saveCustomMenuItem(item: MenuItem): Promise<void> {
  const db = await openDb();
  if (!db) return;

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.MENU, 'readwrite');
      const store = tx.objectStore(STORES.MENU);
      store.put(item);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    } catch (e) {
      reject(e);
    }
  });
}

export async function deleteCustomMenuItem(id: string): Promise<void> {
  const db = await openDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.MENU, 'readwrite');
      const store = tx.objectStore(STORES.MENU);
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

// BACKUP & EXPORT / IMPORT
export async function exportAllMediaData(): Promise<string> {
  const images = await getAllUploadedImages();
  const overrides = await getAllSlotOverrides();
  const gallery = await getAllCustomGalleryItems();
  const menu = await getAllCustomMenuItems();

  const backup = {
    appName: "Frankie's @ The Beach",
    version: 1,
    exportedAt: new Date().toISOString(),
    images,
    overrides,
    gallery,
    menu,
  };

  return JSON.stringify(backup, null, 2);
}

export async function importMediaData(jsonData: string): Promise<boolean> {
  try {
    const parsed = JSON.parse(jsonData);
    if (!parsed || typeof parsed !== 'object') return false;

    if (Array.isArray(parsed.images)) {
      for (const img of parsed.images) {
        await saveUploadedImage(img);
      }
    }

    if (parsed.overrides && typeof parsed.overrides === 'object') {
      for (const [key, val] of Object.entries(parsed.overrides)) {
        if (typeof val === 'string') {
          await saveSlotOverride(key, val);
        }
      }
    }

    if (Array.isArray(parsed.gallery)) {
      for (const item of parsed.gallery) {
        await saveCustomGalleryItem(item);
      }
    }

    if (Array.isArray(parsed.menu)) {
      for (const item of parsed.menu) {
        await saveCustomMenuItem(item);
      }
    }

    return true;
  } catch (e) {
    console.error('Failed to import media backup:', e);
    return false;
  }
}

export async function clearEntireMediaDb(): Promise<void> {
  const db = await openDb();
  if (!db) {
    try {
      localStorage.removeItem('frankies_local_images');
      localStorage.removeItem('frankies_slot_overrides');
    } catch {
      // ignore
    }
    return;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction([STORES.IMAGES, STORES.OVERRIDES, STORES.GALLERY, STORES.MENU], 'readwrite');
      tx.objectStore(STORES.IMAGES).clear();
      tx.objectStore(STORES.OVERRIDES).clear();
      tx.objectStore(STORES.GALLERY).clear();
      tx.objectStore(STORES.MENU).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}
