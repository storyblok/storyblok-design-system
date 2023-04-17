<template>
  <li
    class="sb-select-list__item"
    :title="label"
    :class="computedClasses"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <SbAvatar
      v-if="useAvatars"
      :key="label"
      :src="option.src"
      :name="label"
      show-name
      size="small"
    />

    <template v-else>
      <SbCheckbox
        v-if="multiple"
        :model-value="isSelected"
        :disabled="isDisabled"
      />

      <slot name="list-item"
:item="option">
        <span class="sb-select-list__item-icon">
          <SbIcon v-if="option.icon"
:name="option.icon" />
        </span>

        <span v-if="!showCaption"
class="sb-select-list__item-name">{{
          label
        }}</span>

        <div v-else
class="sb-select-list__item--with-path">
          <span class="sb-select-list__item-name">{{ label }}</span>
          <span v-if="showCaption"
class="sb-select-list__item-caption">{{
            path
          }}</span>
        </div>
      </slot>
    </template>
  </li>
</template>

<script>
import { includes, isArray } from '../../../utils'
import SbAvatar from '../../Avatar'
import SbCheckbox from '../../Checkbox'
import SbIcon from '../../Icon'

export default {
  name: 'SbSelectListItem',

  components: {
    SbAvatar,
    SbCheckbox,
    SbIcon,
  },

  props: {
    inputValue: {
      type: [String, Number, Array],
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    multiple: Boolean,
    modelValue: {
      type: [String, Number],
      default: '',
    },
    option: {
      type: Object,
      default: () => ({}),
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    emitOption: Boolean,

    // Avatar properties
    useAvatars: Boolean,
    src: {
      type: String,
      default: null,
    },

    isFocused: Boolean,
    selected: Boolean,

    showCaption: Boolean,
    path: {
      type: String,
      default: null,
    },

    isDisabled: Boolean,
  },

  emits: ['emit-value'],

  computed: {
    isSelected() {
      return isArray(this.inputValue)
        ? this.isValueAlreadyExists()
        : this.modelValue === this.inputValue
    },

    computedClasses() {
      return [
        (this.isSelected || this.selected) && 'sb-select-list__item--selected',
        this.isFocused && 'sb-select-list__item--focused',
        this.isDisabled && 'sb-select-list__item--disabled',
      ]
    },
  },

  methods: {
    handleEmitValue() {
      if (this.emitOption) {
        return this.$emit('emit-value', this.option)
      }

      this.$emit('emit-value', this.modelValue)
    },

    /**
     * emits the 'emit-value' event
     */
    handleClick() {
      if (this.isDisabled) return

      this.handleEmitValue()
    },

    /**
     * handle with keydown event
     * @param {Event} event
     */
    handleKeyDown(event) {
      if (this.isDisabled) return

      if (event.key === 'Enter' || event.key === ' ') {
        this.handleEmitValue()
      }
    },

    isValueAlreadyExists() {
      if (this.emitOption) {
        const itemValue = this.modelValue

        return this.inputValue.some(($v) => $v[this.itemValue] === itemValue)
      }

      return this.selected || includes(this.inputValue, this.modelValue)
    },
  },
}
</script>
