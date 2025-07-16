import { usePWA } from "./use-pwa";

export default function UpdateNotification() {
    const { needRefresh, offlineReady, updateApp, dismissUpdate } = usePWA();

    return (
        <>
            {/* Update Available Notification */}
            {needRefresh && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-blue-900">🚀 New Update Available!</h4>
                            <p className="text-sm text-blue-700">A new version of the app is ready to install.</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={updateApp}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            >
                                Update Now
                            </button>
                            <button
                                onClick={dismissUpdate}
                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                            >
                                Later
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Offline Ready Notification */}
            {offlineReady && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-green-900">✅ App is ready for offline use!</h4>
                    <p className="text-sm text-green-700">You can now use this app without an internet connection.</p>
                </div>
            )}
        </>
    );
}