import SbIconButton from './index'
import { iconSizes } from '../Icon/utils'
import { availableColors } from '../../utils'

import LIB_ICONS from '../../lib/internal-icons'

const availableIcons = Object.keys(LIB_ICONS)

export default {
  title: 'Design System/Components/SbIconButton',
  component: SbIconButton,
  args: {
    iconName: 'search',
    iconSize: null,
    iconColor: 'primary',
  },
  argTypes: {
    iconName: {
      name: 'name',
      description: 'name',
      control: {
        type: 'select',
        options: availableIcons,
      },
    },
    iconSize: {
      name: 'size',
      description: 'size',
      control: {
        type: 'select',
        options: iconSizes,
      },
    },
    iconColor: {
      name: 'color',
      description: 'color',
      control: {
        type: 'select',
        options: availableColors,
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbIconButton },
  setup() {
    return { args }
  },
  template: `
    <SbIconButton v-bind="args" />
  `,
})

export const WhiteText = (args) => ({
  components: { SbIconButton },
  setup() {
    return { args }
  },
  template: `
    <div style="background-color:#1b243f;padding:20px;">
      <SbIconButton text-variant="white" />
    </div>
  `,
})
