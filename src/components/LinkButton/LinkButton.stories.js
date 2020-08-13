import SbLinkButton from './index'

import { withKnobs, select, text, boolean } from '@storybook/addon-knobs'

export default {
  title: 'SbLinkButton',
  component: SbLinkButton,
  decorators: [withKnobs]
}

export const Default = () => ({
  components: { SbLinkButton },
  props: {
    label: {
      default: () => text('Label', 'Primary')
    },
    title: {
      default: () => text('Title', 'Example Link')
    },
    status: {
      default: () => select('Status', ['primary', 'secondary'], 'primary')
    },
    isDisabled: {
      default: () => boolean('Is Disabled', false)
    }
  },
  template: `<SbLinkButton :label="label" 
                           to="#"
                           :title="title"
                           :is-disabled="isDisabled"
                           :status="status"/>`
})

export const PrimaryAndSecondary = () => ({
  components: { SbLinkButton },
  template: `<div>
    <SbLinkButton label="Primary" to="http://#" title="To home page"/>
    <SbLinkButton label="Primary" to="http://#" title="To home page" status="secondary"/>
  </div>`
})

export const PrimaryAndSecondaryWithIcon = () => ({
  components: { SbLinkButton },
  template: `<div>
    <SbLinkButton label="Primary" to="http://#" title="To home page" icon="check"/>
    <SbLinkButton label="Primary" to="http://#" title="To home page" status="secondary" icon="check"/>
  </div>`
})

export const PrimaryAndSecondaryDisabled = () => ({
  components: { SbLinkButton },
  template: `<div>
    <SbLinkButton label="Primary" to="http://#" title="To home page" is-disabled/>
    <SbLinkButton label="Primary" to="http://#" title="To home page" status="secondary" is-disabled/>
  </div>`
})
