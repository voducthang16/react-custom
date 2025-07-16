import { useApiTest } from "./use-api-test";
import { usePWA } from "./use-pwa";

export default function ApiTester() {
    const { apiResponse, isLoading, testApiCall } = useApiTest();
    const { isOnline } = usePWA();

    const handleApiTest = async () => {
        const result = await testApiCall(isOnline);
        if (result.success) {
            alert(`API call successful! Source: ${result.source}`);
        } else {
            alert('API call failed! Check if cached version is available.');
        }
    };

    return (
        <div className="p-4 border rounded">
            <h2 className="font-semibold mb-2">API Caching Test</h2>
            <button 
                onClick={handleApiTest}
                disabled={isLoading}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
                {isLoading ? 'Loading...' : 'Test API Call'}
            </button>
            
            {apiResponse && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                    <p><strong>Title:</strong> {apiResponse.title}</p>
                    <p><strong>Body:</strong> {apiResponse.body.substring(0, 100)}...</p>
                </div>
            )}
        </div>
    );
}