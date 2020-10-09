import SbDataTable from '.'

const description = {
  allowSelection: 'Allow row selection.',
  component: 'Data tables are used to organize and display data efficiently. `SbDataTable` component allows for customization with additional functionality, as needed by your product’s users.',
  headers: 'It must be an array that represents the header content.',
  isLoading: 'Show a loading over the table.',
  items: 'It must be an array. Each entry in the array represents a row in the table.',
  selectionMode: 'By default the selection mode is single, meaning only one row at a time can be selected. Use multiple, so multiple rows can be selected. `allowSelection: true` is required.',
  showHeader: 'Toggle table header.',
  striped: 'Add zebra-striping to any table row within the `<tbody>.`'
}

const DataTableTemplate = args => ({
  components: { SbDataTable },
  props: Object.keys(args),
  template: `
    <SbDataTable
      v-bind="{
        allowSelection,
        headers,
        isLoading,
        items,
        selectionMode,
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
    allowSelection: false,
    headers: [],
    isLoading: false,
    items: [],
    selectionMode: 'single',
    showHeader: true,
    striped: false
  },
  argTypes: {
    allowSelection: {
      name: 'allowSelection',
      description: description.allowSelection,
      control: {
        type: 'boolean'
      }
    },
    headers: {
      name: 'headers',
      description: description.headers
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
      description: description.items
    },
    selectionMode: {
      name: 'selectionMode',
      description: description.selectionMode,
      control: {
        type: 'select',
        options: ['single', 'multiple']
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

const defaultTableHeadersData = [
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
]

const defaultTableItemsData = [
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
  }
]

export const Default = DataTableTemplate.bind({})

Default.args = {
  headers: [...defaultTableHeadersData],
  items: [...defaultTableItemsData]
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

export const SelectionMode = DataTableTemplate.bind({})

SelectionMode.args = {
  ...Default.args,
  allowSelection: true,
  selectionMode: 'single'
}

SelectionMode.parameters = {
  docs: {
    description: {
      story: description.selectionMode
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
