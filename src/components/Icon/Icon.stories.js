import { withKnobs, select } from '@storybook/addon-knobs'

import SbIcon from '.'
import { iconSizes } from './utils'

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
    }
  },
  template: `<div>
    <div style="margin-bottom: 10px">
      <SbIcon name="chevron-down" :size="size"/>
      <SbIcon name="chevron-left" :size="size"/>
      <SbIcon name="chevron-right" :size="size"/>
      <SbIcon name="chevron-up" :size="size"/>
      <SbIcon name="chevron-sort" :size="size"/>
      <SbIcon name="search" :size="size"/>
      <SbIcon name="close" :size="size"/>
      <SbIcon name="folder" :size="size"/>
      <SbIcon name="calendar" :size="size"/>
      <SbIcon name="plus" :size="size"/>
      <SbIcon name="substract" :size="size"/>
      <SbIcon name="checkmark" :size="size"/>
      <SbIcon name="overflow-menu-vertic" :size="size"/>
      <SbIcon name="status-circle" :size="size"/>
      <SbIcon name="info-bedge" :size="size"/>
      <SbIcon name="warning-bedge" :size="size"/>
      <SbIcon name="success-bedge" :size="size"/>
      <SbIcon name="error-bedge" :size="size"/>
    </div>

    <div style="margin-bottom: 10px">
      <SbIcon name="fallback-black" :size="size"/>
      <SbIcon name="fallback-blue" :size="size"/>
      <SbIcon name="fallback-green" :size="size"/>
      <SbIcon name="fallback-yellow" :size="size"/>
      <SbIcon name="fallback-light-green" :size="size"/>
    </div>

    <div style="margin-bottom: 10px">
      <SbIcon name="success-pictogram" :size="size"/>
      <SbIcon name="upload-pictogram" :size="size"/>
      <SbIcon name="delete-pictogram" :size="size"/>
    </div>
  </div
  `
})
