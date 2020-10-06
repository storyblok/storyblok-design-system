import SbDataTable from '.'

const description = {
  component: 'Data tables are used to organize and display data efficiently. `SbDataTable` component allows for customization with additional functionality, as needed by your product’s users.',
  headers: 'Array',
  isLoading: 'Show a loading',
  items: 'Array',
  showHeader: 'Toggle table header',
  striped: 'Add zebra-striping to any table row within the `<tbody>`'
}

const DataTableTemplate = args => ({
  components: { SbDataTable },
  props: Object.keys(args),
  template: `
    <SbDataTable
      v-bind="{
        headers,
        isLoading,
        items,
        showHeader,
        striped
      }"
    />
  `
})

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
    headers: [],
    isLoading: false,
    items: [],
    showHeader: true,
    striped: false
  },
  argTypes: {
    headers: {
      name: 'headers',
      description: description.headers,
      control: {
        type: 'array'
      }
    },
    isLoading: {
      name: 'isLoading',
      description: description.isLoading,
      control: {
        type: 'boolean'
      }
    },
    items: {
      name: 'items',
      description: description.items,
      control: {
        type: 'array'
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

export const Default = DataTableTemplate.bind({})

Default.args = {
  headers: [
    {
      text: 'Dessert (100g serving)',
      value: 'name',
      main: true
    },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' }
  ],
  items: [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: '1%'
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: '1%'
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: '7%'
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8%'
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: '16%'
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: '0%'
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2%'
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45%'
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: '22%'
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: '6%'
    }
  ]
}

export const IsLoading = DataTableTemplate.bind({})

IsLoading.args = {
  ...Default.args,
  isLoading: true
}

IsLoading.parameters = {
  docs: {
    description: {
      story: description.isLoading
    }
  }
}

export const ShowHeader = DataTableTemplate.bind({})

ShowHeader.args = {
  ...Default.args,
  showHeader: true
}

ShowHeader.parameters = {
  docs: {
    description: {
      story: description.showHeader
    }
  }
}

export const Striped = DataTableTemplate.bind({})

Striped.args = {
  ...Default.args,
  striped: true
}

Striped.parameters = {
  docs: {
    description: {
      story: description.striped
    }
  }
}
