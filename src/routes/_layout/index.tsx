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
            <h1>Home Page</h1>
            <p>This page has the navigation header and layout.</p>
        </div>
    );
}