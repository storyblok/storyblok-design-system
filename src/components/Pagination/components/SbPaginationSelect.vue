<template>
  <SbSelect
    :options="parsedOptions"
    :label="activeLabel"
    inline
    show-list-on-top
    render-on-open
    @update:modelValue="onSelectInput"
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
    modelValue: {
      type: Number,
      default: 1,
    },
  },

  emits: ['change'],

  computed: {
    parsedOptions() {
      return this.options.map((option) => ({
        ...option,
        label: `${option.label}`,
      }))
    },
    activeLabel() {
      return String(this.modelValue)
    },
  },

  methods: {
    onSelectInput(value) {
      this.$emit('change', value)
    },
  },
}
</script>
