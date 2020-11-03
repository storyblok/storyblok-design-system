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
        v-bind="option"
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
        return this.options.filter((opt) => {
          return includes(toLowerCase(opt.label), toLowerCase(this.searchInput))
        })
      }

      return this.options
    },

    hasValueToSearch() {
      return this.searchInput && this.searchInput.length > 0
    },
  },

  methods: {
    /**
     * forward the 'emit-value' event
     */
    handleEmitValue(value) {
      this.$emit('emit-value', value)
    },

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
