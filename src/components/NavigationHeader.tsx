import { Link } from '@tanstack/react-router';
import { useNavigationRoutes, useCurrentRoute } from '@/hooks/use-routes';

export function NavigationHeader() {
    const navigationRoutes = useNavigationRoutes();
    const currentRoute = useCurrentRoute();

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link
                        to="/"
                        className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        activeProps={{
                            className: '!text-blue-600',
                        }}
                    >
                        My Application
                    </Link>
                    <nav className="flex space-x-6">
                        {navigationRoutes.map((route) => (
                            <Link
                                key={route.id}
                                to={route.fullPath}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-gray-900 hover:bg-gray-100`}
                                activeProps={{
                                    className: 'bg-blue-100 text-blue-700',
                                }}
                            >
                                {route.title}
                            </Link>
                        ))}
                    </nav>

                    {currentRoute && (
                        <div className="text-sm text-gray-500">
                            Current: <span className="font-medium">{currentRoute.title}</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default NavigationHeader;