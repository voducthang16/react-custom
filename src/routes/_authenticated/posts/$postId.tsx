import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { postQueryOptions } from '@/src/query/post'

export const Route = createFileRoute('/_authenticated/posts/$postId')({
    component: PostDetail,
})

function PostDetail() {
    const { postId } = Route.useParams();
    const { data: post, isLoading, error } = useQuery(postQueryOptions(postId));

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 text-lg">Loading post...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <div className="text-red-500 text-xl">⚠️</div>
                    <h2 className="text-xl font-semibold text-red-800 ml-2">Error Loading Post</h2>
                </div>
                <p className="text-red-700 mb-4">{error.message}</p>
                <Link
                    to="/posts"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    ← Back to Posts
                </Link>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">Post Not Found</h2>
                <p className="text-gray-500 mb-6">The post you're looking for doesn't exist.</p>
                <Link
                    to="/posts"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    ← Back to Posts
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <Link
                    to="/posts"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Posts
                </Link>
                <div className="text-sm text-gray-500">
                    Post ID: {postId}
                </div>
            </div>

            <article className="bg-white">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-semibold">#{post.id}</span>
                            </div>
                            <span>Post {post.id}</span>
                        </div>
                    </div>
                </header>

                <div className="prose prose-lg max-w-none">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Content</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {post.body}
                        </p>
                    </div>
                </div>
            </article>
        </div>
    );
}
