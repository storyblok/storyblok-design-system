import SbTooltip from '.'
import { availablePositions } from './lib'

const TooltipTemplate = (args) => ({
  components: { SbTooltip },
  setup() {
    return { args }
  },
  template: `
    <div style="padding: 100px; text-align: center;">
      <SbTooltip v-bind="args">
        <span style="font-size: 1.8rem;">Hover me!</span>
      </SbTooltip>
    </div>
  `,
})

export default {
  title: 'Interface/SbTooltip',
  component: SbTooltip,
  parameters: {
    docs: {
      description: {
        component:
          '`SbTooltip` is a small piece of contextual information about an element on the screen, which is displayed when an user hovers or focuses on the element which is being described.',
      },
    },
  },
  args: {
    id: null,
    label: 'Default tooltip label',
    position: 'top',
    variant: 'dark',
    textAlign: 'center',
  },
  argTypes: {
    id: {
      name: 'id',
      description: 'Id for tooltip accessibility',
      control: {
        type: 'text',
      },
    },
    label: {
      name: 'label',
      description: '`SbTooltip` label',
      control: {
        type: 'text',
      },
    },
    position: {
      name: 'position',
      description: '`SbTooltip` position',
      options: availablePositions,
      control: {
        type: 'select',
      },
    },
    variant: {
      name: 'variant',
      description: '`SbTooltip` variant color',
      options: ['dark', 'light'],
      control: {
        type: 'select',
      },
    },
    textAlign: {
      name: 'textAlign',
      description: '`SbTooltip` text alignment',
      options: ['initial', 'center', 'end'],
      control: {
        type: 'select',
      },
    },
  },
}

export const Default = TooltipTemplate.bind({})

Default.args = {
  label: 'Default tooltip label',
  position: 'top',
  variant: 'dark',
}
