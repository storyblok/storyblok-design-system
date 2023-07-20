import SbIconButton from './index'
import { iconSizes } from '../Icon/utils'
import { availableColors } from '../../utils'
import availableIcons from '../../lib/all-icons'

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
      options: availableIcons,
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
