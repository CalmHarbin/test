import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'

import path from 'path'

export default defineConfig(({ mode }) => {
    const envDir = `${process.cwd()}/config`
    const envPrefix = 'JOY_'

    const dotEnvData = loadEnv(mode, envDir, envPrefix)

    return {
        define: {
            'process.platform': null,
            'process.env': {}
        },
        envDir,
        envPrefix,
        plugins: [
            createHtmlPlugin({
                minify: true,
                entry: 'src/main.ts',
                template: 'index.html',
                inject: {
                    data: {
                        title: dotEnvData.JOY_APPLICATION_TITLE
                    }
                }
            }),
            vue(),
            vueJsx()
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    }
})
