import { SbSelect } from '.'

const SelectTemplate = args => ({
  components: {
    SbSelect
  },

  props: Object.keys(args),

  data: () => ({
    internalValue: null
  }),

  watch: {
    value: {
      handler (newValue) {
        this.internalValue = newValue
      },
      immediate: true
    }
  },

  template: `
    <SbSelect :label="label" :options="options" v-model="internalValue" />
  `
})

export const defaultSelectOptionsData = [
  {
    label: 'Option 1',
    value: 'Option 1'
  },
  {
    label: 'Option 2',
    value: 'Option 2'
  },
  {
    label: 'Option 3',
    value: 'Option 3'
  }
]

export default {
  title: 'SbSelect',
  component: SbSelect,
  excludeStories: /.*Data$/,
  args: {
    label: 'Choose an option',
    options: [...defaultSelectOptionsData],
    value: null
  }
}

// @vue/component
export const Default = SelectTemplate.bind({})
