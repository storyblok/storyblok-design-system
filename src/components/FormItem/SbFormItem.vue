<template>
  <div class="sb-form-item" :class="{ 'sb-form-item--grouped': grouped }">
    <div v-if="label" class="sb-form-item__top-container">
      <label v-if="label" class="sb-form-item__label" :for="labelFor">
        {{ label }}
        <SbTooltip
          v-if="helperIconText"
          :label="helperIconText"
          :text-align="helperTextAlign"
        >
          <SbIcon
            v-if="helperIconText"
            color="primary-dark"
            name="help"
            class="sb-form-item__helper-icon-text"
          />
        </SbTooltip>
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
import SbTooltip from '../Tooltip'

export default {
  name: 'SbFormItem',

  components: {
    SbIcon,
    SbTooltip,
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
