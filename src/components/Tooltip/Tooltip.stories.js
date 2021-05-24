import SbTooltip from '.'
import { availablePositions } from './lib'

const TooltipTemplate = (args) => ({
  components: { SbTooltip },
  props: Object.keys(args),
  template: `
    <div style="padding: 100px; text-align: center;">
      <SbTooltip v-bind="{ label, position, id, variant, textAlign }">
        <span style="font-size: 1.8rem;">Hover me!</span>
      </SbTooltip>
    </div>
  `,
})

export default {
  title: 'Design System/Components/SbTooltip',
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
      control: {
        type: 'select',
        options: availablePositions,
      },
    },
    variant: {
      name: 'variant',
      description: '`SbTooltip` variant color',
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
    textAlign: {
      name: 'textAlign',
      description: '`SbTooltip` text alignment',
      control: {
        type: 'select',
        options: ['initial', 'center', 'end'],
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
