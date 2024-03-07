<template>
  <div
    :data-testid="`wrapper-${id}`"
    class="sb-toggle"
    :class="componentClasses"
    @click="handleClick"
  >
    <input
      :id="id"
      v-model="internalValue"
      v-bind="$attrs"
      :indeterminate.prop="indeterminate"
      class="sb-toggle__native"
      type="checkbox"
      :name="name"
      :value="nativeValue"
      :required="required"
      :disabled="disabled"
      @click.stop
      @input="handleInput"
    />
    <label :for="id" class="sb-toggle__label">
      {{ label }}
    </label>
    <label v-if="showLabel" :for="id" class="sb-toggle__label-visible">{{
      label
    }}</label>
    <SbIcon
      v-if="icon"
      class="sb-toggle__icon sb-toggle__icon--active"
      :name="icon"
    />
    <SbIcon
      v-if="icon"
      class="sb-toggle__icon sb-toggle__icon--inactive"
      :name="icon"
    />
  </div>
</template>

<script lang="ts">
import CheckboxRadioMixin from '../../mixins/checkbox-radio-mixin'
import SbIcon from '../Icon'

export default {
  name: 'SbToggle',
  components: {
    SbIcon,
  },
  mixins: [CheckboxRadioMixin],
  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    indeterminate: Boolean,
    showLabel: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'click'],

  computed: {
    componentClasses() {
      return {
        [`sb-toggle--${this.variant}`]: this.variant,
        'sb-toggle--disabled': this.disabled,
        'sb-toggle--visible-label': this.showLabel,
      }
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('update:modelValue', e.target.checked)
    },
    handleClick() {
      this.$emit('click', { isDisabled: this.disabled })
    },
  },
}
</script>
