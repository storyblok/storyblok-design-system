<template>
  <div class="sb-select-list" @keydown="handleKeyDown">
    <ul>
      <template v-if="hasOptions">
        <SbSelectListItem
          v-for="(option, index) in options"
          :key="index"
          :label="option[itemLabel]"
          :value="option[itemValue]"
          :input-value="value"
          :multiple="multiple"
          :use-avatars="useAvatars"
          :is-focused="index === focusedItem ? true : false"
          @emit-value="handleEmitValue"
          @mouseenter.native="handleFocusItem(index)"
        />
      </template>
      <li
        v-else-if="!hasOptions && allowCreate && multiple"
        class="sb-select-list__create"
        @keydown.enter="handleOptionCreated(searchInput)"
        @click="handleOptionCreated(searchInput)"
      >
        <span class="sb-select-list__create-label">Create tag</span> "{{
          searchInput
        }}"
      </li>
      <li v-else-if="!hasOptions && !isLoading">
        <span class="sb-select-list__empty">{{ noDataText }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import SbSelectListItem from './SelectListItem'

export default {
  name: 'SbSelectList',

  components: {
    SbSelectListItem,
  },

  inject: ['selectContext'],

  props: {
    // input itself value
    value: {
      type: [String, Number, Array],
      default: null,
    },

    // options
    allowCreate: Boolean,
    isLoading: Boolean,
    multiple: Boolean,
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    useAvatars: Boolean,
    itemLabel: {
      type: String,
      default: 'label',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    noDataText: {
      type: String,
      required: true,
    },
    searchInput: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      focusedItem: -1,
    }
  },

  computed: {
    context() {
      return this.selectContext()
    },

    hasOptions() {
      return this.options.length
    },
  },

  watch: {
    'context.activeIndex'(value) {
      if (value === -1) {
        this.focusedItem = value
      } else {
        this.handleFocusItem(value)
      }
    },
  },

  methods: {
    /**
     * forward the 'emit-value' event
     * @param {String} value
     */
    handleEmitValue(value) {
      this.$emit('emit-value', value)
    },

    /**
     * forward the 'optione-created' event
     * @param {String} value
     */
    handleOptionCreated(value) {
      this.$emit('option-created', value)
    },

    /**
     * handle with keydown event when list component is focused
     * @param {Event} event
     */
    handleKeyDown(event) {
      const {
        activeIndex,
        focusAtIndex,
        focusOnFirstItem,
        focusOnLastItem,
        hideList,
        listItems,
      } = this.context
      const count = listItems.length

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          focusAtIndex((activeIndex + 1) % count)
          break
        case 'ArrowUp':
          event.preventDefault()
          focusAtIndex((activeIndex - 1 + count) % count)
          break
        case 'Home':
          this.handleFocusItem(0)
          focusOnFirstItem()
          break
        case 'End':
          this.handleFocusItem(count - 1)
          focusOnLastItem()
          break
        case 'Tab':
          event.preventDefault()
          break
        case 'Escape':
          hideList()
          break
        default:
          break
      }

      this.$emit('keydown', event)
    },

    handleFocusItem(index) {
      this.focusedItem = index
      this.$emit('focus-item', index)
    },
  },
}
</script>
