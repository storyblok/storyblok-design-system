// Import global assets
import './assets/styles/global.scss'

// Import vue component
import components from './components'

// Import SbModal Plugin
import createModalPlugin from './components/Modal/plugin/create-modal-plugin'

// Declare install function executed by Vue.use()
export function install (Vue) {
  if (install.installed) return

  install.installed = true
  for (const key in components) {
    Vue.component(key, components[key])
  }

  Vue.prototype.$sb = {
    // modal will be available in this.$sb.modal(options)
    modal: createModalPlugin
  }
}

// Create module definition for Vue.use()
const plugin = {
  install
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

// To allow use as module (npm/webpack/etc.) export component
export default components
