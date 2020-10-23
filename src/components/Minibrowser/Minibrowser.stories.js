import { SbMinibrowser } from '.'

export const browserOptionsData = [
  {
    label: 'Landing Page',
    isParent: true,
    items: [
      {
        isParent: true,
        label: 'PPC',
        items: [
          {
            label: 'e-commerce'
          },
          {
            label: 'for-developers'
          },
          {
            label: 'for-content-writers'
          }
        ]
      },
      {
        label: 'Hp v1'
      },
      {
        label: 'Hp v2'
      },
      {
        label: 'Hp v3'
      }
    ]
  },
  {
    label: 'Case Studies'
  },
  {
    label: 'Jobs'
  },
  {
    label: 'Quotes'
  },
  {
    label: 'Plugin'
  },
  {
    label: 'About'
  },
  {
    label: 'Pricing'
  },
  {
    label: 'Stories'
  },
  {
    label: 'Marketing'
  },
  {
    label: 'Open Source'
  }
]

export default {
  title: 'SbMinibrowser',
  component: SbMinibrowser,
  excludeStories: /.*Data$/,
  args: {
    filterDebounce: 300,
    isExpanded: false,
    isList: false,
    options: [...browserOptionsData],
    placeholder: 'Search content items'
  },
  argTypes: {
    isExpanded: {
      name: 'isExpanded',
      description: 'Expanded state',
      control: {
        type: 'boolean'
      }
    },
    isList: {
      name: 'isList',
      description: 'Show the items as a list',
      control: {
        type: 'boolean'
      }
    },
    filterDebounce: {
      name: 'filterDebounce',
      description: 'Implement a debounce on the filter',
      control: {
        type: 'number',
        defaultValue: 300
      }
    },
    options: {
      name: 'options',
      description: 'Minibrowser options',
      control: {
        type: 'array'
      }
    },
    placeholder: {
      name: 'placeholder',
      description: 'Placeholder for input',
      control: {
        type: 'text'
      }
    },

    // actions
    onSelectItem: {
      action: 'onSelectItem'
    },
    onNavigate: {
      action: 'onNavigate'
    }
  }
}

export const Default = args => ({
  components: { SbMinibrowser },

  props: Object.keys(args),

  template: `
    <SbMinibrowser
      :options="options"
      :is-list="isList"
      :is-expanded="isExpanded"
      :filter-debounce="filterDebounce"
      @select-item="onSelectItem"
      @navigate="onNavigate"
    />
  `
})

export const WithGroups = args => ({
  components: { SbMinibrowser },

  props: Object.keys(args),

  template: `
    <SbMinibrowser
      :options="options"
      :is-list="isList"
      :is-expanded="isExpanded"
      :filter-debounce="filterDebounce"
      @select-item="onSelectItem"
      @navigate="onNavigate"
    />
  `
})

WithGroups.args = {
  options: [
    {
      group: true,
      title: 'Recent Content',
      items: [
        {
          label: 'Case Studies'
        },
        {
          label: 'Jobs'
        }
      ]
    },
    {
      group: true,
      title: 'All Content',
      items: [...browserOptionsData]
    }
  ]
}
