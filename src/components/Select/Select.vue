<template>
  <div
    class="sb-select"
    :class="{
      'sb-select--multiple': multiple,
    }"
  >
    <SbSelectInner
      :multiple="multiple"
      :label="label"
      :value="value"
      :left-icon="leftIcon"
      @click="handleSelectInnerClick"
      @clear-all-values="handleClearAllValues"
      @remove-item-value="handleRemoveItemValue"
    />

    <SbSelectList
      v-if="isOpen"
      :value="value"
      :options="options"
      :multiple="multiple"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      @emit-value="handleEmitValue"
    />
  </div>
</template>

<script>
import { includes } from '../../utils'
import SbSelectInner from './components/SelectInner'
import SbSelectList from './components/SelectList'

export default {
  name: 'SbSelect',

  components: {
    SbSelectInner,
    SbSelectList,
  },

  props: {
    // component props
    value: {
      type: [String, Number, Array],
      default: null,
    },
    multiple: Boolean,

    // inner props
    label: {
      type: String,
      default: '',
      required: true,
    },
    leftIcon: {
      type: String,
      default: null,
    },

    // list props
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    filterable: Boolean,
    filterPlaceholder: {
      type: String,
      default: 'Filter options',
    },
  },

  data: () => ({
    isOpen: false,
  }),

  methods: {
    /**
     * shows the items list
     */
    show() {
      this.isOpen = true
      this.$emit('show')
    },

    /**
     * hides the items list
     */
    hide() {
      this.isOpen = false
      this.$emit('hide')
    },

    /**
     * shows or hides the items list according to internal state
     */
    handleSelectInnerClick() {
      if (this.isOpen) {
        this.hide()
      } else {
        this.show()
      }
    },

    /**
     * emits the input event to make this component compatible with v-model directive
     */
    handleEmitValue(value) {
      // doesn't close the list
      if (this.multiple) {
        this.$emit('input', this.processMultipleValue(value))
        return
      }

      this.$emit('input', value)
      this.isOpen = false
    },

    /**
     * returns the processed value to input event
     */
    processMultipleValue(value) {
      if (includes(this.value, value)) {
        return this.value.filter((val) => val !== value)
      }

      return [...(this.value || []), value]
    },

    /**
     * emit an input event with the item from tag that was removed
     */
    handleRemoveItemValue(itemValue) {
      if (this.multiple) {
        this.$emit('input', this.processMultipleValue(itemValue))
      }
    },

    /**
     * emit an input event to clear all selected values
     */
    handleClearAllValues() {
      if (this.multiple) {
        this.$emit('input', [])
      }
    },
  },
}
</script>
