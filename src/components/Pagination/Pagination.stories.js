import SbPagination from '.'

const PaginationTemplate = args => ({
  components: { SbPagination },
  props: Object.keys(args),
  template: `
    <div style="padding: 20px">
      <SbPagination
        v-bind="{
          value: value || 1,
          total: total || 100,
          perPage: perPage || 10,
          isFullWidth
        }"
        @input="onInput"
        @per-page-change="onPageChange"
      />
    </div>
  `
})

export default {
  title: 'SbPagination',
  component: SbPagination,
  args: {
    value: 1,
    total: 100,
    perPage: 10
  },
  argTypes: {
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
    onPageChange: {
      action: 'perPageChanged'
    },
    onInput: {
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
