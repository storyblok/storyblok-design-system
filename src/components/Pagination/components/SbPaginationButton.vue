<template>
  <button
    v-if="buttonLabel"
    class="sb-pagination__button sb-pagination__button--withLabel"
    :class="{
      'sb-pagination__button--disabled': disabled,
      'sb-pagination__button--outlined': isOutlined,
    }"
    :disabled="disabled"
    :aria-label="tooltipLabel"
  >
    {{ buttonLabel }}
  </button>
  <button
    v-else
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
      required: false,
    },
    tooltipLabel: {
      type: String,
      required: false,
    },
    buttonLabel: {
      type: String,
      default: '',
    },
    isOutlined: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
