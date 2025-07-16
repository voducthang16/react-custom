import { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function usePWA() {
    const [swStatus, setSwStatus] = useState<string>('Checking...');
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const {
        needRefresh: [needRefresh, setNeedRefresh],
        offlineReady: [offlineReady, setOfflineReady],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered:', r);
            setSwStatus('Service Worker registered successfully');
        },
        onRegisterError(error) {
            console.error('SW registration error:', error);
            setSwStatus('Service Worker registration failed');
        },
        onNeedRefresh() {
            console.log('New content available');
            setNeedRefresh(true);
        },
        onOfflineReady() {
            console.log('App ready to work offline');
            setOfflineReady(true);
        },
    });

    useEffect(() => {
        if (offlineReady) {
            setSwStatus('Service Worker active - App ready for offline use');
        }
    }, [offlineReady]);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const updateApp = async () => {
        try {
            await updateServiceWorker(true);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    const dismissUpdate = () => {
        setNeedRefresh(false);
    };

    return {
        swStatus,
        isOnline,
        needRefresh,
        offlineReady,
        updateApp,
        dismissUpdate,
    };
}