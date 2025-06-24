import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/about')({
    component: About,
    staticData: {
        title: 'About',
    },
})

function About() {
    return (
        <div className="p-2">
            <h1 className="text-3xl font-bold mb-6">About Page</h1>
            <p className="mb-8">This page demonstrates the custom route hooks for TanStack Router.</p>
        </div>
    )
}
