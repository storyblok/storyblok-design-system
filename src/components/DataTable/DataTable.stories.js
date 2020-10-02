import SbDataTable from '.'

const description = {
  component: 'Data tables are used to organize and display data efficiently. `SbDataTable` component allows for customization with additional functionality, as needed by your product’s users.',
  isLoading: 'Show a loading',
  showHeader: 'Toggle table header',
  striped: 'Add zebra-striping to any table row within the `<tbody>`'
}

export default {
  title: 'SbDataTable',
  components: SbDataTable,
  parameters: {
    docs: {
      description: {
        component: description.component
      }
    }
  },
  args: {
    isLoading: false,
    showHeader: true,
    striped: false
  },
  argTypes: {
    isLoading: {
      name: 'isLoading',
      description: description.isLoading,
      control: {
        type: 'boolean'
      }
    },
    showHeader: {
      name: 'showHeader',
      description: description.showHeader,
      control: {
        type: 'boolean'
      }
    },
    striped: {
      name: 'striped',
      description: description.striped,
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = (args) => ({
  components: { SbDataTable },
  props: Object.keys(args),
  template: `
    <SbDataTable
      :is-loading="isLoading"
      :show-header="showHeader"
      :striped="striped"
    />
  `
})

export const IsLoading = (args) => ({
  components: { SbDataTable },
  props: Object.keys(args),
  template: `
    <SbDataTable
      :is-loading="true"
    />
  `
})

IsLoading.parameters = {
  docs: {
    description: {
      story: description.isLoading
    }
  }
}

export const ShowHeader = args => ({
  components: { SbDataTable },
  props: Object.keys(args),
  template: `
    <SbDataTable
      :show-header="true"
    />
  `
})

ShowHeader.args = {
  showHeader: true
}

ShowHeader.parameters = {
  docs: {
    description: {
      story: description.showHeader
    }
  }
}

export const Striped = args => ({
  components: { SbDataTable },
  props: Object.keys(args),
  template: `
    <SbDataTable
      :striped="true"
    />
  `
})

Striped.args = {
  striped: true
}

Striped.parameters = {
  docs: {
    description: {
      story: description.striped
    }
  }
}
