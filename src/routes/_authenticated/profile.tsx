import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/profile')({
    component: Profile,
    staticData: {
        title: "Profile",
    },
});

function Profile() {
    const { auth } = Route.useRouteContext();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                <p className="mt-2 text-gray-600">
                    Manage your personal information and account settings.
                </p>
            </div>

            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                </div>
                
                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4">
                            {auth.user?.image && (
                                <img 
                                    src={auth.user.image} 
                                    alt={`${auth.user.firstName} ${auth.user.lastName}`}
                                    className="w-16 h-16 rounded-full"
                                />
                            )}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    {auth.user?.firstName} {auth.user?.lastName}
                                </h3>
                                <p className="text-gray-600">@{auth.user?.username}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50">
                                {auth.user?.firstName}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50">
                                {auth.user?.lastName}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50">
                                {auth.user?.email}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50">
                                {auth.user?.username}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50 capitalize">
                                {auth.user?.gender}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">User ID</label>
                            <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50">
                                {auth.user?.id}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}