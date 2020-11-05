<template>
  <div
    v-if="title"
    class="sb-modal-header"
    :class="{ 'sb-modal-header--left': returnAlignment }"
  >
    <SbIcon v-if="icon" :name="icon" size="x-large" />
    <h1 class="sb-modal-header__title">
      {{ title }}
    </h1>
    <slot />
  </div>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbModalHeader',

  components: {
    SbIcon,
  },

  props: {
    title: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    align: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    returnAlignment() {
      return this.align === 'left'
    },
  },
}
</script>
