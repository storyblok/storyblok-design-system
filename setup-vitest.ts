import { config } from '@vue/test-utils'
import * as SbComponents from './src/components/index.js'

config.global.components = { ...SbComponents }
config.global.renderStubDefaultSlot = true

// see https://github.com/jsdom/jsdom/issues/2177
const originalConsoleError = console.error
const jsDomCssError = 'Error: Could not parse CSS stylesheet'
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params)
  }
}
