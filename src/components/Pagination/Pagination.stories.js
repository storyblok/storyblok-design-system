import SbPagination from '.'

const PaginationTemplate = args => ({
  components: { SbPagination },
  props: Object.keys(args),
  template: `
    <div style="padding: 20px">
      <SbPagination
        v-bind="{
          compact,
          isFullWidth,
          perPage: perPage || 10,
          total: total || 100,
          value: value || 1
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
    compact: false,
    isFullWidth: false,
    perPage: 10,
    total: 100,
    value: 1
  },
  argTypes: {
    compact: {
      name: 'compact',
      description: 'Only show buttons and pages information',
      control: {
        type: 'boolean'
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

export const Compact = PaginationTemplate.bind({})

Compact.args = {
  compact: true
}

Compact.parameters = {
  docs: {
    description: {
      story: 'When it uses the `compact` property, only the previous and next buttons show and the informations about the items'
    }
  }
}
