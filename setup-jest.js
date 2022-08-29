import { createLocalVue } from '@vue/test-utils'
import { maska } from 'maska'

global.localVue = createLocalVue()

global.localVue.use(maska)
