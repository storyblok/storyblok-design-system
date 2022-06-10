import { SbMinibrowser, SbMinibrowserList, SbMinibrowserListHeader } from '.'
import { toLowerCase } from '../../utils'
import { waitMs } from '../../utils/tests-utils'

export const MOCK_DATA = {
  FIRST_LEVEL: [
    {
      label: 'Landing Page',
      subtitle: 'landing-page',
      isParent: true,
      value: '1.0',
    },
    {
      label: 'Case Studies',
      subtitle: 'case-studies',
      value: '1.1',
    },
    {
      label: 'Jobs',
      subtitle: 'jobs',
      value: '1.2',
    },
    {
      label: 'Quotes',
      subtitle: 'quotes',
      value: '1.3',
    },
    {
      label: 'Plugin',
      subtitle: 'plugin',
      value: '1.4',
    },
    {
      label: 'About',
      subtitle: 'about',
      value: '1.5',
    },
    {
      label: 'Pricing',
      subtitle: 'pricing',
      value: '1.6',
    },
    {
      label: 'Stories',
      subtitle: 'stories',
      value: '1.7',
    },
    {
      label: 'Marketing',
      subtitle: 'marketing',
      value: '1.8',
    },
    {
      label: 'Open Source',
      subtitle: 'open-source',
      value: '1.9',
    },
  ],
  SECOND_LEVEL: [
    {
      isParent: true,
      label: 'PPC',
      subtitle: 'ppc',
      value: '2.0',
    },
    {
      label: 'Hp v1',
      subtitle: 'hp-v1',
      value: '2.1',
    },
    {
      label: 'Hp v2',
      subtitle: 'hp-v2',
      value: '2.2',
    },
    {
      label: 'Hp v3',
      subtitle: 'hp-v3',
      value: '2.3',
    },
  ],
  THIRD_LEVEL: [
    {
      label: 'e-commerce',
      subtitle: 'e-commerce',
      value: '3.0',
    },
    {
      label: 'for-developers',
      subtitle: 'for-developers',
      value: '3.1',
    },
    {
      label: 'for-content-writers',
      subtitle: 'for-content-writers',
      value: '3.2',
    },
  ],
}

export default {
  title: 'Design System/Components/SbMinibrowser',
  component: SbMinibrowser,
  excludeStories: /.*Data$/i,
  args: {
    filterDebounce: 300,
    isExpanded: false,
    isFullHeight: false,
    isBorderless: false,
    isList: false,
    isLoading: false,

    breadcrumbs: [],
    options: [...MOCK_DATA.FIRST_LEVEL],
    placeholder: 'Search content items',
    notFoundPrefix: 'No matches for',
    clearOnSelect: true,
  },
}

const MinibrowserTemplate = (args) => ({
  components: { SbMinibrowser, SbMinibrowserList, SbMinibrowserListHeader },

  props: Object.keys(args),

  data: () => ({
    internalLoading: false,
    internalOptions: [...MOCK_DATA.FIRST_LEVEL],
    internalBreadcrumbsOptions: [],
  }),

  watch: {
    breadcrumbs: {
      handler: 'syncBreadcrumbs',
      immediate: true,
    },

    isLoading: {
      handler: 'syncLoading',
      immediate: true,
    },

    options: {
      handler: 'syncOptions',
      immediate: true,
    },
  },

  computed: {
    internalBreadcrumbs() {
      return this.internalBreadcrumbsOptions.map((item) => {
        return {
          label: item.label,
        }
      })
    },
  },

  methods: {
    syncLoading(newLoading) {
      this.internalLoading = newLoading
    },

    syncBreadcrumbs(newBreadcrumbs) {
      this.internalBreadcrumbsOptions = [...newBreadcrumbs]
    },

    syncOptions(newOptions) {
      this.internalOptions = [...newOptions]
    },

    getDefaultOptions() {
      return [...args.options]
    },

    getOptionsByLevel(item) {
      if (item.value === '1.0') {
        return [...MOCK_DATA.SECOND_LEVEL]
      }

      if (item.value === '2.0') {
        return [...MOCK_DATA.THIRD_LEVEL]
      }

      return this.getDefaultOptions()
    },

    handleFilter({ value }) {
      if (!value) {
        this.internalOptions = this.getDefaultOptions()
        return
      }

      this.internalLoading = true

      const data = [
        ...MOCK_DATA.FIRST_LEVEL,
        ...MOCK_DATA.SECOND_LEVEL,
        ...MOCK_DATA.THIRD_LEVEL,
      ]

      this.internalOptions = data.filter((item) => {
        const label = toLowerCase(item.label || '')

        return label.indexOf(value) !== -1
      })

      this.internalLoading = false
    },

    async handleClearNavigation() {
      this.internalLoading = true

      await waitMs(300)

      this.internalOptions = this.getDefaultOptions()
      this.internalBreadcrumbsOptions = []

      this.internalLoading = false
    },

    async handleSelectItem(item) {
      this.internalLoading = true

      if (item.isParent) {
        await waitMs(500)

        this.internalOptions = this.getOptionsByLevel(item)

        this.internalBreadcrumbsOptions.push(item)
      }

      this.internalLoading = false
    },

    async handleNavigate(index) {
      this.internalLoading = true

      await waitMs(300)

      const currentItem = this.internalBreadcrumbsOptions[index]
      this.internalOptions = this.getOptionsByLevel(currentItem)
      this.internalBreadcrumbsOptions = this.internalBreadcrumbsOptions.filter(
        (_, itemIndex) => itemIndex <= index
      )

      this.internalLoading = false
    },
  },

  template: `
    <SbMinibrowser
      :is-loading="internalLoading"
      :breadcrumbs="internalBreadcrumbs"
      :options="internalOptions"
      :is-list="isList"
      :is-expanded="isExpanded"
      :is-full-height="isFullHeight"
      :is-borderless="isBorderless"
      :filter-debounce="filterDebounce"
      :not-found-prefix="notFoundPrefix"
      :placeholder="placeholder"
      :clear-on-select="clearOnSelect"
      @filter="handleFilter"
      @clear-navigation="handleClearNavigation"
      @navigate="handleNavigate"
      @select-item="handleSelectItem"
    />
  `,
})

