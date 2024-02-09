// Import global assets
import './assets/styles/global.scss'

import * as components from './components'

import { Tooltip } from './directives'

// Import SbModal Plugin
// import createModalPlugin from './components/Modal/plugin/create-modal-plugin'

// Create module definition for Vue.use()
const BlokInkPlugin = {
  installed: false,

  install(app, options) {
    if (this.installed) return

    this.installed = true
    const hasComponentsOption = options && options.withComponents?.length > 0

    for (const key in components) {
      if (hasComponentsOption && options.withComponents.includes(key)) {
        app.component(key, components[key])
      } else if (!hasComponentsOption) {
        app.component(key, components[key])
      }
    }

    app.directive('tooltip', Tooltip)

    // app.config.globalProperties.$sb = {
    //   modal: createModalPlugin(app),
    // }
  },
}

// Exporting components
export * from './components'

// Exporting the plugin definition to Vue.use
export default BlokInkPlugin
