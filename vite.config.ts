import path from "path";
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        tailwindcss(),
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
        tsconfigPaths(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',

            pwaAssets: {
                disabled: false,
                config: true,
            },

            manifest: {
                name: 'React Custom PWA',
                short_name: 'React Custom',
                description: 'Learning Service Worker & Workbox',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
            },

            workbox: {
                globPatterns: [
                    '**/*.{js,css,html,svg,png,ico,woff2}'
                ],

                cleanupOutdatedCaches: true,
                clientsClaim: true,
                skipWaiting: true,

                navigateFallback: 'index.html',
            },

            devOptions: {
                enabled: true,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        }),
    ],
    server: {
        port: 3005,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    define: {
        BUILD_TIME: JSON.stringify(new Date().toISOString()),
    }
})