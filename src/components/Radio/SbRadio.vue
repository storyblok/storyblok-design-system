<template>
  <div :class="componentClasses">
    <input
      :id="id"
      type="radio"
      class="sb-radio__input"
      :name="name"
      :value="value"
      :checked="checked"
      :required="required"
      :disabled="disabled"
    />
    <label :for="id" class="sb-radio__label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'SbRadio',
  props: {
    inline: {
      type: Boolean,
    },
    outline: {
      type: Boolean,
    },
    label: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    checked: {
      type: Boolean,
    },
    required: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  computed: {
    componentClasses() {
      return [
        'sb-radio',
        this.inline && 'sb-radio--inline',
        this.outline && 'sb-radio--outline',
      ]
    },
  },
}
</script>
