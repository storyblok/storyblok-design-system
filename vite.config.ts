import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@styles': resolve(__dirname, 'src/assets/styles'),
      vue$: resolve(__dirname, 'node_modules/vue'),
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
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css')
            return 'storyblok-design-system.css'
          return assetInfo.name
        },
      },
    },
  },
})
