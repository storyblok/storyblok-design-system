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
      <SbCheckbox v-if="multiple" :value="isSelected" />

      <span v-if="!showCaption" class="sb-select-list__item-name">{{
        label
      }}</span>

      <div v-else class="sb-select-list__item--with-path">
        <span class="sb-select-list__item-name">{{ label }}</span>
        <span v-if="showCaption" class="sb-select-list__item-caption">{{
          path
        }}</span>
      </div>
    </template>
  </li>
</template>

<script>
import { includes, isArray } from '../../../utils'
import SbAvatar from '../../Avatar'
import SbCheckbox from '../../Checkbox'

export default {
  name: 'SbSelectListItem',

  components: {
    SbAvatar,
    SbCheckbox,
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
    value: {
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

    showCaption: Boolean,
    path: {
      type: String,
      default: null,
    },
  },

  computed: {
    isSelected() {
      return isArray(this.inputValue)
        ? this.isValueAlreadyExists()
        : this.value === this.inputValue
    },

    computedClasses() {
      return [
        this.isSelected && 'sb-select-list__item--selected',
        this.isFocused && 'sb-select-list__item--focused',
      ]
    },
  },

  methods: {
    handleEmitValue() {
      if (this.emitOption) {
        return this.$emit('emit-value', this.option)
      }

      this.$emit('emit-value', this.value)
    },

    /**
     * emits the 'emit-value' event
     */
    handleClick() {
      this.handleEmitValue()
    },

    /**
     * handle with keydown event
     * @param {Event} event
     */
    handleKeyDown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        this.handleEmitValue()
      }
    },

    isValueAlreadyExists() {
      if (this.emitOption) {
        const itemValue = this.value

        return this.inputValue.some(($v) => $v[this.itemValue] === itemValue)
      }

      return includes(this.inputValue, this.value)
    },
  },
}
</script>
