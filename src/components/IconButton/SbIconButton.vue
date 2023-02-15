<template>
  <button class="sb-icon-button">
    <SbIcon :name="iconName" :color="iconColor" :size="iconSize" />
  </button>
</template>

<script>
import SbIcon from '../Icon'

export default {
  name: 'SbIconButton',

  components: {
    SbIcon,
  },

  props: {
    iconColor: {
      type: String,
      default: null,
    },
    iconName: {
      type: String,
      default: null,
    },
    iconSize: {
      type: String,
      default: 'normal',
    },
  },
}
</script>
