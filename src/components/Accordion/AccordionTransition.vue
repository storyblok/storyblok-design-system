<template>
  <Transition
    name="sb-accordion-transition"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </Transition>
</template>

<script>
export default {
  name: 'AccordionTransition',
  setup() {
    function beforeEnter(el) {
      if (!el.dataset) el.dataset = {}

      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom

      el.style.maxHeight = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    }

    function enter(el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.maxHeight = 0
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
    }

    function afterEnter(el) {
      el.style.maxHeight = ''
      el.style.overflow = el.dataset.oldOverflow
    }

    function beforeLeave(el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.maxHeight = `${el.scrollHeight}px`
      el.style.overflow = 'hidden'
    }

    function leave(el) {
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    }

    function afterLeave(el) {
      el.style.maxHeight = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
    return {
      beforeEnter,
      enter,
      afterEnter,
      beforeLeave,
      leave,
      afterLeave,
    }
  },
}
</script>

<style lang="scss">
.sb-accordion-transition {
  transition: 0.15s height ease-out;
  transition-property: height, padding-top, padding-bottom;
}

.sb-accordion-transition-leave-active,
.sb-accordion-transition-enter-active {
  transition: 0.15s max-height ease-out;
  transition-property: max-height, padding-top, padding-bottom;
}
</style>
