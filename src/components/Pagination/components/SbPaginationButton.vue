<template>
  <button
    v-tooltip="{
      label: tooltipLabel,
      position: 'bottom',
    }"
    class="sb-pagination__button"
    :class="{
      'sb-pagination__button--disabled': disabled,
    }"
    :disabled="disabled"
    :aria-label="tooltipLabel"
    v-on="$listeners"
  >
    <SbIcon :name="icon" size="normal" />
  </button>
</template>

<script>
import SbIcon from '../../Icon'
import { Tooltip } from '../../../directives'
export default {
  name: 'SbPaginationButton',

  components: {
    SbIcon,
  },

  directives: {
    tooltip: Tooltip,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: true,
    },
    tooltipLabel: {
      type: String,
      required: true,
    },
  },
}
</script>
