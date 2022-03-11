<template>
  <div
    v-if="title"
    class="sb-modal-header"
    :class="{ 'sb-modal-header--left': isLeftAlignment }"
  >
    <SbIcon
      v-if="icon"
      :name="icon"
      size="x-large"
      :background-color="iconBackground"
    />
    <h1 class="sb-modal-header__title">
      {{ title }}
    </h1>

    <div v-if="$slots.actions" class="sb-modal-header__actions">
      <slot name="actions" />
    </div>
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
    iconBackground: {
      type: String,
      default: null,
    },
    align: {
      type: String,
      default: 'center',
    },
  },

  computed: {
    isLeftAlignment() {
      return this.align === 'left'
    },
  },
}
</script>
