import { createLocalVue } from '@vue/test-utils'
import Maska from 'maska'

global.localVue = createLocalVue()

global.localVue.use(Maska)
