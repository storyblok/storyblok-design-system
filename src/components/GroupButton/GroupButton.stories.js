import SbButtonGroup from './index'
import SbButton from '../Button/index'

export default {
  title: 'SbButtonGroup',
  component: SbButtonGroup,
  args: {
    status: 'primary',
    size: null
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size to each `SbButton` inside the `SbButtonGroup`',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large']
      }
    },
    status: {
      name: 'status',
      description: 'SbButton status',
      control: {
        type: 'select',
        options: ['primary', 'secondary']
      }
    }
  }
}

export const Default = args => ({
  components: { SbButtonGroup, SbButton },
  props: Object.keys(args),
  template: `
  <SbButtonGroup :size="size">
    <SbButton :label="label" :status="status" :size="size" />
    <SbButton :label="label" :status="status" :size="size" />
    <SbButton :label="label" :status="status" :size="size" />
  </SbButtonGroup>
  `
})

export const SecondaryGroupButtons = () => ({
  components: { SbButtonGroup, SbButton },
  template: `
  <SbButtonGroup>
    <SbButton label="One" status="secondary"/>
    <SbButton label="Two" status="secondary"/>
    <SbButton label="Three" status="secondary"/>
    <SbButton label="Four" status="secondary"/>
    <SbButton label="Five" status="secondary"/>
  </SbButtonGroup>
  `
})

export const SmallGroupButtons = () => ({
  components: { SbButtonGroup, SbButton },
  template: `
  <div>
    <div style="margin: 10px 0;">
      <SbButtonGroup size="small">
        <SbButton label="One" status="secondary"/>
        <SbButton label="Two" status="secondary"/>
        <SbButton label="Three" status="secondary"/>
        <SbButton label="Four" status="secondary"/>
        <SbButton label="Five" status="secondary"/>
      </SbButtonGroup>
    </div>

    <div style="margin: 10px 0;">
      <SbButtonGroup>
        <SbButton label="One" status="secondary"/>
        <SbButton label="Two" status="secondary"/>
        <SbButton label="Three" status="secondary"/>
        <SbButton label="Four" status="secondary"/>
        <SbButton label="Five" status="secondary"/>
      </SbButtonGroup>
    </div>

    <div style="margin: 10px 0;">
      <SbButtonGroup size="large">
        <SbButton label="One" status="secondary"/>
        <SbButton label="Two" status="secondary"/>
        <SbButton label="Three" status="secondary"/>
        <SbButton label="Four" status="secondary"/>
        <SbButton label="Five" status="secondary"/>
      </SbButtonGroup>
    </div>
  </div>
  `
})

export const LabelAndIconGroupButtons = () => ({
  components: { SbButtonGroup, SbButton },
  template: `
    <SbButtonGroup size="small">
      <SbButton label="Check" icon="check" status="secondary"/>
      <SbButton label="This" icon="check" status="secondary"/>
      <SbButton label="Rocket" icon="check" status="secondary"/>
    </SbButtonGroup>
  `
})

export const IconGroupButtons = () => ({
  components: { SbButtonGroup, SbButton },
  template: `
    <SbButtonGroup size="small">
      <SbButton icon="check" status="secondary"/>
      <SbButton icon="check" status="secondary"/>
      <SbButton icon="check" status="secondary"/>
    </SbButtonGroup>
  `
})
