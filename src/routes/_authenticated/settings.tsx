import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings')({
    component: Settings,
    staticData: {
        title: 'Settings',
    },
})

function Settings() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Settings & Advanced Route Analysis</h1>
            </div>
        </div>
    )
}
