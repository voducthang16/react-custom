import { redirect } from '@tanstack/react-router';
import type { RouterContext } from '@/src/types';

interface Location {
    href: string;
}

interface SearchParams {
    redirect?: string;
}

export const requireAuth = (context: RouterContext, location: Location): void => {
    if (!context.auth.isAuthenticated) {
        throw redirect({
            to: '/login',
            search: {
                redirect: location.href,
            },
        });
    }
};

export const requireGuest = (context: RouterContext, search: SearchParams): void => {
    if (context.auth.isAuthenticated) {
        throw redirect({
            to: search.redirect || '/dashboard',
        });
    }
};

export const requireRole = (
    context: RouterContext, 
    location: Location, 
    role: string
): void => {
    requireAuth(context, location);
    
    const userRoles = context.auth.user?.roles || [];
    if (!userRoles.includes(role)) {
        // throw redirect({
        //     to: '/unauthorized',
        // });
    }
};