import { withKnobs, select } from '@storybook/addon-knobs'

import SbIcon from '.'
import { iconSizes } from './utils'
import { availableColors } from '../../utils'

export default {
  title: 'SbIcon',
  component: SbIcon,
  decorators: [withKnobs]
}

export const Default = () => ({
  components: { SbIcon },
  props: {
    size: {
      default: () => select('Sizes', iconSizes, 'medium')
    }
  },
  template: '<SbIcon name="arrow" :size="size" />'
})

export const FallackIcon = () => ({
  components: { SbIcon },
  template: '<SbIcon name="fallback" size="x-large" />'
})

export const IconSizes = () => ({
  components: { SbIcon },
  template: `
    <div>
      <div style="margin-bottom: 10px">
        <SbIcon name="arrow" size="small" />
      </div>

      <div style="margin-bottom: 10px">
        <SbIcon name="arrow" />
      </div>

      <div style="margin-bottom: 10px">
        <SbIcon name="arrow" size="large" />
      </div>

      <div style="margin-bottom: 10px">
        <SbIcon name="arrow" size="x-large" />
      </div>
    </div>
  `
})

export const AllIcons = () => ({
  components: { SbIcon },
  props: {
    size: {
      default: () => select('Sizes', iconSizes, 'medium')
    },
    color: {
      default: () => select('Color', availableColors, 'primary')
    }
  },
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
      <SbIcon name="fallback-black" v-bind="{ size, color }" />
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
  `
})
