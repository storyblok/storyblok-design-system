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
    striped: false
  },
  argTypes: {
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
      :striped="striped"
    />
  `
})

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
