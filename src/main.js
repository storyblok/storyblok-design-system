// Import global assets
import './assets/styles/global.scss'

// Import vue components
import * as components from './components'

import { Tooltip } from './directives'

// Import SbModal Plugin
import createModalPlugin from './components/Modal/plugin/create-modal-plugin'

// Create module definition for Vue.use()
const BlokInkPlugin = {
  installed: false,

  install(app, options) {
    if (this.installed) return

    this.installed = true
    for (const key in components) {
      app.component(key, components[key])
    }

    app.directive('tooltip', Tooltip)

    app.config.globalProperties.$sb = {
      modal: createModalPlugin(app),
    }
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
