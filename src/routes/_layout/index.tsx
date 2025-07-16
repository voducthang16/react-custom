import ServiceWorkerDemo from '@/components/ServiceWorkDemo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/')({
    component: Home,
    staticData: {
        title: 'Home',
    }
});

function Home() {
    return (
        <div>
            <ServiceWorkerDemo />
        </div>
    );
}