import { createFileRoute, Block } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/navigation-blocking')({
    component: NavigationBlocking,
    staticData: {
        title: "Navigation Blocking",
    },
});

function NavigationBlocking() {

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">🚧 Navigation Blocking</h1>
                </div>

                <Block
                    shouldBlockFn={() => {
                        return true
                    }}
                    withResolver
                >
                    {({ status, proceed, reset }) => (
                        <>
                            {status === 'blocked' && (
                                <div className="fixed inset-0 bg-black/25 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                                    <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-lg bg-white">
                                        <div className="mt-3">
                                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                                                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                            </div>

                                            <div className="mt-3 text-center">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                    Unsaved Changes
                                                </h3>
                                                <div className="mt-2 px-7 py-3">
                                                    <p className="text-sm text-gray-500">
                                                        You have unsaved changes that will be lost if you leave this page.
                                                        What would you like to do?
                                                    </p>
                                                </div>

                                                <div className="space-y-2">
                                                    <button
                                                        onClick={proceed}
                                                        className="w-full inline-flex justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        Leave
                                                    </button>

                                                    <button
                                                        onClick={reset}
                                                        className="w-full inline-flex justify-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </Block>
            </div>
        </div>
    );
}