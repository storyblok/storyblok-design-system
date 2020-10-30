<template>
  <div
    class="sb-select-list"
    :class="{ 'sb-select-list--filterable': filterable }"
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
  },

  data: () => ({
    searchInput: '',
  }),

  computed: {
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
  },
}
</script>
