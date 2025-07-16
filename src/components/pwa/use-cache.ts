import { useState } from 'react';

export function useCache() {
    const [cacheInfo, setCacheInfo] = useState<string[]>([]);

    const checkCaches = async () => {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            setCacheInfo(cacheNames);
            console.log('Available caches:', cacheNames);
            
            // Log cache contents for debugging
            for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const keys = await cache.keys();
                console.log(`Cache ${cacheName}:`, keys.map(key => key.url));
            }
        }
    };

    const clearAllCaches = async () => {
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            );
            setCacheInfo([]);
            console.log('All caches cleared');
            return true;
        }
        return false;
    };

    const cacheCurrentPage = async () => {
        if ('caches' in window) {
            try {
                const cache = await caches.open('pages');
                await cache.add('/');
                console.log('Current page cached successfully');
                return true;
            } catch (error) {
                console.error('Failed to cache current page:', error);
                return false;
            }
        }
        return false;
    };

    return {
        cacheInfo,
        checkCaches,
        clearAllCaches,
        cacheCurrentPage,
    };
}