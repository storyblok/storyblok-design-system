<template>
  <Teleport :to="portalTarget" :disabled="disabled">
    <slot></slot>
  </Teleport>
</template>

<script>
import { canUseDOM } from '../../utils'

export default {
  name: 'SbPortal',

  props: {
    as: {
      type: String,
      default: 'div',
    },
    disabled: Boolean,
    name: String,
    target: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      portalTarget: undefined,
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
    createPortalTarget(target, tag) {
      if (!canUseDOM || !target) {
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

    mountTarget() {
      if (!canUseDOM) {
        return
      }
      this.portalTarget = this.createPortalTarget(this.target, this.as)
    },

    unmountTarget() {
      if (!this.disabled && this.unmountOnDestroy && !this.target.length) {
        canUseDOM &&
          this.portalTarget.isConnected &&
          document.body.removeChild(this.portalTarget)
      }
    },
  },
}
</script>
