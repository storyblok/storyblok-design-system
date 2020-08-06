import SbGroupButton from './index'
import SbButton from '../Button/index'

export default {
  title: 'SbGroupButton',
  component: SbGroupButton
}

export const Default = () => ({
  components: { SbGroupButton, SbButton },
  template: `
  <SbGroupButton>
    <SbButton label="One" />
    <SbButton label="Two" />
    <SbButton label="Three" />
  </SbGroupButton>
  `
})

export const SecondaryGroupButtons = () => ({
  components: { SbGroupButton, SbButton },
  template: `
  <SbGroupButton>
    <SbButton label="One" status="secondary"/>
    <SbButton label="Two" status="secondary"/>
    <SbButton label="Three" status="secondary"/>
    <SbButton label="Four" status="secondary"/>
    <SbButton label="Five" status="secondary"/>
  </SbGroupButton>
  `
})

export const SmallGroupButtons = () => ({
  components: { SbGroupButton, SbButton },
  template: `
  <div>
    <div style="margin: 10px 0;">
      <SbGroupButton size="small">
        <SbButton label="One" status="secondary"/>
        <SbButton label="Two" status="secondary"/>
        <SbButton label="Three" status="secondary"/>
        <SbButton label="Four" status="secondary"/>
        <SbButton label="Five" status="secondary"/>
      </SbGroupButton>
    </div>

    <div style="margin: 10px 0;">
      <SbGroupButton>
        <SbButton label="One" status="secondary"/>
        <SbButton label="Two" status="secondary"/>
        <SbButton label="Three" status="secondary"/>
        <SbButton label="Four" status="secondary"/>
        <SbButton label="Five" status="secondary"/>
      </SbGroupButton>
    </div>

    <div style="margin: 10px 0;">
      <SbGroupButton size="large">
        <SbButton label="One" status="secondary"/>
        <SbButton label="Two" status="secondary"/>
        <SbButton label="Three" status="secondary"/>
        <SbButton label="Four" status="secondary"/>
        <SbButton label="Five" status="secondary"/>
      </SbGroupButton>
    </div>
  </div>
  `
})

export const LabelAndIconGroupButtons = () => ({
  components: { SbGroupButton, SbButton },
  template: `
    <SbGroupButton size="small">
      <SbButton label="Check" icon="check" status="secondary"/>
      <SbButton label="This" icon="check" status="secondary"/>
      <SbButton label="Rocket" icon="check" status="secondary"/>
    </SbGroupButton>
  `
})

export const IconGroupButtons = () => ({
  components: { SbGroupButton, SbButton },
  template: `
    <SbGroupButton size="small">
      <SbButton icon="check" status="secondary"/>
      <SbButton icon="check" status="secondary"/>
      <SbButton icon="check" status="secondary"/>
    </SbGroupButton>
  `
})
