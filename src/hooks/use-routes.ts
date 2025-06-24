import { useRouter, useLocation, useMatches } from '@tanstack/react-router';
import type { FileRouteTypes } from '../routeTree.gen';
import { useMemo } from 'react';

export interface RouteInfo {
    id: FileRouteTypes['id'];
    path: string;
    fullPath: string;
    title?: string;
}

export interface BreadcrumbItem {
    path: string;
    label: string;
    isActive: boolean;
}

export interface CurrentRouteInfo {
    id: FileRouteTypes['id'];
    name: string;
    fullPath: string;
    title?: string;
    params?: Record<string, any>;
}

const convertToNavigationRoutes = (routes: any[]): RouteInfo[] => {
    const result: RouteInfo[] = [];

    routes.forEach((route) => {
        if (route.path === '/') return;

        if (route.children?.length) {
            result.push(...convertToNavigationRoutes(route.children));
        }

        if (!route.options?.staticData?.title) return;

        const routeInfo: RouteInfo = {
            id: route.id,
            path: route.path,
            fullPath: route.fullPath,
            title: route.options.staticData.title,
        };

        result.push(routeInfo);
    });

    return result;
};

export function useNavigationRoutes(): RouteInfo[] {
    const router = useRouter();

    const routes = router.routeTree.children || [];
    return convertToNavigationRoutes(Array.from(routes as any));
}

export function useCurrentRoute(): CurrentRouteInfo | null {
    const matches = useMatches();
    const location = useLocation();

    return useMemo(() => {
        if (!matches.length) return null;

        const currentMatch = matches[matches.length - 1];
        
        return {
            id: currentMatch.routeId as FileRouteTypes['id'],
            name: currentMatch.routeId,
            fullPath: location.pathname,
            title: currentMatch.staticData?.title || currentMatch.routeId,
            params: currentMatch.params,
        };
    }, [matches, location.pathname]);
}

export function useBreadcrumbs(): BreadcrumbItem[] {
    const matches = useMatches();
    const location = useLocation();

    return useMemo(() => {
        const breadcrumbs: BreadcrumbItem[] = [];
        
        breadcrumbs.push({
            path: '/',
            label: 'Home',
            isActive: location.pathname === '/',
        });

        matches.forEach((match, index) => {
            if (match.routeId === '__root__') return;

            const title = match.staticData?.title || match.routeId;
            const isLast = index === matches.length - 1;

            breadcrumbs.push({
                path: match.pathname,
                label: title,
                isActive: isLast,
            });
        });

        return breadcrumbs;
    }, [matches, location.pathname]);
}
