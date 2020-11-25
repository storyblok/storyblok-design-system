import SbIcon from '.'
import { iconSizes } from './utils'
import { availableColors } from '../../utils'

export default {
  title: 'SbIcon',
  component: SbIcon,
  args: {
    size: 'normal',
    color: 'primary',
    name: 'chevron-down',
    role: null,
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
    name: {
      name: 'name',
      description: 'Icon name',
      control: {
        type: 'text',
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
  template: '<SbIcon v-bind="{ name, color, size, role }" />',
})

Default.args = {
  size: 'normal',
}

export const FallackIcon = () => ({
  components: { SbIcon },
  template: '<SbIcon name="fallback" size="x-large" />',
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
  template: `
  <div>
    <div style="margin-bottom: 10px">
      <SbIcon name="chevron-down" v-bind="{ size, color }" />
      <SbIcon name="chevron-left" v-bind="{ size, color }" />
      <SbIcon name="chevron-right" v-bind="{ size, color }" />
      <SbIcon name="chevron-up" v-bind="{ size, color }" />
      <SbIcon name="chevron-sort" v-bind="{ size, color }" />
      <SbIcon name="search" v-bind="{ size, color }" />
      <SbIcon name="close" v-bind="{ size, color }" />
      <SbIcon name="folder" v-bind="{ size, color }" />
      <SbIcon name="calendar" v-bind="{ size, color }" />
      <SbIcon name="plus" v-bind="{ size, color }" />
      <SbIcon name="substract" v-bind="{ size, color }" />
      <SbIcon name="checkmark" v-bind="{ size, color }" />
      <SbIcon name="overflow-menu-vertic" v-bind="{ size, color }" />
      <SbIcon name="status-circle" v-bind="{ size, color }" />
      <SbIcon name="warning" v-bind="{ size, color }" />
      <SbIcon name="info" v-bind="{ size, color }" />
    </div>
    <div style="margin-bottom: 10px">
      <SbIcon name="avatar-fallback" v-bind="{ size, color }" />
      <SbIcon name="fallback-blue" v-bind="{ size, color }" />
      <SbIcon name="fallback-green" v-bind="{ size, color }" />
      <SbIcon name="fallback-yellow" v-bind="{ size, color }" />
      <SbIcon name="fallback-light-green" v-bind="{ size, color }" />
    </div>
    <div style="margin-bottom: 10px">
      <SbIcon name="success-pictogram" v-bind="{ size, color }" />
      <SbIcon name="upload-pictogram" v-bind="{ size, color }" />
      <SbIcon name="delete-pictogram" v-bind="{ size, color }" />
    </div>
  </div>
  `,
})
