import SbIconButton from './index'
import { iconSizes } from '../Icon/utils'
import { availableColors } from '../../utils'

import LIB_ICONS from '../../lib/internal-icons'
import * as lucideIcons from 'lucide-vue-next'

const availableIcons = Object.keys(LIB_ICONS)
const lucideIconsKeys = Object.keys(lucideIcons)
const allIcons = [...availableIcons, ...lucideIconsKeys]

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
      description:
        'Icon name (https://lucide.dev/icons) or custom Storyblok icons',
      options: allIcons,
      control: {
        type: 'select',
      },
    },
    iconSize: {
      options: iconSizes,
      control: {
        type: 'select',
      },
    },
    iconColor: {
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
      <SbIconButton icon-color="white" icon-name="toy-brick" />
    </div>
  `,
})
