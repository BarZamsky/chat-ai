import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/postcss'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                ref: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    removeUselessStrokeAndFill: false,
                                    removeViewBox: false,
                                },
                            },
                        },
                    ],
                },
            },
        }),
    ],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
