import SbPagination from '.'

const PaginationTemplate = args => ({
  components: { SbPagination },
  props: Object.keys(args),
  data: () => ({
    currentPage: 1,
    perPageData: 10
  }),
  watch: {
    value (val) {
      this.currentPage = val
    },
    perPage (val) {
      this.perPageData = val
    }
  },
  methods: {
    onPageChangeData (val) {
      this.perPageData = val
      this.onPageChange(val)
    }
  },
  template: `
    <div style="padding: 20px">
      <SbPagination
        v-bind="{
          carousel,
          compact,
          customPerPageOptions,
          isFullWidth,
          total: total || 100
        }"
        :per-page="perPageData"
        v-model="currentPage"
        @page-change="onPageChange"
        @per-page-change="onPageChangeData"
      />
    </div>
  `
})

export default {
  title: 'SbPagination',
  component: SbPagination,
  args: {
    carousel: false,
    compact: false,
    customPerPageOptions: [],
    isFullWidth: false,
    perPage: 10,
    total: 100,
    value: 1
  },
  argTypes: {
    carousel: {
      name: 'carousel',
      description: 'Only show buttons and pages information',
      control: {
        type: 'boolean'
      }
    },
    compact: {
      name: 'compact',
      description: 'Only show buttons and pages information',
      control: {
        type: 'boolean'
      }
    },
    customPerPageOptions: {
      name: 'customPerPageOptions',
      description: 'Allow to user set a custom options to perPage select',
      control: {
        type: 'array'
      }
    },
    isFullWidth: {
      name: 'isFullWidth',
      description: 'Expand the `SbPagination` component to 100% width',
      control: {
        type: 'boolean'
      }
    },
    perPage: {
      name: 'perPage',
      description: 'Number of items per page',
      control: {
        type: 'number'
      }
    },
    total: {
      name: 'total',
      description: 'Total of results',
      control: {
        type: 'number'
      }
    },
    value: {
      name: 'value',
      description: 'Current page',
      control: {
        type: 'number'
      }
    },
    onPerPageChange: {
      action: 'perPageChanged'
    },
    onPageChange: {
      action: 'pageChanged'
    }
  }
}

export const Default = PaginationTemplate.bind({})

export const FullWidth = PaginationTemplate.bind({})

FullWidth.args = {
  isFullWidth: true
}

FullWidth.parameters = {
  docs: {
    description: {
      story: 'When you define the `SbPagination` as `isFullWidth`, it will be expanded to full width to fill its parent container.'
    }
  }
}

export const Compact = PaginationTemplate.bind({})

Compact.args = {
  compact: true
}

Compact.parameters = {
  docs: {
    description: {
      story: 'When it uses the `compact` property, only the previous and next buttons show up and the informations about the items'
    }
  }
}

export const Carousel = PaginationTemplate.bind({})

Carousel.args = {
  carousel: true
}

Carousel.parameters = {
  docs: {
    description: {
      story: 'When it uses the `carousel` property, only the previous and next buttons show up and, in the middle, a dot navigation shows to change the page'
    }
  }
}
