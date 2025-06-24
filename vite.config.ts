import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tailwindcss(),
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
        tsconfigPaths(),
    ],
    server: {
        port: 3005,
    },
})
