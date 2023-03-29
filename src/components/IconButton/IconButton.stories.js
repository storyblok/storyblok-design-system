import SbIconButton from './index'
import { iconSizes } from '../Icon/utils'
import { availableColors } from '../../utils'

import LIB_ICONS from '../../lib/internal-icons'

const availableIcons = Object.keys(LIB_ICONS)

export default {
  title: 'Basic/SbIconButton',
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
      options: availableIcons,
      control: {
        type: 'select',
      },
    },
    iconSize: {
      name: 'size',
      description: 'size',
      options: iconSizes,
      control: {
        type: 'select',
      },
    },
    iconColor: {
      name: 'color',
      description: 'color',
      options: availableColors,
      control: {
        type: 'select',
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

export const WhiteColor = (args) => ({
  components: { SbIconButton },
  setup() {
    return { args }
  },
  template: `
    <div style="background-color:#1b243f;padding:20px;">
      <SbIconButton icon-color="white" icon-name="schema" />
    </div>
  `,
})
