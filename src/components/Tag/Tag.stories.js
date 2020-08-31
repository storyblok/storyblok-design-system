import SbTag from '.'
import { tagTypes } from './lib'

const BadgeTemplate = args => ({
  components: { SbTag },
  props: Object.keys(args),
  template: `
    <SbTag
      v-bind="{
        closable,
        label,
        type
      }"
    />
  `
})

export default {
  title: 'SbTag',
  component: SbTag,
  parameters: {
    docs: {
      description: {
        component: ''
      }
    }
  },
  args: {
    closable: false,
    label: 'Tag Label',
    type: 'light'
  },
  argTypes: {
    closable: {
      name: 'closable',
      description: 'Render a close icon on the right',
      control: {
        type: 'boolean'
      }
    },
    label: {
      name: 'label',
      description: 'Label to `SbTag`',
      control: {
        type: 'text'
      }
    },
    type: {
      name: 'type',
      description: 'Type of the `SbTag`',
      control: {
        type: 'select',
        options: tagTypes
      }
    }
  }
}

export const Default = BadgeTemplate.bind({})

export const Closable = BadgeTemplate.bind({})

Closable.args = {
  closable: true,
  label: 'Closable tag'
}

Closable.parameters = {
  docs: {
    description: {
      story: 'When you set the `closable` property, it will be render a close icon on the right'
    }
  }
}
