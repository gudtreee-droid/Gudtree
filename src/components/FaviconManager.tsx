'use client';

import { useEffect } from 'react';

export default function FaviconManager() {
  useEffect(() => {
    const updateFaviconInHead = (url: string) => {
      if (!url) return;

      // Update or create standard icon
      let linkIcon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!linkIcon) {
        linkIcon = document.createElement('link');
        linkIcon.rel = 'icon';
        document.head.appendChild(linkIcon);
      }
      linkIcon.href = url;

      // Update or create shortcut icon
      let linkShortcut = document.querySelector("link[rel='shortcut icon']") as HTMLLinkElement;
      if (!linkShortcut) {
        linkShortcut = document.createElement('link');
        linkShortcut.rel = 'shortcut icon';
        document.head.appendChild(linkShortcut);
      }
      linkShortcut.href = url;

      // Update or create apple-touch-icon
      let linkApple = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
      if (!linkApple) {
        linkApple = document.createElement('link');
        linkApple.rel = 'apple-touch-icon';
        document.head.appendChild(linkApple);
      }
      linkApple.href = url;
    };

    const syncFavicon = () => {
      try {
        const customFav = localStorage.getItem('gudtree_custom_favicon');
        const settings = localStorage.getItem('gudtree_site_settings');
        let chosenFavicon = '';
        if (settings) {
          const parsed = JSON.parse(settings);
          chosenFavicon = parsed.faviconUrl || '';
        }
        if (!chosenFavicon && customFav) {
          chosenFavicon = customFav;
        }
        if (chosenFavicon) {
          updateFaviconInHead(chosenFavicon);
        }
      } catch (e) {}
    };

    // 1. Immediate sync on mount from local storage (zero network overhead)
    syncFavicon();

    // 3. Listen for cross-tab storage changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'gudtree_custom_favicon' || e.key === 'gudtree_site_settings') {
        syncFavicon();
      }
    };
    window.addEventListener('storage', handleStorage);

    // 4. Tab focus re-check
    const handleFocus = () => {
      syncFavicon();
    };
    window.addEventListener('focus', handleFocus);

    // 5. BroadcastChannel for instant cross-tab sync
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('gudtree_config_channel');
      bc.onmessage = (event) => {
        if (event.data && (event.data.favicon || (event.data.type === 'FAVICON_UPDATED' && event.data.favicon))) {
          updateFaviconInHead(event.data.favicon);
        } else {
          syncFavicon();
        }
      };
    } catch (e) {}

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
      if (bc) bc.close();
    };
  }, []);

  return null;
}
