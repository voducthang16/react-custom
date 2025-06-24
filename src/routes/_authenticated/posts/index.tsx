import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/posts/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Select a Post</h3>
            <p className="text-gray-600">
                Choose a post from the list on the left to view its details here.
            </p>
        </div>
    )
}
