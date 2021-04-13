import { SbMinibrowser, SbMinibrowserList, SbMinibrowserListHeader } from '.'

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
  title: 'Design System/Components/SbMinibrowser',
  component: SbMinibrowser,
  excludeStories: /.*Data$/,
  args: {
    filterDebounce: 300,
    isExpanded: false,
    isFullHeight: false,
    isBorderless: false,
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

export const WithGroupsSlot = (args) => ({
  components: { SbMinibrowser, SbMinibrowserList, SbMinibrowserListHeader },

  props: Object.keys(args),

  template: `
    <SbMinibrowser
      :options="options"
      :is-list="isList"
      :is-expanded="isExpanded"
      :is-full-height="isFullHeight"
      :is-borderless="isBorderless"
      :filter-debounce="filterDebounce"
      :not-found-prefix="notFoundPrefix"
      :placeholder="placeholder"
      @clear-navigation="onClearNavigation"
      @navigate="onNavigate"
      @select-item="onSelectItem"
    >
      <template v-slot:list="slotProps">
        <SbMinibrowserList v-bind="slotProps">
          <template v-if="slotProps.title" v-slot:header="{ title }">
            <SbMinibrowserListHeader :title="title">
              <template v-slot:right>
                <button> Slot button </button>
              </template>
            </SbMinibrowserListHeader>
          </template>
        </SbMinibrowserList>
      </template>
    </SbMinibrowser>
  `,
})

WithGroupsSlot.args = {
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

export const Inline = (args) => ({
  components: { SbMinibrowser, SbMinibrowserList, SbMinibrowserListHeader },

  props: Object.keys(args),

  template: `
    <div style="padding: 10px; border: 1px solid #B1B5BE; border-radius: 5px; max-width: 367px;">
      <p style="font-size: 16px"> Inline Minibrowser </p>
      <SbMinibrowser
        :options="options"
        :is-list="isList"
        :is-expanded="isExpanded"
        :is-full-height="isFullHeight"
        :is-borderless="isBorderless"
        :filter-debounce="filterDebounce"
        :not-found-prefix="notFoundPrefix"
        :placeholder="placeholder"
        @clear-navigation="onClearNavigation"
        @navigate="onNavigate"
        @select-item="onSelectItem"
      />
    </div>
  `,
})

Inline.args = {
  isFullHeight: true,
  isBorderless: true,
  isExpanded: true,
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
