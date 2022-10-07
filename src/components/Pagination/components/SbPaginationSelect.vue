<template>
  <SbSelect
    :options="parsedOptions"
    :label="activeLabel"
    inline
    show-list-on-top
    @input="onSelectInput"
  />
</template>

<script>
import SbSelect from '../../Select'

export default {
  name: 'SbPaginationSelect',

  components: {
    SbSelect,
  },

  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    parsedOptions() {
      return this.options.map((option) => ({
        ...option,
        label: `${option.label}`,
      }))
    },
    activeLabel() {
      return String(this.value)
    },
  },

  methods: {
    onSelectInput(value) {
      this.$emit('change', value)
    },
  },
}
</script>
