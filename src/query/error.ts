import { queryOptions } from '@tanstack/react-query';

export class ApiError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = 'ApiError';
    }
}

const fetchErrorData = async () => {
    console.info('Fetching error data...');
    await new Promise((r) => setTimeout(r, 1000));

    const errorType = Math.random();

    if (errorType < 0.3) {
        throw new ApiError('Network Error: Unable to connect to server', 500);
    } else if (errorType < 0.6) {
        throw new ApiError('Authentication Error: Invalid credentials', 401);
    } else {
        throw new ApiError('Server Error: Internal server error occurred', 500);
    }
};

export const errorQueryOptions = queryOptions({
    queryKey: ['error-test'],
    queryFn: () => fetchErrorData(),
    retry: false,
    staleTime: 0,
});