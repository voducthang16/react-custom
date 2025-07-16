import { useState } from 'react';

interface ApiResponse {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function useApiTest() {
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const testApiCall = async (isOnline: boolean) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const data = await response.json();
            setApiResponse(data);
            console.log('API Response:', data);
            
            const source = isOnline ? 'network' : 'cache';
            return { success: true, data, source };
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, error };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        apiResponse,
        isLoading,
        testApiCall,
    };
}