export const Default = MinibrowserTemplate.bind({})

export const WithGroups = MinibrowserTemplate.bind({})

WithGroups.args = {
  options: [
    {
      group: true,
      title: 'Recent Content',
      items: [
        {
          label: 'Case Studies',
          subtitle: 'case-studies',
        },
        {
          label: 'Jobs',
          subtitle: 'jobs',
        },
      ],
    },
    {
      group: true,
      title: 'All Content',
      items: [...MOCK_DATA.FIRST_LEVEL],
    },
  ],
}

export const Lazy = MinibrowserTemplate.bind({})

export const WithGroupsSlot = (args) => ({
  ...MinibrowserTemplate(args),

  template: `
    <SbMinibrowser
      :is-loading="internalLoading"
      :breadcrumbs="internalBreadcrumbs"
      :options="internalOptions"
      :is-list="isList"
      :is-expanded="isExpanded"
      :is-full-height="isFullHeight"
      :is-borderless="isBorderless"
      :filter-debounce="filterDebounce"
      :not-found-prefix="notFoundPrefix"
      :placeholder="placeholder"
      :clear-on-select="clearOnSelect"
      @filter="handleFilter"
      @clear-navigation="handleClearNavigation"
      @navigate="handleNavigate"
      @select-item="handleSelectItem"
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
          subtitle: 'case-studies',
        },
        {
          label: 'Jobs',
          subtitle: 'jobs',
        },
      ],
    },
    {
      group: true,
      title: 'All Content',
      items: [...MOCK_DATA.FIRST_LEVEL],
    },
  ],
}

export const Inline = (args) => ({
  ...MinibrowserTemplate(args),

  template: `
    <div style="padding: 10px; border: 1px solid #B1B5BE; border-radius: 5px; max-width: 367px;">
      <p style="font-size: 16px"> Inline Minibrowser </p>
      <SbMinibrowser
        :is-loading="internalLoading"
        :breadcrumbs="internalBreadcrumbs"
        :options="internalOptions"
        :is-list="isList"
        :is-expanded="isExpanded"
        :is-full-height="isFullHeight"
        :is-borderless="isBorderless"
        :filter-debounce="filterDebounce"
        :not-found-prefix="notFoundPrefix"
        :placeholder="placeholder"
        :clear-on-select="clearOnSelect"
        @filter="handleFilter"
        @clear-navigation="handleClearNavigation"
        @navigate="handleNavigate"
        @select-item="handleSelectItem"
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
          subtitle: 'case-studies',
        },
        {
          label: 'Jobs',
          subtitle: 'jobs',
        },
      ],
    },
    {
      group: true,
      title: 'All Content',
      items: [...MOCK_DATA.FIRST_LEVEL],
    },
  ],
}
