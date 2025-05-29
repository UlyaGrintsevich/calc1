import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {viteSingleFile} from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteSingleFile()],
    define: {
        __BUILD_DATE__: JSON.stringify(
            new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Minsk' })
        ),
    },
})
