import { defineConfig } from 'vite';
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
        `,
      },
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.js'),
      name: 'BlokInk',
      // the proper extensions will be added
      fileName: 'storyblok-design-system',
    },
    rollupOptions: {
      output: {
        exports: 'named'
      },
    }
  }
});
