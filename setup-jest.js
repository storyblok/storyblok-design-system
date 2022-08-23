import { createLocalVue } from '@vue/test-utils'
import VueMask from 'v-mask'

global.localVue = createLocalVue()

global.localVue.use(VueMask)