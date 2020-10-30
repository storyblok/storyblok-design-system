<template>
  <li
    class="sb-select-list__item"
    :class="{
      'sb-select-list__item--selected': isSelected,
    }"
    @click="handleClick"
  >
    <SbAvatar
      v-if="useAvatars"
      :src="src"
      :name="label"
      show-name
      size="small"
    />

    <template v-else>
      <input v-if="multiple" type="checkbox" :checked="isSelected" />
      <span class="sb-select-list__item-name">{{ label }}</span>
    </template>
  </li>
</template>

<script>
import { includes, isArray } from '../../../utils'
import SbAvatar from '../../Avatar'

export default {
  name: 'SbSelectInner',

  components: {
    SbAvatar,
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
  },

  computed: {
    isSelected() {
      return isArray(this.inputValue)
        ? includes(this.inputValue, this.value)
        : this.value === this.inputValue
    },
  },

  methods: {
    /**
     * emits the 'emit-value' event
     */
    handleClick() {
      this.$emit('emit-value', this.value)
    },
  },
}
</script>
