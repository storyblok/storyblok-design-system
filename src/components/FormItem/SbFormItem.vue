<template>
  <div class="sb-form-item" :class="{ 'sb-form-item--grouped': grouped }">
    <div v-if="label" class="sb-form-item__top-container">
      <label v-if="label" class="sb-form-item__label" :for="labelFor">
        {{ label }}

        <span v-if="isRequired" class="sb-form-item__required">*</span>

        <SbIcon
          v-if="helperIconText"
          v-tooltip="{ label: helperIconText, textAlign: helperTextAlign }"
          color="primary-dark"
          name="help"
          class="sb-form-item__helper-icon-text"
        />
      </label>
      <span
        v-if="helperText && !$slots.helper"
        class="sb-form-item__helper-text"
      >
        {{ helperText }}
      </span>
      <slot name="helper" />
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
    isRequired: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    if (this.helperText && this.$slots.helper) {
      console.warn(
        `[SbFormItem]: If the 'helper slot' and the helper-text property are set, only the contents of the slot will be shown`
      )
    }
  },
}
</script>
