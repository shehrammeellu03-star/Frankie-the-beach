import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Trash2,
  RefreshCw,
  Download,
  Copy,
  Plus,
  ExternalLink,
  ShieldCheck,
  Lock,
  LogOut,
  Smartphone,
  Sliders,
  Layers,
  Sparkles,
  Eye,
  FileText,
  Palmtree,
  ArrowRight,
  Info,
  X,
  Filter,
  Search,
} from 'lucide-react';
import { useImages } from '../context/ImageContext';
import { OFFICIAL_MENU } from '../data/restaurantData';
import { DEFAULT_GALLERY_ITEMS } from '../data/galleryData';
import { ClientImage } from '../components/ClientImage';
import { UploadedImage } from '../types';
import { UNIFIED_SLOTS, UnifiedSlot, resolveImageOverride } from '../utils/slotMapping';

export const AdminPage: React.FC = () => {
  const {
    uploadedImages,
    slotOverrides,
    menuItems,
    galleryItems,
    clientImages,
    isLoading,
    storageStats,
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
  } = useImages();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('frankies_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active Tab: 'upload' | 'logo' | 'library' | 'slots' | 'new-menu' | 'backup'
  const [activeTab, setActiveTab] = useState<'upload' | 'logo' | 'library' | 'slots' | 'new-menu' | 'backup'>('upload');

  // Upload Form State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ size: string; name: string } | null>(null);
  const [uploadDestination, setUploadDestination] = useState<'library' | 'menu' | 'site' | 'gallery-slot' | 'gallery' | 'new-menu-item' | 'logo'>('library');
  const [targetSlot, setTargetSlot] = useState<string>('the-classic-smash');
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('burgers-dogs');
  const [customDesc, setCustomDesc] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filter in Media Library
  const [librarySearch, setLibrarySearch] = useState('');
  const [fullscreenImage, setFullscreenImage] = useState<UploadedImage | null>(null);

  // Slots & Overrides Tab State
  const [slotFilterCategory, setSlotFilterCategory] = useState<'all' | 'menu' | 'site' | 'gallery'>('all');
  const [slotSearch, setSlotSearch] = useState('');
  const [libraryPickerSlot, setLibraryPickerSlot] = useState<UnifiedSlot | null>(null);
  const [assignModalImage, setAssignModalImage] = useState<UploadedImage | null>(null);
  const [assignModalTarget, setAssignModalTarget] = useState<string>('the-classic-smash');
  const [assignModalCategory, setAssignModalCategory] = useState<'all' | 'menu' | 'site' | 'gallery'>('all');
  const [assignModalSearch, setAssignModalSearch] = useState('');

  // Password check: secure administrator password 7860
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '7860') {
      setIsAuthenticated(true);
      sessionStorage.setItem('frankies_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Clipboard Paste listener for instant screenshot upload
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!isAuthenticated || activeTab !== 'upload') return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            setNotification({
              type: 'success',
              message: 'Pasted image from clipboard successfully!',
            });
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isAuthenticated, activeTab]);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setNotification({ type: 'error', message: 'Please select an image file (PNG, JPG, WEBP, GIF, SVG).' });
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setFileDetails({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    });
    if (!customTitle) {
      setCustomTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleExecuteUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    try {
      let options: any = {
        destination: uploadDestination,
        title: customTitle.trim() || selectedFile.name,
        category: customCategory,
        description: customDesc,
      };

      if (uploadDestination === 'menu') {
        options.targetKey = targetSlot.startsWith('menu:') ? targetSlot : `menu:${targetSlot}`;
      } else if (uploadDestination === 'site') {
        options.targetKey = targetSlot.startsWith('site:') ? targetSlot : `site:${targetSlot}`;
      } else if (uploadDestination === 'gallery-slot') {
        options.targetKey = targetSlot.startsWith('gallery:') ? targetSlot : `gallery:${targetSlot}`;
      } else if (uploadDestination === 'new-menu-item') {
        options.price = 0;
      } else if (uploadDestination === 'logo') {
        options.targetKey = 'site:logo';
      }

      await uploadImage(selectedFile, options);

      setNotification({
        type: 'success',
        message: `Image "${customTitle || selectedFile.name}" successfully uploaded and saved!`,
      });

      // Clear selection
      setSelectedFile(null);
      setPreviewUrl(null);
      setFileDetails(null);
      setCustomTitle('');
      setCustomDesc('');
    } catch (err) {
      console.error(err);
      setNotification({
        type: 'error',
        message: 'Failed to upload image. Please try another image file.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyLink = (dataUrl: string) => {
    navigator.clipboard.writeText(dataUrl);
    setNotification({
      type: 'success',
      message: 'Image data URL copied to clipboard!',
    });
  };

  const handleDownloadImage = (dataUrl: string, title: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Derived Slot Lists from UNIFIED_SLOTS
  const menuSlots = useMemo(() => UNIFIED_SLOTS.filter((s) => s.type === 'menu'), []);
  const siteSlots = useMemo(() => UNIFIED_SLOTS.filter((s) => s.type === 'site'), []);
  const gallerySlots = useMemo(() => UNIFIED_SLOTS.filter((s) => s.type === 'gallery'), []);
  const SITE_SLOTS = siteSlots;

  // Filtered slots for Tab 3
  const filteredSlots = useMemo(() => {
    return UNIFIED_SLOTS.filter((slot) => {
      if (slotFilterCategory !== 'all' && slot.type !== slotFilterCategory) {
        return false;
      }
      if (slotSearch.trim()) {
        const query = slotSearch.toLowerCase();
        return (
          slot.label.toLowerCase().includes(query) ||
          slot.location.toLowerCase().includes(query) ||
          slot.key.toLowerCase().includes(query) ||
          (slot.category && slot.category.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [slotFilterCategory, slotSearch]);

  // Filtered slots for Assign Modal
  const assignModalFilteredSlots = useMemo(() => {
    return UNIFIED_SLOTS.filter((slot) => {
      if (assignModalCategory !== 'all' && slot.type !== assignModalCategory) {
        return false;
      }
      if (assignModalSearch.trim()) {
        const query = assignModalSearch.toLowerCase();
        return (
          slot.label.toLowerCase().includes(query) ||
          slot.location.toLowerCase().includes(query) ||
          slot.key.toLowerCase().includes(query) ||
          (slot.category && slot.category.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [assignModalCategory, assignModalSearch]);

  // Current preview src for any slot
  const getSlotCurrentSrc = (slot: UnifiedSlot): string => {
    const override = resolveImageOverride(slot.key, slotOverrides);
    if (override) return override;

    if (slot.type === 'menu') {
      const m = menuItems.find((item) => item.id === slot.key || slot.aliases.includes(`menu:${item.id}`));
      if (m) return m.image;
      const defaultM = OFFICIAL_MENU.find((item) => item.id === slot.key);
      if (defaultM) return defaultM.image;
    }

    if (slot.type === 'gallery') {
      const g = galleryItems.find((item) => item.id === slot.key || slot.aliases.includes(`gallery:${item.id}`));
      if (g) return g.src;
      const defaultG = DEFAULT_GALLERY_ITEMS.find((item) => item.id === slot.key);
      if (defaultG) return defaultG.src;
    }

    if (slot.type === 'site') {
      const rawKey = slot.key.replace(/^site:/, '') as keyof typeof clientImages;
      if (clientImages[rawKey]) {
        return clientImages[rawKey];
      }
    }

    return '/apple-touch-icon.png';
  };

  const handleAssignLibraryImage = async (slotKey: string, dataUrl: string) => {
    try {
      await assignSlotOverride(slotKey, dataUrl);
      setNotification({
        type: 'success',
        message: 'Image assigned successfully! Updated across the entire website instantly.',
      });
      setAssignModalImage(null);
      setLibraryPickerSlot(null);
    } catch (err) {
      console.error(err);
      setNotification({
        type: 'error',
        message: 'Failed to assign image to slot.',
      });
    }
  };

  // If not authenticated, show friendly login screen
  if (!isAuthenticated) {
    return (
      <div className="flex-1 min-h-[70vh] flex items-center justify-center bg-[#EEEFE9] px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#dde0d5] shadow-xl text-center">
          <div className="w-16 h-16 bg-[#0580FF]/10 text-[#0580FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-[#000000] uppercase">
            Admin Image Studio
          </h1>
          <p className="text-sm text-[#526b74] mt-2 mb-6">
            Upload custom photographs, replace menu images, and manage the Frankie's @ The Beach visual gallery.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#000000] mb-1.5">
                Enter Administrator Password
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-[#dde0d5] focus:outline-none focus:ring-2 focus:ring-[#0580FF] text-center font-mono text-lg tracking-widest"
              />
              {pinError && (
                <p className="text-xs text-red-600 mt-1.5 font-medium">
                  Incorrect password. Please enter the secure administrator password.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0580FF] hover:bg-[#005a6c] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Sign In to Admin Studio
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link to="/" className="text-xs text-[#0580FF] hover:underline font-bold inline-flex items-center gap-1">
              ← Return to Frankie's Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#EEEFE9] min-h-screen pb-24">
      {/* Top Banner & Header */}
      <div className="bg-[#000000] text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 text-amber-400 mb-2 text-xs font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin &amp; Visual Media Management</span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
              Frankie's Image Studio
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl">
              Easily upload any image from your phone or computer. Instantly replace menu dishes, seaside attractions, or publish new photos directly to your public customer gallery.
            </p>
          </div>

          {/* Quick Metrics & Links */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Storage Status */}
            <div className="px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-xs border bg-emerald-950/60 border-emerald-500/40">
              <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-emerald-400"></span>
              <div>
                <span className="font-bold block text-[10px] uppercase tracking-wider text-emerald-300">
                  Local Storage
                </span>
                <span className="text-emerald-100/90 text-[11px] font-medium">
                  IndexedDB Ready
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10 text-xs">
              <span className="text-white/60 block text-[10px] uppercase font-bold tracking-wider">Uploaded Photos</span>
              <span className="font-bold text-white text-base">{storageStats.imageCount} files ({storageStats.totalBytes})</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10 text-xs">
              <span className="text-white/60 block text-[10px] uppercase font-bold tracking-wider">Active Overrides</span>
              <span className="font-bold text-amber-400 text-base">{Object.keys(slotOverrides).length} slots</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="bg-amber-500 hover:bg-amber-400 text-[#000000] font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs shadow-md"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem('frankies_admin_auth');
              }}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 font-bold px-3 py-2.5 rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer"
              title="Lock Admin and Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-8 flex flex-wrap gap-2 border-b border-white/15 pb-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-white text-[#000000] shadow-md'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Image</span>
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'logo'
                ? 'bg-amber-400 text-[#000000] shadow-md'
                : 'bg-white/10 text-amber-300 hover:bg-white/20 border border-amber-400/30'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Brand Logo &amp; App Icon</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'library'
                ? 'bg-white text-[#000000] shadow-md'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Media Library ({uploadedImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('slots')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'slots'
                ? 'bg-white text-[#000000] shadow-md'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Website Slots &amp; Overrides</span>
          </button>

          <button
            onClick={() => setActiveTab('new-menu')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'new-menu'
                ? 'bg-white text-[#000000] shadow-md'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish Item</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'backup'
                ? 'bg-white text-[#000000] shadow-md'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Backup &amp; Reset</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Notification Banner */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center justify-between shadow-sm animate-fade-in ${
              notification.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-red-50 border border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              )}
              <p className="text-xs sm:text-sm font-semibold">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: UPLOAD IMAGES */}
        {activeTab === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Dropzone & File Picker */}
            <div className="lg:col-span-7 space-y-6">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all bg-white relative cursor-pointer ${
                  dragActive
                    ? 'border-[#0580FF] bg-sky-50/50 scale-[1.01]'
                    : 'border-[#c9cfc3] hover:border-[#0580FF]'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="w-20 h-20 rounded-3xl bg-[#0580FF]/10 text-[#0580FF] flex items-center justify-center mx-auto mb-4 pointer-events-none">
                  <Upload className="w-10 h-10 stroke-[2]" />
                </div>

                <h3 className="font-heading font-black text-xl text-[#000000] uppercase mb-1 pointer-events-none">
                  Drag &amp; Drop Any Image Here
                </h3>
                <p className="text-xs sm:text-sm text-[#526b74] mb-4 pointer-events-none">
                  Or click anywhere to select from your phone gallery or files
                </p>

                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0580FF] text-white text-xs font-bold rounded-xl shadow hover:bg-[#005a6c] pointer-events-none">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                </div>

                <p className="text-[11px] text-gray-400 mt-4 pointer-events-none">
                  Supports JPG, PNG, WEBP, GIF, SVG • You can also copy any image and press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-700 font-mono">Ctrl+V</kbd>
                </p>
              </div>

              {/* Upload Destination Guide Cards */}
              <div className="bg-white rounded-3xl p-6 border border-[#dde0d5] shadow-sm">
                <h4 className="font-heading font-bold text-sm text-[#000000] uppercase mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  What can you do with uploaded images?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#526b74]">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <strong className="text-[#000000] block mb-1">🍔 Replace Menu Item Photos</strong>
                    Swap out any burger, dirty fries, hot dog, or ice cream image with your own fresh photograph.
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <strong className="text-[#000000] block mb-1">📸 Add to Photo Gallery</strong>
                    Publish customer snapshots or new specials directly to the public Ramsgate Gallery.
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <strong className="text-[#000000] block mb-1">🏖️ Update Beach Attractions</strong>
                    Update photos of the carousel, slide, or trampolines when new equipment arrives.
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <strong className="text-[#000000] block mb-1">💾 Store in Media Library</strong>
                    Keep a library of high-resolution seaside photos saved safely in your browser.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Settings & Direct Application */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dde0d5] shadow-sm">
                <h3 className="font-heading font-black text-lg text-[#000000] uppercase mb-4 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#0580FF]" />
                  Upload Settings &amp; Destination
                </h3>

                {/* Preview Selected Image */}
                {previewUrl ? (
                  <div className="mb-6">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 mb-2 group">
                      <img src={previewUrl} alt="Selected preview" className="w-full h-full object-cover" />
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          setFileDetails(null);
                        }}
                        className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full transition-all"
                        title="Remove selection"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {fileDetails && (
                      <div className="flex justify-between text-[11px] text-gray-500 px-1 font-mono">
                        <span className="truncate max-w-[200px]">{fileDetails.name}</span>
                        <span>{fileDetails.size}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-6 p-6 border border-dashed border-gray-200 rounded-2xl text-center bg-gray-50 text-gray-400 text-xs">
                    No image selected yet. Choose a file on the left to preview it here.
                  </div>
                )}

                {/* Destination Options */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#000000] mb-2">
                      Where should this image be used?
                    </label>
                    <div className="space-y-2">
                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        uploadDestination === 'library' ? 'border-[#0580FF] bg-sky-50/40' : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="destination"
                          value="library"
                          checked={uploadDestination === 'library'}
                          onChange={() => setUploadDestination('library')}
                          className="mt-0.5 text-[#0580FF] focus:ring-[#0580FF]"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-[#000000] block">Save to Media Library only</span>
                          <span className="text-gray-500">Store in your library for later use or download.</span>
                        </div>
                      </label>

                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        uploadDestination === 'logo' ? 'border-[#0580FF] bg-amber-50/60' : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="destination"
                          value="logo"
                          checked={uploadDestination === 'logo'}
                          onChange={() => {
                            setUploadDestination('logo');
                            setTargetSlot('logo');
                          }}
                          className="mt-0.5 text-[#0580FF] focus:ring-[#0580FF]"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-[#000000] flex items-center gap-2">
                            <span>Brand Logo &amp; App Icon</span>
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded">Tab Favicon &amp; App Download</span>
                          </span>
                          <span className="text-gray-500">Updates browser tab icon, app download/install prompt, and website headers across all devices.</span>
                        </div>
                      </label>

                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        uploadDestination === 'menu' ? 'border-[#0580FF] bg-sky-50/40' : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="destination"
                          value="menu"
                          checked={uploadDestination === 'menu'}
                          onChange={() => {
                            setUploadDestination('menu');
                            setTargetSlot(menuItems[0]?.id || 'the-classic-smash');
                          }}
                          className="mt-0.5 text-[#0580FF] focus:ring-[#0580FF]"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-[#000000] block">Replace a Specific Menu Item Photo</span>
                          <span className="text-gray-500">Instantly replaces the photo for a burger, fries, or sweet treat on the menu.</span>
                        </div>
                      </label>

                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        uploadDestination === 'gallery' ? 'border-[#0580FF] bg-sky-50/40' : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="destination"
                          value="gallery"
                          checked={uploadDestination === 'gallery'}
                          onChange={() => setUploadDestination('gallery')}
                          className="mt-0.5 text-[#0580FF] focus:ring-[#0580FF]"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-[#000000] block">Add as New Photo in Customer Gallery</span>
                          <span className="text-gray-500">Publishes on the public /gallery page with caption and category.</span>
                        </div>
                      </label>

                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        uploadDestination === 'site' ? 'border-[#0580FF] bg-sky-50/40' : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="destination"
                          value="site"
                          checked={uploadDestination === 'site'}
                          onChange={() => {
                            setUploadDestination('site');
                            setTargetSlot(siteSlots[0]?.key || 'heroBg');
                          }}
                          className="mt-0.5 text-[#0580FF] focus:ring-[#0580FF]"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-[#000000] block">Replace a Homepage / Website Section Photo</span>
                          <span className="text-gray-500">Hero ocean background, polaroids, kiosks, team selfie, or beach rides.</span>
                        </div>
                      </label>

                      <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        uploadDestination === 'gallery-slot' ? 'border-[#0580FF] bg-sky-50/40' : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <input
                          type="radio"
                          name="destination"
                          value="gallery-slot"
                          checked={uploadDestination === 'gallery-slot'}
                          onChange={() => {
                            setUploadDestination('gallery-slot');
                            setTargetSlot(gallerySlots[0]?.key || 'g-team-hero');
                          }}
                          className="mt-0.5 text-[#0580FF] focus:ring-[#0580FF]"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-[#000000] block">Replace an Existing Gallery Photo (24 slots)</span>
                          <span className="text-gray-500">Directly replace any existing photo across Burgers, Fries, Treats, Team, or Family rides.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Dynamic Dropdown when 'menu' is selected */}
                  {uploadDestination === 'menu' && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#000000]">
                        Choose Menu Item to Replace:
                      </label>
                      <select
                        value={targetSlot.replace(/^menu:/, '')}
                        onChange={(e) => setTargetSlot(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-[#000000] focus:ring-2 focus:ring-[#0580FF]"
                      >
                        {menuItems.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name} — [{item.category}]
                          </option>
                        ))}
                      </select>
                      {slotOverrides[`menu:${targetSlot}`] && (
                        <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg font-medium flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 shrink-0" />
                          This item currently has a custom override applied. Uploading will update it.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Dynamic Dropdown when 'site' is selected */}
                  {uploadDestination === 'site' && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#000000]">
                        Choose Homepage / Website Slot to Replace:
                      </label>
                      <select
                        value={targetSlot.replace(/^site:/, '')}
                        onChange={(e) => setTargetSlot(`site:${e.target.value}`)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-[#000000] focus:ring-2 focus:ring-[#0580FF]"
                      >
                        {siteSlots.map((slot) => {
                          const cleanKey = slot.key.replace(/^site:/, '');
                          return (
                            <option key={slot.key} value={cleanKey}>
                              {slot.label} — [{slot.location}]
                            </option>
                          );
                        })}
                      </select>
                      {resolveImageOverride(targetSlot, slotOverrides) && (
                        <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg font-medium flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 shrink-0" />
                          This section currently has a custom override applied. Uploading will update it.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Dynamic Dropdown when 'gallery-slot' is selected */}
                  {uploadDestination === 'gallery-slot' && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#000000]">
                        Choose Gallery Photo Slot to Replace:
                      </label>
                      <select
                        value={targetSlot.replace(/^gallery:/, '')}
                        onChange={(e) => setTargetSlot(`gallery:${e.target.value}`)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-[#000000] focus:ring-2 focus:ring-[#0580FF]"
                      >
                        {gallerySlots.map((slot) => {
                          const cleanKey = slot.key.replace(/^gallery:/, '');
                          return (
                            <option key={slot.key} value={cleanKey}>
                              {slot.label} — [{slot.location}]
                            </option>
                          );
                        })}
                      </select>
                      {resolveImageOverride(targetSlot, slotOverrides) && (
                        <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg font-medium flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 shrink-0" />
                          This gallery photo currently has a custom override applied. Uploading will update it.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Dynamic Fields when 'gallery' is selected */}
                  {uploadDestination === 'gallery' && (
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-[#000000] mb-1">Photo Title / Caption:</label>
                        <input
                          type="text"
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          placeholder="e.g. Sunset Burgers by the Waves"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#000000] mb-1">Gallery Category:</label>
                        <select
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                        >
                          <option value="burgers-dogs">Burgers &amp; Hot Dogs</option>
                          <option value="loaded-fries">Loaded Fries &amp; Sides</option>
                          <option value="treats">Ice Creams &amp; Sweets</option>
                          <option value="kiosk-team">Kiosk &amp; Team</option>
                          <option value="family">Beach Rides &amp; Family Fun</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#000000] mb-1">Short Description:</label>
                        <textarea
                          rows={2}
                          value={customDesc}
                          onChange={(e) => setCustomDesc(e.target.value)}
                          placeholder="Freshly cooked on our seafront grill in Ramsgate..."
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Title field for general upload */}
                  {uploadDestination === 'library' && (
                    <div>
                      <label className="block text-xs font-bold text-[#000000] mb-1">Image Label / Title:</label>
                      <input
                        type="text"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        placeholder="e.g. Morning Bacon Roll on Beach Bench"
                        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleExecuteUpload}
                    disabled={!selectedFile || isUploading}
                    className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                      selectedFile && !isUploading
                        ? 'bg-[#0580FF] hover:bg-[#005a6c] text-white hover:shadow-lg cursor-pointer'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing &amp; Optimizing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Save &amp; Apply Image</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: BRAND LOGO & APP ICON */}
        {activeTab === 'logo' && (
          <div className="space-y-8">
            {/* Top Overview Banner */}
            <div className="bg-gradient-to-r from-[#000000] to-[#005a6c] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live Branding &amp; Multi-Device Sync</span>
                  </div>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                    Brand Logo &amp; App Icon Manager
                  </h2>
                  <p className="text-sm text-white/80 mt-1 max-w-2xl leading-relaxed">
                    Upload your official Frankie's logo. Any change made here updates everywhere in real-time:
                    the <strong>browser tab favicon</strong>, the <strong>app download and install prompt</strong>,
                    the <strong>navigation header</strong>, and <strong>brand badges</strong> instantly.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {slotOverrides['site:logo'] || slotOverrides['logo'] ? (
                    <button
                      onClick={async () => {
                        if (window.confirm('Reset the brand logo back to the original default logo?')) {
                          await removeSlotOverride('site:logo');
                          setNotification({
                            type: 'success',
                            message: 'Brand logo reset back to original default.',
                          });
                        }
                      }}
                      className="px-4 py-2.5 bg-white/10 hover:bg-red-500/20 text-red-200 border border-white/20 hover:border-red-400/40 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset to Default Logo</span>
                    </button>
                  ) : (
                    <div className="px-3.5 py-2 bg-white/10 rounded-xl text-xs text-white/70 font-semibold border border-white/10">
                      Using Default Logo
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3 Real-time Live Previews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Preview 1: Browser Tab Favicon */}
              <div className="bg-white rounded-3xl p-6 border border-[#dde0d5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0580FF]">
                      1. Browser Tab Favicon
                    </span>
                    <span className="text-[10px] bg-sky-50 text-[#0580FF] font-bold px-2 py-0.5 rounded-full border border-sky-200">
                      Browser Tab
                    </span>
                  </div>
                  <p className="text-xs text-[#526b74] mb-4">
                    How your logo appears in Chrome, Safari, Edge, and mobile browser tabs:
                  </p>

                  {/* Browser Chrome Simulation */}
                  <div className="bg-gray-200 rounded-t-xl p-2 pt-2.5 flex items-center gap-2 border border-gray-300">
                    <div className="flex gap-1.5 ml-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </div>
                    {/* The Active Tab */}
                    <div className="bg-white rounded-t-lg px-3 py-1.5 flex items-center gap-2 shadow-xs max-w-[200px] border border-b-0 border-gray-300">
                      <ClientImage
                        slotKey="site:logo"
                        src={clientImages.logo || '/apple-touch-icon.png'}
                        alt="Favicon preview"
                        className="w-4 h-4 rounded-xs object-cover shrink-0"
                      />
                      <span className="text-[11px] font-medium text-gray-800 truncate">
                        Frankie's @ The Beach
                      </span>
                      <X className="w-3 h-3 text-gray-400 shrink-0 ml-auto" />
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2 text-[10px] font-mono text-gray-500 rounded-b-xl border border-t-0 border-gray-300 flex items-center gap-1.5">
                    <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                    <span className="truncate">https://frankies-beach.web.app</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>Target: &lt;link rel="icon"&gt;</span>
                  <span className="text-emerald-600 font-bold">Auto-Syncs</span>
                </div>
              </div>

              {/* Preview 2: App Download / PWA Installation Icon */}
              <div className="bg-white rounded-3xl p-6 border border-[#dde0d5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0580FF]">
                      2. App Download &amp; Home Screen
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      App Download
                    </span>
                  </div>
                  <p className="text-xs text-[#526b74] mb-4">
                    Shown when visitors click <strong>Download App</strong> and on their phone's home screen:
                  </p>

                  {/* Phone App Icon Simulation */}
                  <div className="bg-gradient-to-br from-[#000000] to-[#005a6c] rounded-2xl p-4 text-center flex flex-col items-center justify-center py-5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white/40 bg-white flex items-center justify-center relative group">
                      <ClientImage
                        slotKey="site:logo"
                        src={clientImages.logo || '/apple-touch-icon.png'}
                        alt="App icon preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-white text-xs font-bold mt-2 font-heading tracking-wide">
                      Frankie's
                    </span>
                    <span className="text-[10px] text-amber-300 font-semibold mt-0.5">
                      Progressive Web App
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>Target: PWA Modal &amp; Manifest</span>
                  <span className="text-emerald-600 font-bold">Auto-Syncs</span>
                </div>
              </div>

              {/* Preview 3: Website Header & Badges */}
              <div className="bg-white rounded-3xl p-6 border border-[#dde0d5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0580FF]">
                      3. Navigation Header
                    </span>
                    <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                      Header &amp; Brand
                    </span>
                  </div>
                  <p className="text-xs text-[#526b74] mb-4">
                    Appears in the sticky top navigation bar across all customer-facing pages:
                  </p>

                  {/* Header Bar Simulation */}
                  <div className="bg-[#0580FF] rounded-2xl p-4 text-white flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <ClientImage
                        slotKey="site:logo"
                        src={clientImages.logo || '/apple-touch-icon.png'}
                        alt="Header logo preview"
                        className="w-10 h-10 rounded-xl object-cover shadow-sm border border-white/30 bg-white/10 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-script text-xl font-bold text-white">
                            Frankie's
                          </span>
                          <Palmtree className="w-4 h-4 text-[#D1A03F]" />
                        </div>
                        <span className="text-[8px] font-extrabold tracking-widest text-[#D1A03F] uppercase block font-heading">
                          @ THE BEACH
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>Target: All Pages &amp; Footer</span>
                  <span className="text-emerald-600 font-bold">Auto-Syncs</span>
                </div>
              </div>
            </div>

            {/* Direct Logo Upload Dropzone */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dde0d5] shadow-sm">
              <h3 className="font-heading font-black text-xl text-[#000000] uppercase mb-2 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#0580FF]" />
                <span>Upload New Logo File</span>
              </h3>
              <p className="text-xs text-[#526b74] mb-6">
                Choose or drag any high-quality square logo image (PNG, SVG, WEBP, or JPG).
                It will immediately update the browser tab, app download modal, and website headers across all devices.
              </p>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    const file = e.dataTransfer.files[0];
                    setIsUploading(true);
                    try {
                      await uploadImage(file, {
                        destination: 'logo',
                        title: "Frankie's Official Brand Logo",
                      });
                      setNotification({
                        type: 'success',
                        message: "Brand logo updated! Successfully synced to browser tab, app download icon, and headers across all devices.",
                      });
                    } catch (err) {
                      setNotification({
                        type: 'error',
                        message: 'Failed to upload logo image. Please try another file.',
                      });
                    } finally {
                      setIsUploading(false);
                    }
                  }
                }}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all bg-white relative cursor-pointer ${
                  dragActive
                    ? 'border-[#0580FF] bg-sky-50/50 scale-[1.01]'
                    : 'border-[#c9cfc3] hover:border-[#0580FF]'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      setIsUploading(true);
                      try {
                        await uploadImage(file, {
                          destination: 'logo',
                          title: "Frankie's Official Brand Logo",
                        });
                        setNotification({
                          type: 'success',
                          message: "Brand logo updated! Successfully synced to browser tab, app download icon, and headers across all devices.",
                        });
                      } catch (err) {
                        setNotification({
                          type: 'error',
                          message: 'Failed to upload logo image. Please try another file.',
                        });
                      } finally {
                        setIsUploading(false);
                      }
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-600 flex items-center justify-center mx-auto mb-4 pointer-events-none">
                  <Sparkles className="w-8 h-8" />
                </div>

                <h4 className="font-heading font-black text-lg text-[#000000] uppercase mb-1 pointer-events-none">
                  {isUploading ? 'Uploading & Cloud Syncing...' : 'Click or Drag New Logo Image Here'}
                </h4>
                <p className="text-xs text-[#526b74] pointer-events-none">
                  Recommended size: 512x512px or square icon with transparent or solid background
                </p>
              </div>

              {/* Quick Pick from Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-heading font-bold text-sm text-[#000000] uppercase mb-3">
                    Or select any previously uploaded photo to use as the logo:
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {uploadedImages.slice(0, 16).map((img) => (
                      <div
                        key={img.id}
                        className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 hover:shadow-md transition-all cursor-pointer"
                        onClick={async () => {
                          await assignSlotOverride('site:logo', img.dataUrl);
                          setNotification({
                            type: 'success',
                            message: `Set "${img.title}" as official brand logo! Synced across all devices.`,
                          });
                        }}
                      >
                        <img src={img.dataUrl} alt={img.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold text-center p-1">
                          Use as Logo
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'library' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dde0d5] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="font-heading font-black text-xl text-[#000000] uppercase">
                  Uploaded Media Library
                </h3>
                <p className="text-xs text-[#526b74] mt-0.5">
                  Browse, preview, copy data links, or reassign any uploaded photo.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Search images..."
                    className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#0580FF]"
                  />
                  <Filter className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                </div>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-4 py-2 bg-[#0580FF] hover:bg-[#005a6c] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload More</span>
                </button>
              </div>
            </div>

            {uploadedImages.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
                <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="font-heading font-bold text-base text-[#000000] uppercase">
                  No Custom Images Uploaded Yet
                </h4>
                <p className="text-xs text-[#526b74] mt-1 max-w-sm mx-auto mb-6">
                  You can upload any photo using the upload tab, and it will be saved in your browser library.
                </p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-5 py-2.5 bg-[#0580FF] text-white text-xs font-bold rounded-xl"
                >
                  Upload First Photo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {uploadedImages
                  .filter((img) => img.title.toLowerCase().includes(librarySearch.toLowerCase()))
                  .map((image) => (
                    <div
                      key={image.id}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                        <img
                          src={image.dataUrl}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={() => setFullscreenImage(image)}
                          className="absolute bottom-2 right-2 bg-black/60 hover:bg-black text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          title="View Fullscreen"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {image.assignedSlot && (
                          <span className="absolute top-2 left-2 bg-[#0580FF] text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">
                            Assigned
                          </span>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-xs text-[#000000] truncate" title={image.title}>
                            {image.title}
                          </h4>
                          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 font-mono">
                            <span>{image.dimensions || 'Image'}</span>
                            <span>{image.fileSize || ''}</span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between gap-1 flex-wrap">
                          <button
                            onClick={() => {
                              setAssignModalImage(image);
                              setAssignModalTarget(UNIFIED_SLOTS[0]?.key || 'the-classic-smash');
                            }}
                            className="p-1.5 text-[#0580FF] hover:bg-sky-50 rounded-lg text-[11px] font-bold flex items-center gap-1"
                            title="Assign to Website Slot"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                            <span>Assign</span>
                          </button>

                          <button
                            onClick={() => handleCopyLink(image.dataUrl)}
                            className="p-1.5 text-gray-600 hover:text-[#0580FF] hover:bg-gray-100 rounded-lg text-[11px] flex items-center gap-1"
                            title="Copy Data Link"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </button>

                          <button
                            onClick={() => handleDownloadImage(image.dataUrl, image.title)}
                            className="p-1.5 text-gray-600 hover:text-[#0580FF] hover:bg-gray-100 rounded-lg text-[11px] flex items-center gap-1"
                            title="Download Image"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Save</span>
                          </button>

                          <button
                            onClick={() => deleteUploadedImage(image.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-[11px] flex items-center gap-1"
                            title="Delete Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: WEBSITE SLOTS & OVERRIDES */}
        {activeTab === 'slots' && (
          <div className="space-y-6">
            {/* Header with Search and Reset */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dde0d5] shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">
                    <Sliders className="w-4 h-4" />
                    <span>Universal Website Image Directory</span>
                  </div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-[#000000] uppercase">
                    Website Slots &amp; Direct Image Overrides
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526b74] mt-1 max-w-3xl">
                    Replace every image across Frankie's @ The Beach: Homepage hero &amp; polaroids, all menu items, beach attractions, and all 24 customer gallery photos.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {Object.keys(slotOverrides).length > 0 && (
                    <button
                      onClick={resetAllOverrides}
                      className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1.5 bg-red-50 px-3.5 py-2.5 rounded-xl border border-red-200 transition-all shadow-2xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset All ({Object.keys(slotOverrides).length}) Overrides</span>
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="text-xs text-white font-bold flex items-center gap-1.5 bg-[#0580FF] hover:bg-[#005a6c] px-4 py-2.5 rounded-xl transition-all shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                </div>
              </div>

              {/* Filters Bar: Search + Category Pills */}
              <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Category Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setSlotFilterCategory('all')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      slotFilterCategory === 'all'
                        ? 'bg-[#0580FF] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Website Slots ({UNIFIED_SLOTS.length})
                  </button>
                  <button
                    onClick={() => setSlotFilterCategory('menu')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      slotFilterCategory === 'menu'
                        ? 'bg-[#0580FF] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>🍔 Menu Dishes</span>
                    <span className="opacity-75 text-[10px]">({menuSlots.length})</span>
                  </button>
                  <button
                    onClick={() => setSlotFilterCategory('site')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      slotFilterCategory === 'site'
                        ? 'bg-[#0580FF] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>🏖️ Homepage &amp; Attractions</span>
                    <span className="opacity-75 text-[10px]">({siteSlots.length})</span>
                  </button>
                  <button
                    onClick={() => setSlotFilterCategory('gallery')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      slotFilterCategory === 'gallery'
                        ? 'bg-[#0580FF] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>📸 Public Gallery</span>
                    <span className="opacity-75 text-[10px]">({gallerySlots.length})</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={slotSearch}
                    onChange={(e) => setSlotSearch(e.target.value)}
                    placeholder="Search slot name or location..."
                    className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#000000] focus:ring-2 focus:ring-[#0580FF] focus:bg-white transition-all"
                  />
                  {slotSearch && (
                    <button
                      onClick={() => setSlotSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSlots.map((slot) => {
                const isOverridden = Boolean(resolveImageOverride(slot.key, slotOverrides));
                const currentImgSrc = getSlotCurrentSrc(slot);

                const getCategoryBadge = () => {
                  if (slot.type === 'menu') {
                    return <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">Menu Item</span>;
                  }
                  if (slot.type === 'site') {
                    return <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">Site Section</span>;
                  }
                  return <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60">Gallery Photo</span>;
                };

                return (
                  <div
                    key={slot.key}
                    className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                      isOverridden
                        ? 'border-amber-400 shadow-[0_4px_16px_rgba(245,158,11,0.12)] ring-1 ring-amber-400/40'
                        : 'border-gray-200 shadow-2xs hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Top Row: Thumbnail + Details */}
                      <div className="flex items-start gap-3.5">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <img
                            src={currentImgSrc}
                            alt={slot.label}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {isOverridden && (
                            <span className="absolute bottom-0 inset-x-0 bg-amber-500 text-white text-[8px] font-extrabold uppercase text-center py-0.5 tracking-wider">
                              Custom
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            {getCategoryBadge()}
                            {isOverridden ? (
                              <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                OVERRIDDEN
                              </span>
                            ) : (
                              <span className="text-[9px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                Original
                              </span>
                            )}
                          </div>

                          <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#000000] leading-snug line-clamp-2" title={slot.label}>
                            {slot.label}
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed" title={slot.location}>
                            📍 {slot.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {/* 1. Upload new photo button */}
                        <button
                          onClick={() => {
                            if (slot.type === 'menu') {
                              setUploadDestination('menu');
                              setTargetSlot(slot.key);
                            } else if (slot.type === 'site') {
                              setUploadDestination('site');
                              setTargetSlot(slot.key.replace(/^site:/, ''));
                            } else {
                              setUploadDestination('gallery-slot');
                              setTargetSlot(slot.key.replace(/^gallery:/, ''));
                            }
                            setActiveTab('upload');
                          }}
                          className="px-2.5 py-1.5 bg-[#0580FF]/10 hover:bg-[#0580FF] text-[#0580FF] hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                          title="Upload a new photo for this slot"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload</span>
                        </button>

                        {/* 2. Choose from existing library button */}
                        <button
                          onClick={() => setLibraryPickerSlot(slot)}
                          className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                          title="Select from previously uploaded library photos"
                        >
                          <ImageIcon className="w-3 h-3" />
                          <span>Pick Library</span>
                        </button>
                      </div>

                      {/* 3. Revert to original (if active) */}
                      {isOverridden && (
                        <button
                          onClick={() => removeSlotOverride(slot.key)}
                          className="text-[11px] font-bold text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                          title="Restore Frankie's original authentic photo"
                        >
                          Revert
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredSlots.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <h4 className="font-heading font-extrabold text-base text-[#000000] uppercase">No matching slots found</h4>
                <p className="text-xs text-gray-500 mt-1">Try clearing your search query or switching to All Slots.</p>
                <button
                  onClick={() => {
                    setSlotSearch('');
                    setSlotFilterCategory('all');
                  }}
                  className="mt-4 px-4 py-2 bg-[#0580FF] text-white text-xs font-bold rounded-xl"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ADD NEW MENU ITEM */}
        {activeTab === 'new-menu' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#dde0d5] shadow-sm">
            <h3 className="font-heading font-black text-xl text-[#000000] uppercase mb-1">
              Create New Dish or Item
            </h3>
            <p className="text-xs text-[#526b74] mb-6">
              Add a brand-new specialty burger, loaded fries, or sweet treat. It will immediately show on the live /menu page.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#000000] mb-1">Dish Name:</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Seaside Monster Truffle Smash Burger"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#000000] mb-1">Menu Category:</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                >
                  <option value="burgers">Burgers</option>
                  <option value="loaded-fries">Loaded Fries &amp; Chips</option>
                  <option value="hot-dogs">Hot Dogs &amp; Grill</option>
                  <option value="ice-cream">Ice Cream &amp; Treats</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#000000] mb-1">Description:</label>
                <textarea
                  rows={3}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="Describe ingredients, toppings, and sauces..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#000000] mb-1">Upload Photo for Dish:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelect(e.target.files[0]);
                    }
                  }}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0580FF] file:text-white hover:file:bg-[#005a6c] cursor-pointer"
                />
                {previewUrl && (
                  <div className="mt-3 w-32 h-24 rounded-xl overflow-hidden border border-gray-200">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <button
                onClick={async () => {
                  if (!customTitle || !selectedFile) {
                    setNotification({
                      type: 'error',
                      message: 'Please provide both a dish name and a photo file.',
                    });
                    return;
                  }
                  setUploadDestination('new-menu-item');
                  await handleExecuteUpload();
                }}
                disabled={!customTitle || !selectedFile || isUploading}
                className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md ${
                  customTitle && selectedFile && !isUploading
                    ? 'bg-[#0580FF] hover:bg-[#005a6c] text-white cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isUploading ? 'Publishing Dish...' : 'Publish New Dish to Menu'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: BACKUP & RESET */}
        {activeTab === 'backup' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dde0d5] shadow-sm">
              <h3 className="font-heading font-black text-xl text-[#000000] uppercase mb-1 flex items-center gap-2">
                <Download className="w-5 h-5 text-[#0580FF]" />
                Export &amp; Backup All Media
              </h3>
              <p className="text-xs text-[#526b74] mb-6">
                Download a complete JSON backup file of all your uploaded photos, menu overrides, and custom gallery posts.
              </p>

              <button
                onClick={async () => {
                  const backupJson = await exportBackup();
                  const blob = new Blob([backupJson], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `frankies-media-backup-${new Date().toISOString().slice(0, 10)}.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  setNotification({
                    type: 'success',
                    message: 'Media backup downloaded successfully!',
                  });
                }}
                className="px-5 py-3 bg-[#0580FF] hover:bg-[#005a6c] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Export Media Backup (.json)</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dde0d5] shadow-sm">
              <h3 className="font-heading font-black text-xl text-[#000000] uppercase mb-1 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#0580FF]" />
                Restore from Backup
              </h3>
              <p className="text-xs text-[#526b74] mb-4">
                Import a previously saved media JSON file to restore your uploaded images.
              </p>

              <input
                type="file"
                accept=".json,application/json"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    const text = await e.target.files[0].text();
                    const success = await importBackup(text);
                    if (success) {
                      setNotification({
                        type: 'success',
                        message: 'Media library restored successfully from backup!',
                      });
                    } else {
                      setNotification({
                        type: 'error',
                        message: 'Invalid backup file format.',
                      });
                    }
                  }
                }}
                className="text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-[#000000] hover:file:bg-gray-200 cursor-pointer"
              />
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-sm">
              <h3 className="font-heading font-black text-xl text-red-900 uppercase mb-1 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                Reset &amp; Restore Original Photos
              </h3>
              <p className="text-xs text-[#526b74] mb-6">
                Remove all custom uploaded photos and revert the entire site back to Frankie's original authentic client photos.
              </p>

              <button
                onClick={async () => {
                  if (window.confirm('Are you sure you want to reset all custom images and revert to original client photos?')) {
                    await clearAllMedia();
                    setNotification({
                      type: 'success',
                      message: 'All custom images cleared and reverted to original client photos.',
                    });
                  }
                }}
                className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset All to Original Photos</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Image Preview Modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={fullscreenImage.dataUrl}
                alt={fullscreenImage.title}
                className="max-w-full max-h-[75vh] object-contain"
              />
              <button
                onClick={() => setFullscreenImage(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-black text-lg text-[#000000] uppercase">
                  {fullscreenImage.title}
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  Resolution: {fullscreenImage.dimensions || 'High-res'} • Size: {fullscreenImage.fileSize || 'Optimized'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleCopyLink(fullscreenImage.dataUrl)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#000000] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={() => handleDownloadImage(fullscreenImage.dataUrl, fullscreenImage.title)}
                  className="px-4 py-2 bg-[#0580FF] hover:bg-[#005a6c] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal: When clicking "Assign" on an uploaded photo */}
      {assignModalImage && (
        <div
          onClick={() => setAssignModalImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-gray-200"
          >
            {/* Modal Header */}
            <div className="p-5 bg-[#000000] text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-black/40 border border-white/20 shrink-0">
                  <img src={assignModalImage.dataUrl} alt={assignModalImage.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm sm:text-base uppercase tracking-wider text-white">
                    Assign Photo to Website Slot
                  </h3>
                  <p className="text-[11px] text-white/70 truncate max-w-sm">
                    {assignModalImage.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAssignModalImage(null)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Controls: Category Pills & Search */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-3 shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setAssignModalCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    assignModalCategory === 'all' ? 'bg-[#0580FF] text-white' : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  All ({UNIFIED_SLOTS.length})
                </button>
                <button
                  onClick={() => setAssignModalCategory('menu')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    assignModalCategory === 'menu' ? 'bg-[#0580FF] text-white' : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  Menu ({menuSlots.length})
                </button>
                <button
                  onClick={() => setAssignModalCategory('site')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    assignModalCategory === 'site' ? 'bg-[#0580FF] text-white' : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  Homepage &amp; Attractions ({siteSlots.length})
                </button>
                <button
                  onClick={() => setAssignModalCategory('gallery')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    assignModalCategory === 'gallery' ? 'bg-[#0580FF] text-white' : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  Gallery ({gallerySlots.length})
                </button>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={assignModalSearch}
                  onChange={(e) => setAssignModalSearch(e.target.value)}
                  placeholder="Filter slots by name (e.g. burger, carousel, sunset, fries)..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-[#000000] focus:ring-2 focus:ring-[#0580FF]"
                />
              </div>
            </div>

            {/* Slots List */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2 max-h-[50vh]">
              {assignModalFilteredSlots.map((slot) => {
                const currentImg = getSlotCurrentSrc(slot);
                const isOverridden = Boolean(resolveImageOverride(slot.key, slotOverrides));

                return (
                  <div
                    key={slot.key}
                    className="p-3 bg-white hover:bg-sky-50/50 rounded-xl border border-gray-200 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <img src={currentImg} alt={slot.label} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                            {slot.type}
                          </span>
                          {isOverridden && (
                            <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                              Custom Active
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-xs text-[#000000] truncate mt-0.5">
                          {slot.label}
                        </h4>
                        <p className="text-[10px] text-gray-400 truncate">
                          {slot.location}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAssignLibraryImage(slot.key, assignModalImage.dataUrl)}
                      className="shrink-0 px-3 py-1.5 bg-[#0580FF] hover:bg-[#005a6c] text-white font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Assign Here</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setAssignModalImage(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pick from Library Modal: When clicking "Pick from Library" on any slot */}
      {libraryPickerSlot && (
        <div
          onClick={() => setLibraryPickerSlot(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[85vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="p-5 bg-[#000000] text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  Select Photo for Slot
                </span>
                <h3 className="font-heading font-black text-sm sm:text-base uppercase tracking-wider text-white">
                  {libraryPickerSlot.label}
                </h3>
                <p className="text-[11px] text-white/70">
                  📍 {libraryPickerSlot.location}
                </p>
              </div>
              <button
                onClick={() => setLibraryPickerSlot(null)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photos Grid */}
            <div className="p-5 overflow-y-auto flex-1">
              {uploadedImages.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h4 className="font-bold text-sm text-[#000000]">No uploaded photos in library yet</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                    Upload your first photo using the Upload tab, then you can assign it here or anywhere across the site with 1 click.
                  </p>
                  <button
                    onClick={() => {
                      setLibraryPickerSlot(null);
                      setActiveTab('upload');
                    }}
                    className="mt-4 px-4 py-2 bg-[#0580FF] text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Go to Upload Tab
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {uploadedImages.map((img) => (
                    <div
                      key={img.id}
                      className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow group"
                    >
                      <div className="relative aspect-video bg-black/5 overflow-hidden">
                        <img src={img.dataUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h5 className="font-bold text-xs text-[#000000] truncate" title={img.title}>
                            {img.title}
                          </h5>
                          <span className="text-[10px] text-gray-400 block font-mono mt-0.5">
                            {img.dimensions || 'Image'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAssignLibraryImage(libraryPickerSlot.key, img.dataUrl)}
                          className="mt-3 w-full py-2 bg-[#0580FF] hover:bg-[#005a6c] text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Use This Photo</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {uploadedImages.length} photo{uploadedImages.length === 1 ? '' : 's'} available in library
              </span>
              <button
                onClick={() => setLibraryPickerSlot(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
