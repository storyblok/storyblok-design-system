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
