import { SbSelect } from '.'

// @vue/component
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
    },
    multiple: {
      handler (isMultiple) {
        this.internalValue = isMultiple ? [] : null
      },
      immediate: true
    }
  },

  template: `
    <SbSelect
      :label="label"
      :options="options"
      :multiple="multiple"
      v-model="internalValue"
    />
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
  },
  {
    label: 'Option 4',
    value: 'Option 4'
  },
  {
    label: 'Option 5',
    value: 'Option 5'
  },
  {
    label: 'Option 6',
    value: 'Option 6'
  },
  {
    label: 'Option 7',
    value: 'Option 7'
  }
]

export default {
  title: 'SbSelect',
  component: SbSelect,
  excludeStories: /.*Data$/,
  args: {
    label: 'Choose an option',
    options: [...defaultSelectOptionsData],
    value: null,
    multiple: false
  }
}

export const Default = SelectTemplate.bind({})

export const Multiple = SelectTemplate.bind({})

Multiple.args = {
  multiple: true
}
