import SbPagination from '.'

const PaginationTemplate = (args) => ({
  components: { SbPagination },
  props: Object.keys(args),
  data: () => ({
    currentPage: 1,
    perPageData: 10,
  }),
  watch: {
    modelValue(val) {
      this.currentPage = val
    },
    perPage(val) {
      this.perPageData = val
    },
  },
  methods: {
    onPageChangeData(val) {
      this.perPageData = val
      this.onPageChange(val)
    },
  },
  template: `
    <div style="padding: 20px; margin-top: 250px">
      <SbPagination
        v-bind="{
          carousel,
          compact,
          customPerPageOptions,
          isFullWidth,
          locale,
          total: total || 100
        }"
        :per-page="perPageData"
        v-model="currentPage"
        @page-change="onPageChange"
        @per-page-change="onPageChangeData"
      />
    </div>
  `,
})

export default {
  title: 'Navigation/SbPagination',
  component: SbPagination,
  parameters: {
    docs: {
      description: {
        component:
          '`SbPagination` is used for splitting up content or data into several pages, with a control for navigating to the next or previous page.',
      },
    },
  },
  args: {
    carousel: false,
    compact: false,
    customPerPageOptions: [],
    isFullWidth: false,
    locale: 'en',
    perPage: 10,
    total: 100,
    modelValue: 1,
  },
  argTypes: {
    carousel: {
      name: 'carousel',
      description: 'Only show buttons and pages information',
      control: {
        type: 'boolean',
      },
    },
    compact: {
      name: 'compact',
      description: 'Only show buttons and pages information',
      control: {
        type: 'boolean',
      },
    },
    customPerPageOptions: {
      name: 'customPerPageOptions',
      description: 'Allow to user set a custom options to perPage select',
      control: {
        type: 'array',
      },
    },
    locale: {
      name: 'locale',
      description: 'Allow to use the component in a different language',
      control: {
        type: 'select',
        options: [
          'en',
          'de',
          'pt-br',
          'es',
          'fr',
          'it',
          'ja',
          'pl',
          'ru',
          'sk',
          'sv',
          'zh',
        ],
      },
    },
    isFullWidth: {
      name: 'isFullWidth',
      description: 'Expand the `SbPagination` component to 100% width',
      control: {
        type: 'boolean',
      },
    },
    perPage: {
      name: 'perPage',
      description: 'Number of items per page',
      control: {
        type: 'number',
      },
    },
    total: {
      name: 'total',
      description: 'Total of results',
      control: {
        type: 'number',
      },
    },
    modelValue: {
      name: 'modelValue',
      description:
        'Current page. The value property has to be used for `v-model` directive',
      control: {
        type: 'number',
      },
    },
    onPerPageChange: {
      action: 'perPageChange',
      description: 'Event triggered when Select per page amount is changed',
      control: {
        type: 'select',
        options: [25, 50, 75, 100],
      },
    },
    onPageChange: {
      action: 'pageChange',
      description: `Event triggered when one selects a specific page from page's list`,
      control: {
        type: 'select',
        options: Array.from({ length: 10 }, (_, i) => i + 1),
      },
    },
    onPreviousPage: {
      action: 'onPreviousPage',
      description: 'Event triggered when one presses the previous button',
    },
    onNextPage: {
      action: 'onNextPage',
      description: 'Event triggered when one presses the next button',
    },
  },
}

export const Default = PaginationTemplate.bind({})

export const FullWidth = PaginationTemplate.bind({})

FullWidth.args = {
  isFullWidth: true,
}

FullWidth.parameters = {
  docs: {
    description: {
      story:
        'When you define the `SbPagination` as `isFullWidth`, it will be expanded to full width to fill its parent container.',
    },
  },
}

export const Compact = PaginationTemplate.bind({})

Compact.args = {
  compact: true,
}

Compact.parameters = {
  docs: {
    description: {
      story:
        'When it uses the `compact` property, only the previous and next buttons show up and the informations about the items',
    },
  },
}

export const Carousel = PaginationTemplate.bind({})

Carousel.args = {
  carousel: true,
}

Carousel.parameters = {
  docs: {
    description: {
      story:
        'When it uses the `carousel` property, only the previous and next buttons show up and, in the middle, a dot navigation shows to change the page',
    },
  },
}
