import './index.css';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAuthContext } from './context/auth-context';
import { RouterContext } from './types';

const queryClient = new QueryClient();

const authContext = createAuthContext();

const router = createRouter({
    routeTree,
    defaultPendingMs: 100,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    context: {
        queryClient,
        auth: authContext,
    } satisfies RouterContext,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
    interface StaticDataRouteOption {
        title?: string;
    }
}

console.log(`%cBuild End: ${BUILD_TIME}`, "color: white; font-family: Montserrat; font-size: 24px; background-color: #1d1d1d; padding: 4px; border-radius: 4px");

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>,
    );
}