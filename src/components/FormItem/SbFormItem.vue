<template>
  <div class="sb-form-item" :class="{ 'sb-form-item--grouped': grouped }">
    <div v-if="label" class="sb-form-item__top-container">
      <label v-if="label" class="sb-form-item__label" :for="labelFor">
        {{ label }}

        <SbIcon
          v-if="helperIconText"
          v-tooltip="{ label: helperIconText, textAlign: helperTextAlign }"
          color="primary-dark"
          name="help"
          class="sb-form-item__helper-icon-text"
        />
      </label>
      <span v-if="helperText" class="sb-form-item__helper-text">
        {{ helperText }}
      </span>
    </div>
    <div class="sb-form-item__body">
      <slot />
    </div>
  </div>
</template>

<script>
import SbIcon from '../Icon'
import { Tooltip } from '../../directives'

export default {
  name: 'SbFormItem',

  directives: {
    tooltip: Tooltip,
  },

  components: {
    SbIcon,
  },

  props: {
    label: {
      type: String,
      default: null,
    },
    helperIconText: {
      type: String,
      default: null,
    },
    helperTextAlign: {
      type: String,
      default: 'center',
    },
    helperText: {
      type: String,
      default: null,
    },
    grouped: Boolean,
    labelFor: {
      type: String,
      default: null,
    },
  },
}
</script>
