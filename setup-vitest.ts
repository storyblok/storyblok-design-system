import { config } from '@vue/test-utils'
import * as SbComponents from './src/components/index.js'

config.global.components = { ...SbComponents }
config.global.renderStubDefaultSlot = true
