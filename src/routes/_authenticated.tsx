import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { requireAuth } from '@/utils/auth-guards';
import NavigationHeader from '@/components/NavigationHeader';

export const Route = createFileRoute('/_authenticated')({
    component: AuthenticatedLayout,
    beforeLoad: ({ context, location }) => {
        requireAuth(context, location);
    },
});

function AuthenticatedLayout() {
    const { auth } = Route.useRouteContext();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        auth.logout();
        navigate({ to: '/login' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavigationHeader />

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        {auth.user?.image && (
                            <img
                                src={auth.user.image}
                                alt={`${auth.user.firstName} ${auth.user.lastName}`}
                                className="w-8 h-8 rounded-full"
                            />
                        )}
                        <span className="text-gray-700">
                            Welcome, {auth.user?.firstName}!
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
                <Outlet />
            </main>
        </div>
    );
}