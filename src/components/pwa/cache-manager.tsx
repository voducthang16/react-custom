import { useCache } from "./use-cache";

export default function CacheManager() {
    const { cacheInfo, checkCaches, clearAllCaches, cacheCurrentPage } = useCache();

    const handleClearCaches = async () => {
        const success = await clearAllCaches();
        if (success) {
            alert('All caches cleared successfully!');
        }
    };

    const handleCachePage = async () => {
        const success = await cacheCurrentPage();
        if (success) {
            alert('Current page cached! Try going offline and reload.');
        } else {
            alert('Failed to cache current page.');
        }
    };

    return (
        <div className="p-4 border rounded">
            <h2 className="font-semibold mb-2">Cache Management</h2>
            <div className="space-x-2 mb-2">
                <button 
                    onClick={checkCaches}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Check Caches
                </button>
                <button 
                    onClick={handleClearCaches}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Clear All Caches
                </button>
                <button 
                    onClick={handleCachePage}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                    Cache Current Page
                </button>
            </div>
            
            {cacheInfo.length > 0 && (
                <div>
                    <p className="font-medium">Active Caches:</p>
                    <ul className="list-disc list-inside text-sm">
                        {cacheInfo.map((cache, index) => (
                            <li key={index}>{cache}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}