import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/components', import.meta.url)
      ),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@styles': fileURLToPath(new URL('src/assets/styles', import.meta.url)),
    },
    extensions: ['.mjs', '.js', '.json', '.vue', '.ts'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/assets/styles/variables.scss";
        @import "./src/assets/styles/mixins.scss";
        @import "./src/assets/styles/mq.scss";
        `,
      },
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'BlokInkPlugin',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'storyblok-design-system',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css')
            return 'storyblok-design-system.css'
          return assetInfo.name
        },
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
