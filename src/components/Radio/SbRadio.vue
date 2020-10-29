<template>
  <div :class="inline ? 'sb-radio-type--inline' : ''">
    <input
      :id="id"
      type="radio"
      class="sb-radio__input"
      :name="name"
      :value="value"
      :checked="checked"
      :required="required"
      :disabled="disabled"
    >
    <label
      :for="id"
      class="sb-radio__label"
    >{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'SbRadio',
  props: {
    inline: {
      type: Boolean
    },
    // className: {
    //   type: String,
    //   default: null
    // },
    label: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    checked: {
      type: Boolean
    },
    required: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  }
}
</script>
