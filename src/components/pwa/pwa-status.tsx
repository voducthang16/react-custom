import { usePWA } from "./use-pwa";

export default function PWAStatus() {
    const { swStatus, isOnline, needRefresh, offlineReady } = usePWA();

    return (
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">PWA Status</h3>
            
            <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${offlineReady ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>Offline Ready: {offlineReady ? 'Yes' : 'No'}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${needRefresh ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                    <span>Update Available: {needRefresh ? 'Yes' : 'No'}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                    <span>Network: {isOnline ? 'Online' : 'Offline'}</span>
                </div>
            </div>

            <div className="mt-2 text-xs text-gray-600">
                Status: {swStatus}
            </div>
        </div>
    );
}