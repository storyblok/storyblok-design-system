import SbBadge from './index'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'

export default {
  title: 'SbBadge',
  component: SbBadge,
  decorators: [withKnobs]
}

export const Default = () => ({
  components: { SbBadge },
  props: {
    text: {
      default: () => text('Text', 'Success')
    },
    status: {
      default: () => select('Status', ['success', 'warning', 'info', 'error'])
    },
    icon: {
      default: () => boolean('Icon', false)
    },
    onlyIcon: {
      default: () => boolean('Only Icon', false)
    },
    isSmall: {
      default: () => boolean('Small Badge', false)
    }
  },
  template: `<SbBadge :text="text" 
                      :status="status"
                      :icon="icon"
                      :only-icon="onlyIcon"
                      :is-small="isSmall"/>`
})

export const Status = () => ({
  components: { SbBadge },
  template: `<div>
    <SbBadge status="success"/>
    <SbBadge status="info"/>
    <SbBadge status="warning"/>
    <SbBadge status="error"/>
  </div>`
})

export const StatusWithIcon = () => ({
  components: { SbBadge },
  template: `<div>
    <SbBadge status="success" icon/>
    <SbBadge status="info" icon/>
    <SbBadge status="warning" icon/>
    <SbBadge status="error" icon/>
  </div>`
})

export const OnlyIcon = () => ({
  components: { SbBadge },
  template: `<div>
    <SbBadge status="success" onlyIcon/>
    <SbBadge status="info" onlyIcon/>
    <SbBadge status="warning" onlyIcon/>
    <SbBadge status="error" onlyIcon/>
  </div>`
})

export const SmallWithText = () => ({
  components: { SbBadge },
  template: `<div>
    <SbBadge status="success" is-small text="5"/>
    <SbBadge status="info" is-small text="10"/>
    <SbBadge status="warning" is-small text="15"/>
    <SbBadge status="error" is-small text="200"/>
  </div>`
})
