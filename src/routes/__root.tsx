import type { RouterContext } from '@/src/types';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { createRootRouteWithContext, Outlet, useNavigate } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
    notFoundComponent: NotFound,
    errorComponent: ErrorComponent,
});

function RootLayout() {
    return (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    );
}

function NotFound() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-200">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
                </div>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="space-x-4">
                    <button 
                        onClick={() => navigate({ to: '/' })}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}

function ErrorComponent() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="mt-2 text-gray-600">
                An unexpected error occurred. Please try again later.
            </p>
        </div>
    );
}