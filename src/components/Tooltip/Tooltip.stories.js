import SbTooltip from '.'
import { availablePositions } from './lib'

const TooltipTemplate = args => ({
  components: { SbTooltip },
  props: Object.keys(args),
  template: `
    <div style="padding: 100px; text-align: center;">
      <SbTooltip v-bind="{ label, position, id }">
        <h6>Hover me!</h6>
      </SbTooltip>
    </div>
  `
})

export default {
  title: 'SbTooltip',
  component: SbTooltip,
  parameters: {
    docs: {
      description: {
        component: '`SbTooltip` is a small piece of contextual information about an element on the screen, which is displayed when a user hovers or focuses on the element it is describing.'
      }
    }
  },
  args: {
    id: null,
    label: 'Default tooltip label',
    position: 'top'
  },
  argTypes: {
    id: {
      name: 'id',
      description: 'Id for tooltip accessibility',
      control: {
        type: 'text'
      }
    },
    label: {
      name: 'label',
      description: '`SbTooltip` label',
      control: {
        type: 'text'
      }
    },
    position: {
      name: 'position',
      description: '`SbTooltip` position',
      control: {
        type: 'select',
        options: availablePositions
      }
    }
  }
}

export const Default = TooltipTemplate.bind({})

Default.args = {
  label: 'Default tooltip label',
  position: 'top'
}
