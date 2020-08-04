import SbLinkButton from './index'

export default {
  title: 'SbLinkButton',
  component: SbLinkButton
}

export const Default = () => ({
  components: { SbLinkButton },
  template: '<SbLinkButton label="Primary" to="#" title="To home page"/>'
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
