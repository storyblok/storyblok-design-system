<template>
  <div class="sb-form-item">
    <div class="sb-form-item__top-container">
      <label v-if="label" class="sb-form-item__label">{{ label }}</label>
      <SbTooltip v-if="helperIconText" :label="helperIconText">
        <SbIcon
          v-if="helperIconText"
          color="primary-dark"
          name="help"
          size="small"
          class="sb-form-item__helper-icon-text"
        />
      </SbTooltip>
      <span v-if="helperText" class="sb-form-item__helper-text">{{
        helperText
      }}</span>
    </div>
    <slot />
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
    helperText: {
      type: String,
      default: null,
    },
  },
}
</script>
