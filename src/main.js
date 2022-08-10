// Import global assets
import './assets/styles/global.scss'

// Import vue components
import * as components from './components'

import { Tooltip } from './directives'

// Import SbModal Plugin
import createModalPlugin from './components/Modal/plugin/create-modal-plugin'

// Prefered: as a plugin (directive + filter) + custom placeholders support
import VueMask from 'v-mask'


// Create module definition for Vue.use()
const BlokInkPlugin = {
  installed: false,

  install(VueInstance) {
    if (this.installed) return

    this.installed = true
    for (const key in components) {
      VueInstance.component(key, components[key])
    }

    VueInstance.directive('tooltip', Tooltip)

    VueInstance.prototype.$sb = {
      // modal will be available in this.$sb.modal(options)
      modal: createModalPlugin(VueInstance),
    }

    VueInstance.use(VueMask)
  },
}

// Auto-install when vue is found
let GlobalVue = null

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(BlokInkPlugin)
}

// Exporting components
export * from './components'

// Exporting the plugin definition to Vue.use
export default BlokInkPlugin
