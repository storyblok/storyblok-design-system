import SbButton from './index'

export default {
  title: 'SbButton',
  component: SbButton,
  args: {
    status: 'primary',
    size: null,
    label: 'Primary',
    isLoading: false,
    isDisabled: false
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
      description: 'Label (inner test)'
    },
    isLoading: {
      name: 'isLoading',
      description: 'Show a loading',
      control: {
        type: 'boolean'
      }
    },
    isDisabled: {
      name: 'isDisabled',
      description: 'Disable button',
      control: {
        type: 'boolean'
      }
    },
    status: {
      name: 'status',
      description: '`SbButton` status',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
      }
    },
    icon: {
      name: 'icon',
      description: 'Icon to `SbButton`'
    }
  }
}

export const Default = args => ({
  components: { SbButton },
  props: Object.keys(args),
  template: `
    <SbButton
      :status="status"
      :label="label"
      :is-loading="isLoading"
      :is-disabled="isDisabled"
      :size="size"
    />
  `
})

export const SecondaryButton = () => ({
  components: { SbButton },
  template: `<div>
    <SbButton label="Secondary" status="secondary" />
  </div>`
})

export const AllSizes = () => ({
  components: { SbButton },
  template: `<div>
    <div style="margin: 10px 0;">
      <SbButton label="Small" size="small"/>
      <SbButton label="Default" />
      <SbButton label="Large" size="large"/>
    </div>
    <div style="margin: 10px 0;">
      <SbButton label="Small" size="small" status="secondary"/>
      <SbButton label="Default" status="secondary"/>
      <SbButton label="Large" size="large" status="secondary"/>
    </div>
  </div>`
})

export const IsLoading = () => ({
  components: { SbButton },
  template: `<div>
    <SbButton size="small" isLoading />
    <SbButton isLoading />
    <SbButton size="large" isLoading />
  </div>`
})

export const IsDisabled = () => ({
  components: { SbButton },
  template: `<div>
  <div style="margin: 10px 0;">
    <SbButton label="Disabled" size="small" is-disabled/>
    <SbButton label="Disabled" is-disabled/>
    <SbButton label="Disabled" size="large" is-disabled/>
  </div>
  <div style="margin: 10px 0;">
    <SbButton label="Disabled" size="small" is-disabled status="secondary"/>
    <SbButton label="Disabled" is-disabled status="secondary"/>
    <SbButton label="Disabled" size="large" is-disabled status="secondary"/>
  </div>
  </div>`
})

export const WithIcon = () => ({
  components: { SbButton },
  template: `<div>
  <div style="margin: 10px 0;">
    <SbButton label="Disabled" size="small" icon="check"/>
    <SbButton label="Disabled" icon="check"/>
    <SbButton label="Disabled" size="large" icon="check"/>
  </div>
  <div style="margin: 10px 0;">
    <SbButton label="Disabled" size="small" icon="check" status="secondary"/>
    <SbButton label="Disabled" icon="check" status="secondary"/>
    <SbButton label="Disabled" size="large" icon="check" status="secondary"/>
  </div>
  </div>`
})
