<template>
  <Teleport :to="portalTarget" :disabled="disabled">
    <slot></slot>
  </Teleport>
</template>

<script>
import { canUseDOM } from '../../utils'

export default {
  name: 'SbPortal',

  inheritAttrs: false,

  props: {
    as: {
      type: String,
      default: 'div',
    },
    disabled: Boolean,
    unmountOnDestroy: {
      type: Boolean,
      default: true,
    },
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
    // console.log("unmounting portal", this.target)
    this.unmountTarget()
  },

  unounted() {
    // console.log("unmounted portal", this.target)
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
      const wrapper = document.querySelector('#portal-wrapper')
      const parentEl = wrapper || document.body

      const el = document.createElement(tag)
      if (target.startsWith('#')) {
        el.id = target.slice(target.indexOf('#') + 1)
      }

      if (parentEl) {
        parentEl.appendChild(el)
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
      if (
        !this.disabled &&
        this.unmountOnDestroy &&
        this.target.length > 0 &&
        canUseDOM &&
        this.portalTarget
      ) {
        const wrapper = document.querySelector('#portal-wrapper')
        const parentEl = wrapper || document.body
        parentEl.removeChild(this.portalTarget)
      }
    },
  },
}
</script>
