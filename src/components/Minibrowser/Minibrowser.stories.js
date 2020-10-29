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
            label: 'e-commerce',
          },
          {
            label: 'for-developers',
          },
          {
            label: 'for-content-writers',
          },
        ],
      },
      {
        label: 'Hp v1',
      },
      {
        label: 'Hp v2',
      },
      {
        label: 'Hp v3',
      },
    ],
  },
  {
    label: 'Case Studies',
  },
  {
    label: 'Jobs',
  },
  {
    label: 'Quotes',
  },
  {
    label: 'Plugin',
  },
  {
    label: 'About',
  },
  {
    label: 'Pricing',
  },
  {
    label: 'Stories',
  },
  {
    label: 'Marketing',
  },
  {
    label: 'Open Source',
  },
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
    placeholder: 'Search content items',
    notFoundPrefix: 'No matches for',
  },
  argTypes: {
    // actions
    onClearNavigation: {
      action: 'onClearNavigation',
    },
    onSelectItem: {
      action: 'onSelectItem',
    },
    onNavigate: {
      action: 'onNavigate',
    },
  },
}

export const Default = (args) => ({
  components: { SbMinibrowser },

  props: Object.keys(args),

  template: `
    <SbMinibrowser
      :options="options"
      :is-list="isList"
      :is-expanded="isExpanded"
      :filter-debounce="filterDebounce"
      :not-found-prefix="notFoundPrefix"
      :placeholder="placeholder"
      @clear-navigation="onClearNavigation"
      @navigate="onNavigate"
      @select-item="onSelectItem"
    />
  `,
})

export const WithGroups = (args) => ({
  components: { SbMinibrowser },

  props: Object.keys(args),

  template: `
    <SbMinibrowser
      :options="options"
      :is-list="isList"
      :is-expanded="isExpanded"
      :filter-debounce="filterDebounce"
      :not-found-prefix="notFoundPrefix"
      :placeholder="placeholder"
      @clear-navigation="onClearNavigation"
      @navigate="onNavigate"
      @select-item="onSelectItem"
    />
  `,
})

WithGroups.args = {
  options: [
    {
      group: true,
      title: 'Recent Content',
      items: [
        {
          label: 'Case Studies',
        },
        {
          label: 'Jobs',
        },
      ],
    },
    {
      group: true,
      title: 'All Content',
      items: [...browserOptionsData],
    },
  ],
}

export const Lazy = (args) => ({
  components: { SbMinibrowser },

  props: Object.keys(args),

  template: `
    <SbMinibrowser
      :options="options"
      :is-list="isList"
      :is-expanded="isExpanded"
      :filter-debounce="filterDebounce"
      :lazy-load-method="lazyLoadMethod"
      :not-found-prefix="notFoundPrefix"
      :placeholder="placeholder"
      @clear-navigation="onClearNavigation"
      @navigate="onNavigate"
      @select-item="onSelectItem"
    />
  `,
})

Lazy.args = {
  options: [
    {
      label: 'Landing Page',
      isParent: true,
      items: [],
    },
    {
      label: 'Case Studies',
    },
    {
      label: 'Jobs',
    },
    {
      label: 'Quotes',
    },
    {
      label: 'Plugin',
    },
  ],
  lazyLoadMethod: (node, resolve) => {
    setTimeout(() => {
      resolve([
        {
          label: 'e-commerce',
        },
        {
          label: 'for-developers',
        },
        {
          label: 'for-content-writers',
        },
      ])
    }, 1000)
  },
}
