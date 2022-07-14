import { MountingPortal } from 'portal-vue'

import { canUseDOM } from '../../utils'

/**
 * @vue/component
 *
 * SbPortal component is a wrapper component to PortalVue third library
 * It accepts some properties from MountingPortal component
 * This component has been adapted from chakra-ui component: https://github.com/chakra-ui/chakra-ui-vue
 *
 * @see https://portal-vue.linusb.org/api/mounting-portal.html#example-usage for more information about the Portal Vue library
 */
const SbPortal = {
  name: 'SbPortal',

  components: { MountingPortal },

  props: {
    // component props
    as: {
      type: String,
      default: 'div',
    },
    unmountOnDestroy: Boolean,

    // portal-vue props
    append: Boolean,
    bail: Boolean,
    disabled: Boolean,
    name: String, // eslint-disable-line
    order: Number, // eslint-disable-line
    slim: Boolean,
    targetSlim: Boolean,
    target: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      portalTarget: undefined,
      targetId: undefined,
    }
  },

  created() {
    if (!this.disabled) {
      this.mountTarget()
    }
  },

  beforeUnmount() {
    this.unmountTarget()
  },

  methods: {
    /**
     * creates portal target node
     * @param {String} target
     * @returns {HTMLElement}
     */
    $_createPortalTarget(target, tag) {
      if (!canUseDOM) {
        return
      }

      // prevent create more than one destination element
      const existingPortalElement = document.querySelector(target)

      if (existingPortalElement) {
        return existingPortalElement
      }

      const el = document.createElement(tag)
      if (target.startsWith('#')) {
        el.id = target.slice(target.indexOf('#') + 1)
      }
      if (document.body != null) {
        document.body.appendChild(el)
      }
      return el
    },

    /**
     * mounts the portal target
     */
    mountTarget() {
      if (!canUseDOM) {
        return
      }
      this.portalTarget = this.$_createPortalTarget(this.target, this.as)
    },

    /**
     * remove from the DOM the portal target
     */
    unmountTarget() {
      if (!this.disabled && this.unmountOnDestroy && !this.target.length) {
        canUseDOM &&
          this.portalTarget.isConnected &&
          document.body.removeChild(this.portalTarget)
      }
    },
  },

  render(h) {
    const children = this.$slots.default()

    if (this.disabled) {
      return children[0]
    }

    return h(
      'MountingPortal',
      {
        props: {
          append: this.append,
          mountTo: this.target,
          disabled: this.disabled,
          name: this.name,
          order: this.order,
          slim: this.slim,
          bail: this.bail,
          targetSlim: this.targetSlim,
        },
      },
      children
    )
  },
}

export default SbPortal
