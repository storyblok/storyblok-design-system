<template>
  <div
    class="sb-select-list"
    :class="{ 'sb-select-list--filterable': filterable }"
    @keydown="handleKeyDown"
  >
    <SbSelectListSearch
      v-if="filterable"
      v-model="searchInput"
      :placeholder="filterPlaceholder"
    />

    <ul>
      <SbSelectListItem
        v-for="(option, key) in filteredOptions"
        :key="key"
        :label="option[itemLabel]"
        :value="option[itemValue]"
        :input-value="value"
        :multiple="multiple"
        :use-avatars="useAvatars"
        @emit-value="handleEmitValue"
      />
    </ul>
  </div>
</template>

<script>
import { includes, toLowerCase } from '../../../utils'
import SbSelectListItem from './SelectListItem'
import SbSelectListSearch from './SelectListSearch'

export default {
  name: 'SbSelectInner',

  components: { SbSelectListItem, SbSelectListSearch },

  inject: ['selectContext'],

  props: {
    // input itself value
    value: {
      type: [String, Number, Array],
      default: null,
    },

    // options
    multiple: Boolean,
    filterable: Boolean,
    filterPlaceholder: {
      type: String,
      default: 'Filter options',
    },
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
  },

  data: () => ({
    searchInput: '',
  }),

  computed: {
    context() {
      return this.selectContext()
    },

    filteredOptions() {
      if (this.filterable && this.hasValueToSearch) {
        return this.transformedOptions.filter((opt) => {
          return includes(
            toLowerCase(opt[this.itemLabel]),
            toLowerCase(this.searchInput)
          )
        })
      }

      return this.transformedOptions
    },

    hasValueToSearch() {
      return this.searchInput && this.searchInput.length > 0
    },

    transformedOptions() {
      return this.options.map((opt) => {
        if (typeof opt === 'object') return opt
        return { [this.itemLabel]: opt, [this.itemValue]: opt }
      })
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
