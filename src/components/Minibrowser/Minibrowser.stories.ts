import { SbMinibrowser, SbMinibrowserList, SbMinibrowserListHeader } from '.'
import { toLowerCase } from '../../utils'
import { waitMs } from '../../utils/tests-utils'
import { computed, ref, watch } from 'vue'

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
      label: 'PPC',
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

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbMinibrowser>

const meta: Meta<typeof SbMinibrowser> = {
  title: 'Navigation/SbMinibrowser',
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

  render: (args: Args) => ({
    components: { SbMinibrowser, SbMinibrowserList, SbMinibrowserListHeader },
    setup() {
      const internalLoading = ref(false)
      const internalOptions = ref([...MOCK_DATA.FIRST_LEVEL])
      const internalBreadcrumbsOptions = ref([])

      function syncLoading(newLoading) {
        internalLoading.value = newLoading
      }

      function syncBreadcrumbs(newBreadcrumbs = []) {
        internalBreadcrumbsOptions.value = [...newBreadcrumbs]
      }

      function syncOptions(newOptions = []) {
        internalOptions.value = [...newOptions]
      }

      function getDefaultOptions() {
        return [...args.options]
      }

      function getOptionsByLevel(item) {
        if (item.value === '1.0') {
          return [...MOCK_DATA.SECOND_LEVEL]
        }

        if (item.value === '2.0') {
          return [...MOCK_DATA.THIRD_LEVEL]
        }

        return getDefaultOptions()
      }

      function handleFilter({ value }) {
        if (!value) {
          internalOptions.value = getDefaultOptions()
          return
        }

        internalLoading.value = true

        const data = [
          ...MOCK_DATA.FIRST_LEVEL,
          ...MOCK_DATA.SECOND_LEVEL,
          ...MOCK_DATA.THIRD_LEVEL,
        ]

        internalOptions.value = data.filter((item) => {
          const label = toLowerCase(item.label || '')

          return label.indexOf(value) !== -1
        })

        internalLoading.value = false
      }

      async function handleClearNavigation() {
        internalLoading.value = true

        await waitMs(300)

        internalOptions.value = getDefaultOptions()
        internalBreadcrumbsOptions.value = []

        internalLoading.value = false
      }

      async function handleSelectItem(item) {
        internalLoading.value = true

        if (item.isParent) {
          await waitMs(500)

          internalOptions.value = getOptionsByLevel(item)

          internalBreadcrumbsOptions.value.push(item)
        }

        internalLoading.value = false
      }

      async function handleNavigate(index) {
        internalLoading.value = true

        await waitMs(300)

        const currentItem = internalBreadcrumbsOptions.value[index]
        internalOptions.value = getOptionsByLevel(currentItem)
        internalBreadcrumbsOptions.value =
          internalBreadcrumbsOptions.value.filter(
            (_, itemIndex) => itemIndex <= index,
          )

        internalLoading.value = false
      }

      watch(
        () => args.breadcrumbs,
        (newBreadcrumbs) => {
          syncBreadcrumbs()
        },
      )

      watch(
        () => args.isLoading,
        (newLoading) => {
          syncLoading(newLoading)
        },
      )

      watch(
        () => args.options,
        (newOptions) => {
          syncOptions(newOptions)
        },
      )

      const internalBreadcrumbs = computed(() => {
        return internalBreadcrumbsOptions.value.map((item) => {
          return {
            label: item.label,
          }
        })
      })

      return {
        args,
        getDefaultOptions,
        getOptionsByLevel,
        handleClearNavigation,
        handleFilter,
        handleNavigate,
        handleSelectItem,
        internalBreadcrumbs,
        internalBreadcrumbsOptions,
        internalLoading,
        internalOptions,
        syncBreadcrumbs,
        syncLoading,
        syncOptions,
      }
    },

    template: `
      <SbMinibrowser
        v-bind="args"
        :options="internalOptions"
        :loading="internalLoading"
        :breadcrumbs="internalBreadcrumbs"
        @filter="handleFilter"
        @clear-navigation="handleClearNavigation"
        @navigate="handleNavigate"
        @select-item="handleSelectItem"
      />
    `,
  }),
}

export default meta

export const Default: Story = {}

export const WithGroups: Story = {
  args: {
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
  },
}

export const Lazy: Story = {}

export const WithGroupsSlot: Story = {
  render: (args: Args) => ({
    components: { SbMinibrowser, SbMinibrowserList, SbMinibrowserListHeader },
    setup() {
      return { args }
    },
    template: `
    <SbMinibrowser v-bind="args" >
      <template #list="slotProps">
        <SbMinibrowserList v-bind="slotProps">
          <template v-if="slotProps.title" #header="{ title }">
            <SbMinibrowserListHeader :title="title">
              <template #right>
                <button> Slot button </button>
              </template>
            </SbMinibrowserListHeader>
          </template>
        </SbMinibrowserList>
      </template>
    </SbMinibrowser>
  `,
  }),
  args: {
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
  },
}

export const Inline: Story = {
  args: {
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
  },
}

export const WithLoadingBlocking: Story = {
  args: {
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the `isLoading` prop is set to `true`, the minibrowser will be blocked for navigation and selection.',
      },
    },
  },
}
