import { mergeConfig, defineConfig } from 'vite'
import viteConfig from './vite.config'
import { fileURLToPath } from 'node:url'

export default defineConfig(
  mergeConfig(viteConfig, {
    test: {
      root: fileURLToPath(new URL('./', import.meta.url)),
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./setup-vitest.ts'],
      transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$':
          require.resolve('jest-transform-stub'),
        '^.+\\.jsx?$': require.resolve('babel-jest'),
      },
      coverage: {
        reporter: ['lcovonly'],
        exclude: ['node_modules/'],
      },
      include: [
        './src/**/*.(test|specs|spec).(js|jsx|ts|tsx)',
        './tests/**/*.(test|specs|spec).[jt]s?(x)',
      ],
      exclude: ['**/node_modules/**'],
    },
  })
)
