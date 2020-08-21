import SbLinkButton from './index'

export default {
  title: 'SbLinkButton',
  component: SbLinkButton,
  args: {
    status: 'primary',
    size: null,
    label: 'Primary'
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    label: {
      name: 'label',
      description: 'Label'
    },
    title: {
      name: 'title',
      description: 'Title to `SbLinkButton`'
    },
    status: {
      name: 'status',
      description: '`SbLinkButton` status',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
      }
    },
    isDisabled: {
      name: 'isDisabled',
      description: 'Disable `SbLinkButton`',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = args => ({
  components: { SbLinkButton },
  props: Object.keys(args),
  template: `
    <SbLinkButton
      :label="label"
      to="#"
      :title="title"
      :is-disabled="isDisabled"
      :status="status"
    />
  `
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
