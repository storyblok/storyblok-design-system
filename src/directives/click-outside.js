/**
 * @method validateBinding
 * @param  {{value: Function}} binding
 * @return {Boolean}
 */
const validateBinding = (binding = {}) => {
  const { value } = binding

  if (!value || typeof value !== 'function') {
    console.warn(
      '[v-click-outside]: provided expression',
      binding.expression,
      'must be a function.'
    )
    return false
  }

  return true
}

/**
 * @method isServer
 * @param  {vNode} vNode
 * @return {Boolean}
 */
const isServer = (vNode) => {
  return (
    typeof vNode.componentInstance !== 'undefined' &&
    vNode.componentInstance.$isServer
  )
}

const ClickOutside = {
  mounted(el, binding, vNode) {
    if (!validateBinding(binding)) return

    const handler = (e) => {
      if (!el.contains(e.target)) el.__clickOutside.callback(e)
    }

    if (!isServer(vNode)) {
      document.addEventListener('click', handler)
    }

    el.__clickOutside = {
      handler: handler,
      callback: binding.value,
    }
  },

  updated(el, binding) {
    if (validateBinding(binding)) {
      el.__clickOutside.callback = binding.value
    }
  },

  unmounted(el, _, vNode) {
    if (!el.__clickOutside) return

    if (!isServer(vNode)) {
      document.removeEventListener('click', el.__clickOutside.handler)
    }
    el.__clickOutside.handler = null
    el.__clickOutside.callback = null

    delete el.__clickOutside
  },
}

export default ClickOutside
