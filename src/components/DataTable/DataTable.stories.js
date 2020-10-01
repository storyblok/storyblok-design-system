import SbDataTable from '.'

export default {
  title: 'SbDataTable',
  components: SbDataTable,
  parameters: {
    docs: {
      description: {
        component: 'Data tables are used to organize and display data efficiently. `SbDataTable` component allows for customization with additional functionality, as needed by your product’s users.'
      }
    }
  },
  args: {
    showHeader: true,
    striped: false
  },
  argTypes: {
    showHeader: {
      name: 'showHeader',
      description: 'Toggle table header',
      control: {
        type: 'boolean'
      }
    },
    striped: {
      name: 'striped',
      description: 'Add zebra-striping to any table row within the `<tbody>`',
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
      :show-header="showHeader"
      :striped="striped"
    />
  `
})

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
      story: 'Add zebra-striping to any table row within the `<tbody>`'
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
      story: 'Add zebra-striping to any table row within the `<tbody>`'
    }
  }
}
