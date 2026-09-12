import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import { CartProvider } from './context/CartContext';
import { ImageProvider } from './context/ImageContext';
import App from './App.tsx';
import './index.css';

// Early capture of beforeinstallprompt so mobile browsers never drop it
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    (window as unknown as { deferredPWAInstallPrompt?: Event }).deferredPWAInstallPrompt = e;
  });
}

// Automatically register the service worker for PWA support & offline caching
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ImageProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ImageProvider>
    </BrowserRouter>
  </StrictMode>,
);
