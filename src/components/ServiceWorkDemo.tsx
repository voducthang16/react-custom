import ApiTester from "./pwa/api-tester";
import CacheManager from "./pwa/cache-manager";
import PWAStatus from "./pwa/pwa-status";
import UpdateNotification from "./pwa/update-notification";

export default function ServiceWorkerDemo() {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Service Worker Demo 2</h1>

            <PWAStatus />

            <UpdateNotification />

            <div className="space-y-4">
                <CacheManager />

                <ApiTester />
            </div>
        </div>
    );
}