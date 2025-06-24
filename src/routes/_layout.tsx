import { createFileRoute, Outlet } from '@tanstack/react-router';
import NavigationHeader from '@/components/NavigationHeader';

export const Route = createFileRoute('/_layout')({
    component: LayoutWrapper,
});

function LayoutWrapper() {
    return (
        <>
            <NavigationHeader />
            <hr />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </div>
        </>
    );
}