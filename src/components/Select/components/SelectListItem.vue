<template>
  <li
    class="sb-select-list__item"
    :class="computedClasses"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <SbAvatar
      v-if="useAvatars"
      :src="src"
      :name="label"
      show-name
      size="small"
    />

    <template v-else>
      <SbCheckbox v-if="multiple" :value="isSelected" />

      <span class="sb-select-list__item-name">{{ label }}</span>
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

    // Avatar properties
    useAvatars: Boolean,
    src: {
      type: String,
      default: null,
    },

    isFocused: Boolean,
  },

  computed: {
    isSelected() {
      return isArray(this.inputValue)
        ? includes(this.inputValue, this.value)
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
    /**
     * emits the 'emit-value' event
     */
    handleClick() {
      this.$emit('emit-value', this.value)
    },

    /**
     * handle with keydown event
     * @param {Event} event
     */
    handleKeyDown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        this.$emit('emit-value', this.value)
      }
    },
  },
}
</script>
