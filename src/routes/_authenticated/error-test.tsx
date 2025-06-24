import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { errorQueryOptions } from '@/src/query/error';

export const Route = createFileRoute('/_authenticated/error-test')({
    component: ErrorTest,
    pendingComponent: () => (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <span className="ml-3 text-gray-600 text-lg">Testing error handling...</span>
        </div>
    ),
    errorComponent: ({ error, reset }) => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Route Error Occurred</h3>
                        <div className="mt-2 text-sm text-red-700">
                            <p><strong>Error:</strong> {error.message}</p>
                            <p><strong>Type:</strong> {error.name}</p>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={reset}
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ),
    staticData: {
        title: "Error Test",
    },
});

function ErrorTest() {
    const [triggerError, setTriggerError] = useState(false);
    const [errorType, setErrorType] = useState<'query' | 'component' | 'async'>('query');

    const { data, isLoading, error, refetch } = useQuery({
        ...errorQueryOptions,
        enabled: triggerError && errorType === 'query',
    });

    const handleComponentError = () => {
        if (errorType === 'component') {
            throw new Error('Component Error: Intentional error thrown in component render');
        }
    };

    const handleAsyncError = async () => {
        if (errorType === 'async') {
            try {
                await new Promise((_, reject) => {
                    setTimeout(() => {
                        reject(new Error('Async Error: Promise rejection after 1 second'));
                    }, 1000);
                });
            } catch (error) {
                throw error;
            }
        }
    };

    // Trigger component error if selected
    handleComponentError();

    // Trigger async error if selected
    if (triggerError && errorType === 'async') {
        handleAsyncError();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">🚨 Error Testing</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Test different types of errors and error boundaries
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Error Type Selection */}
                    <div>
                        <label className="text-base font-medium text-gray-900">Error Type:</label>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center">
                                <input
                                    id="query-error"
                                    name="error-type"
                                    type="radio"
                                    checked={errorType === 'query'}
                                    onChange={() => setErrorType('query')}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                />
                                <label htmlFor="query-error" className="ml-3 block text-sm font-medium text-gray-700">
                                    Query Error (React Query error)
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="component-error"
                                    name="error-type"
                                    type="radio"
                                    checked={errorType === 'component'}
                                    onChange={() => setErrorType('component')}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                />
                                <label htmlFor="component-error" className="ml-3 block text-sm font-medium text-gray-700">
                                    Component Error (Render error)
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="async-error"
                                    name="error-type"
                                    type="radio"
                                    checked={errorType === 'async'}
                                    onChange={() => setErrorType('async')}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                />
                                <label htmlFor="async-error" className="ml-3 block text-sm font-medium text-gray-700">
                                    Async Error (Promise rejection)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Trigger Button */}
                    <div>
                        <button
                            onClick={() => setTriggerError(true)}
                            disabled={triggerError}
                            className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {triggerError ? 'Error Triggered' : 'Trigger Error'}
                        </button>

                        {triggerError && (
                            <button
                                onClick={() => {
                                    setTriggerError(false);
                                    refetch();
                                }}
                                className="ml-4 bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Query Error Display */}
                    {triggerError && errorType === 'query' && (
                        <div className="mt-6">
                            {isLoading && (
                                <div className="flex items-center text-gray-600">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                                    Loading error data...
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-red-800">Query Error Details:</h3>
                                    <p className="mt-1 text-sm text-red-700">{error.message}</p>
                                    <button
                                        onClick={() => refetch()}
                                        className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                    >
                                        Retry Query
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Status Display */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900">Current Status:</h3>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                            <li>Error Type: <span className="font-medium">{errorType}</span></li>
                            <li>Error Triggered: <span className="font-medium">{triggerError ? 'Yes' : 'No'}</span></li>
                            <li>Query Loading: <span className="font-medium">{isLoading ? 'Yes' : 'No'}</span></li>
                            <li>Query Error: <span className="font-medium">{error ? 'Yes' : 'No'}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}