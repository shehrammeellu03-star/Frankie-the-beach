import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(() => {
    if (typeof window !== 'undefined' && (window as unknown as { deferredPWAInstallPrompt?: BeforeInstallPromptEvent }).deferredPWAInstallPrompt) {
      return (window as unknown as { deferredPWAInstallPrompt: BeforeInstallPromptEvent }).deferredPWAInstallPrompt;
    }
    return null;
  });
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    // Detect iframe
    const inIframe = typeof window !== 'undefined' && window.self !== window.top;
    setIsInIframe(inIframe);

    // Detect standalone mode (already running as installed PWA)
    const isStandalone =
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true);
    setIsInstalled(isStandalone);

    // Detect mobile and OS
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const iOS = /iphone|ipad|ipod/.test(userAgent);
      const android = /android/.test(userAgent);
      const mobile = iOS || android || /mobile|tablet/.test(userAgent);
      setIsIOS(iOS);
      setIsAndroid(android);
      setIsMobile(mobile);

      // Check if global prompt was caught earlier
      const earlyPrompt = (window as unknown as { deferredPWAInstallPrompt?: BeforeInstallPromptEvent }).deferredPWAInstallPrompt;
      if (earlyPrompt && !deferredPrompt) {
        setDeferredPrompt(earlyPrompt);
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      (window as unknown as { deferredPWAInstallPrompt?: Event }).deferredPWAInstallPrompt = e;
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      (window as unknown as { deferredPWAInstallPrompt?: Event }).deferredPWAInstallPrompt = undefined;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [deferredPrompt]);

  const install = async () => {
    const promptEvent = deferredPrompt || (typeof window !== 'undefined' ? (window as unknown as { deferredPWAInstallPrompt?: BeforeInstallPromptEvent }).deferredPWAInstallPrompt : null);
    if (!promptEvent) return false;
    try {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        if (typeof window !== 'undefined') {
          (window as unknown as { deferredPWAInstallPrompt?: Event }).deferredPWAInstallPrompt = undefined;
        }
        return true;
      }
    } catch (err) {
      console.error('Error during PWA installation prompt:', err);
    }
    return false;
  };

  const openInBrowser = () => {
    if (typeof window !== 'undefined') {
      window.open(window.location.href, '_blank', 'noopener,noreferrer');
    }
  };

  return {
    isInstallable: !!deferredPrompt || (typeof window !== 'undefined' && !!(window as unknown as { deferredPWAInstallPrompt?: BeforeInstallPromptEvent }).deferredPWAInstallPrompt),
    isInstalled,
    isIOS,
    isAndroid,
    isMobile,
    isInIframe,
    install,
    openInBrowser,
  };
}
