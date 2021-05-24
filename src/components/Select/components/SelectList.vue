<template>
  <div class="sb-select-list" @keydown="handleKeyDown">
    <ul>
      <template v-if="hasOptions">
        <SbSelectListItem
          v-for="(option, key) in options"
          :key="key"
          :label="option[itemLabel]"
          :value="option[itemValue]"
          :input-value="value"
          :multiple="multiple"
          :use-avatars="useAvatars"
          @emit-value="handleEmitValue"
        />
      </template>
      <li
        v-else-if="!hasOptions && allowCreate && multiple"
        class="sb-select-list__create"
        @keydown.enter="handleEmitValue(searchInput)"
        @click="handleEmitValue(searchInput)"
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

  computed: {
    context() {
      return this.selectContext()
    },

    hasOptions() {
      return this.options.length
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
          focusOnFirstItem()
          break
        case 'End':
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
  },
}
</script>
