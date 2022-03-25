import SbIcon from '.'
import { iconSizes } from './utils'
import { availableColors } from '../../utils'

import LIB_ICONS from '../../lib/internal-icons'

const availableIcons = Object.keys(LIB_ICONS)

export default {
  title: 'Design System/Components/SbIcon',
  component: SbIcon,
  args: {
    size: 'normal',
    color: 'primary',
    name: 'chevron-down',
    role: null,
    backgroundColor: null,
  },
  argTypes: {
    color: {
      name: 'color',
      description: 'Color for SbIcon',
      control: {
        type: 'select',
        options: availableColors,
      },
    },
    backgroundColor: {
      name: 'background color',
      description: 'Background color for SbIcon',
      control: {
        type: 'select',
        options: availableColors,
      },
    },
    name: {
      name: 'name',
      description: 'Icon name',
      control: {
        type: 'select',
        options: availableIcons,
      },
    },
    role: {
      name: 'role',
      description: 'HTML role for the icon',
      control: {
        type: 'text',
      },
    },
    size: {
      name: 'size',
      description: 'Size for SbIcon',
      control: {
        type: 'select',
        options: iconSizes,
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbIcon },
  props: Object.keys(args),
  template: '<SbIcon v-bind="{ name, color, backgroundColor, size, role }" />',
})

Default.args = {
  size: 'normal',
}

export const IconWithBackground = () => ({
  components: { SbIcon },
  template:
    '<SbIcon name="schema" color="primary" background-color="primary" />',
})

export const FallbackIcon = () => ({
  components: { SbIcon },
  template: '<SbIcon name="avatar-fallback" size="x-large" color="green" />',
})

export const IconSizes = () => ({
  components: { SbIcon },
  template: `
    <div>
      <div style="margin-bottom: 10px">
        <SbIcon name="chevron-down" size="small" />
      </div>
      <div style="margin-bottom: 10px">
        <SbIcon name="chevron-down" />
      </div>
      <div style="margin-bottom: 10px">
        <SbIcon name="chevron-down" size="large" />
      </div>
      <div style="margin-bottom: 10px">
        <SbIcon name="chevron-down" size="x-large" />
      </div>
    </div>
  `,
})

export const AllIcons = (args) => ({
  components: { SbIcon },
  props: Object.keys(args),
  data: () => ({
    icons: [...availableIcons],
  }),
  template: `
  <div>
    <p style="font-size: 20px; padding-left: 20px; margin: 0;"> All icons </p>
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
      <div
        v-for="(name, index) in icons"
        :key="index"
        style="text-align: center; padding: 2rem"
      >
        <SbIcon v-bind="{ size, color, name }"/>

        <p class="font-size-md"> {{ name }} </p>
      </div>
    </div>
  </div>
  `,
})
