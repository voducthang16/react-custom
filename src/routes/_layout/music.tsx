import { AudioPlayerDemo } from '@/components/AudioPlayerDemo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/music')({
    component: RouteComponent,
    staticData: {
        title: 'Music',
    },
})

function RouteComponent() {
    return <div>
        <AudioPlayerDemo />
    </div>
}
