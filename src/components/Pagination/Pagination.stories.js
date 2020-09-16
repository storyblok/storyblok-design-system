import SbPagination from '.'

export default {
  title: 'SbPagination',
  component: SbPagination,
  args: {
    value: 1,
    total: 100,
    perPage: 10
  },
  argTypes: {
    value: {
      name: 'value',
      description: 'Current page',
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
    perPage: {
      name: 'perPage',
      description: 'Number of items per page',
      control: {
        type: 'number'
      }
    },
    onPageChange: {
      action: 'perPageChanged'
    }
  }
}

export const Default = args => ({
  components: { SbPagination },
  props: Object.keys(args),
  template: `
    <SbPagination
      v-bind="{ value: value || 1, total: total || 100, perPage: perPage || 10 }"
      @per-page-change="onPageChange"
    />
  `
})
