import SbTag from './index'
import { tagTypes } from './lib'

export default {
  title: 'Basic/SbTag',
  components: SbTag,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  args: {
    closable: false,
    label: 'Tag Label',
    type: 'light',
  },
  argTypes: {
    closable: {
      name: 'closable',
      description: 'Render a close icon on the right',
      control: {
        type: 'boolean',
      },
    },
    label: {
      name: 'label',
      description: 'Label to `SbTag`',
      control: {
        type: 'text',
      },
    },
    type: {
      name: 'type',
      description: 'Type of the `SbTag`',
      options: tagTypes,
      control: {
        type: 'select',
      },
    },
    onClick: {
      action: 'clicked',
    },
  },
}

const getComponentOptions = (args) => ({
  components: { SbTag },
  setup() {
    return { args }
  },
  template: `
    <SbTag
      :closable="closable"
      :label="label"
      :type="type"
      @close="onClick"
  />`,
})

export const Default = (args) => getComponentOptions(args)

export const Closable = (args) => getComponentOptions(args)

Closable.args = {
  closable: true,
  label: 'Closable tag',
}

Closable.parameters = {
  docs: {
    description: {
      story:
        'When you set the `closable` property, it will be render a close icon on the right',
    },
  },
}
