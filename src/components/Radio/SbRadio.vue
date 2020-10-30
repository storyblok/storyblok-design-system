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
    type: {
      type: String,
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
      if (this.type) {
        var classTypes = this.type.split(' ')
        var classes = 'sb-radio'
        for (var i = 0; i < classTypes.length; i++) {
          classes = classes + ' sb-radio--' + classTypes[i]
        }
        return [classes]
      } else {
        return 'sb-radio'
      }
    },
  },
}
</script>
