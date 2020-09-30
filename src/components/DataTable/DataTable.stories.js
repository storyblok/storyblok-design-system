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
    compact: false,
    isLoading: false
  },
  argTypes: {
    compact: {
      name: 'compact',
      description: 'Reduces the height of cells',
      control: {
        type: 'boolean'
      }
    },
    isLoading: {
      name: 'isLoading',
      description: 'Show a loading',
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
      v-bind="{
        compact,
        isLoading
      }"
    />
  `
})

export const Compact = (args) => ({
  components: { SbDataTable },
  props: Object.keys(args),
  template: `
    <SbDataTable
      v-bind="{
        compact
      }"
    />
  `
})

Compact.parameters = {
  docs: {
    description: {
      story: 'Description here'
    }
  }
}
