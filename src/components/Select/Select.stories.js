import { SbSelect } from '.'
import { SbMinibrowser } from '../Minibrowser'
import { browserOptionsData } from '../Minibrowser/Minibrowser.stories'

// @vue/component
const SelectTemplate = (args) => ({
  components: {
    SbSelect,
  },

  props: Object.keys(args),

  data: () => ({
    internalValue: null,
  }),

  watch: {
    value: {
      handler(newValue) {
        this.internalValue = newValue
      },
      immediate: true,
    },
    multiple: {
      handler(isMultiple) {
        this.internalValue = isMultiple ? [] : null
      },
      immediate: true,
    },
  },

  template: `
    <SbSelect
      :label="label"
      :options="options"
      :multiple="multiple"
      :left-icon="leftIcon"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      :use-avatars="useAvatars"
      :inline="inline"
      v-model="internalValue"
      style="max-width: 300px"
    />
  `,
})

export const defaultSelectOptionsData = [
  {
    label: 'Option 1',
    value: 'Option 1',
  },
  {
    label: 'Option 2',
    value: 'Option 2',
  },
  {
    label: 'Option 3',
    value: 'Option 3',
  },
  {
    label: 'Option 4',
    value: 'Option 4',
  },
  {
    label: 'Option 5',
    value: 'Option 5',
  },
  {
    label: 'Option 6',
    value: 'Option 6',
  },
  {
    label: 'Option 7',
    value: 'Option 7',
  },
]

export const defaultAvatarsData = [
  {
    value: '001',
    label: 'Dominik Angerer',
    src:
      'https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4',
  },
  {
    value: '002',
    label: 'Emanuel Gonçalves',
    src:
      'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
  },
  {
    value: '003',
    label: 'Alexander Feiglstorfer',
    src:
      'https://avatars1.githubusercontent.com/u/160495?s=460&u=b88ece40883d2e9716e833f6a3c78c56ca3eb14f&v=4',
  },
]

export default {
  title: 'SbSelect',
  component: SbSelect,
  excludeStories: /.*Data$/,
  args: {
    label: 'Choose an option',
    options: [...defaultSelectOptionsData],
    value: null,
    multiple: false,
    filterable: false,
    leftIcon: null,
    filterPlaceholder: 'Filter Options',
    useAvatars: false,
    inline: false,
  },
}

export const Default = SelectTemplate.bind({})

export const Multiple = SelectTemplate.bind({})

Multiple.args = {
  multiple: true,
}

export const WithIcon = SelectTemplate.bind({})

WithIcon.args = {
  leftIcon: 'calendar',
}

export const Filterable = SelectTemplate.bind({})

Filterable.args = {
  filterable: true,
  filterPlaceholder: 'Filter Options',
}

export const WithAvatars = SelectTemplate.bind({})

WithAvatars.args = {
  useAvatars: true,
  options: [...defaultAvatarsData],
}

export const Inline = SelectTemplate.bind({})

Inline.args = {
  inline: true,
}

export const WithMinibrowser = (args) => ({
  components: {
    SbSelect,
    SbMinibrowser,
  },

  props: Object.keys(args),

  data: () => ({
    internalValue: null,
    minibrowserOptions: [...browserOptionsData],
  }),

  watch: {
    value: {
      handler(newValue) {
        this.internalValue = newValue
      },
      immediate: true,
    },
  },

  methods: {
    onSelectItem(item) {
      if (!item.items.length) {
        this.internalValue = item.label

        this.$refs.select.hideList()
      }
    },
  },

  template: `
    <SbSelect
      ref="select"
      :label="label"
      :left-icon="leftIcon"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      :use-avatars="useAvatars"
      :inline="inline"
      v-model="internalValue"
      style="max-width: 300px"
    >
      <SbMinibrowser
        slot="minibrowser"
        :options="minibrowserOptions"
        @select-item="onSelectItem"
      />
    </SbSelect>
  `,
})
