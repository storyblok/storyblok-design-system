<template>
  <SbSelect
    :options="parsedOptions"
    :label="value + ''"
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
      return this.options.map((option) => {
        return {
          ...option,
          label: `${option.label}`,
        }
      })
    },
  },

  methods: {
    onSelectInput(value) {
      this.$emit('change', value)
    },
  },
}
</script>
