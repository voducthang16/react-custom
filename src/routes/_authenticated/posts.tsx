import { postsQueryOptions } from '@/src/query/post';
import { createFileRoute, Outlet, Link, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/posts')({
    component: Posts,
    loader: ({ context }) => {
        console.info('Loading posts...', context);
        return (context as any).queryClient.ensureQueryData(postsQueryOptions);
    },
    pendingComponent: () => (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 text-lg">Loading posts...</span>
        </div>
    ),
    staticData: {
        title: "Posts",
    },
    notFoundComponent: () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold">Page Posts Not Found</h1>
            <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
        </div>
    ),
})

function Posts() {
    const posts = useLoaderData({ from: '/_authenticated/posts' });

    return (
        <div className="flex h-full">
            <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">📝 Posts</h2>

                {posts && (
                    <div className="space-y-3">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                to="/posts/$postId"
                                params={{ postId: post.id }}
                                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                            >
                                <h3 className="font-semibold text-gray-900 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                                    {post.body}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 p-6">
                <div className="bg-blue-50 p-4 rounded-lg border mb-6">
                    <p className="text-sm text-blue-800">
                        Select a post from the list to view its details. The outlet will render the selected post's content.
                    </p>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
