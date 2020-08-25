import SbButtonGroup from './index'
import SbButton from '../Button/index'

export default {
  title: 'SbButtonGroup',
  component: SbButtonGroup,
  args: {
    type: 'primary',
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
    type: {
      name: 'type',
      description: 'SbButton type',
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
    <SbButton :label="label" :type="type" :size="size" />
    <SbButton :label="label" :type="type" :size="size" />
    <SbButton :label="label" :type="type" :size="size" />
  </SbButtonGroup>
  `
})

export const SecondaryGroupButtons = () => ({
  components: { SbButtonGroup, SbButton },
  template: `
  <SbButtonGroup>
    <SbButton label="One" type="secondary"/>
    <SbButton label="Two" type="secondary"/>
    <SbButton label="Three" type="secondary"/>
    <SbButton label="Four" type="secondary"/>
    <SbButton label="Five" type="secondary"/>
  </SbButtonGroup>
  `
})

export const SmallGroupButtons = () => ({
  components: { SbButtonGroup, SbButton },
  template: `
  <div>
    <div style="margin: 10px 0;">
      <SbButtonGroup size="small">
        <SbButton label="One" type="secondary"/>
        <SbButton label="Two" type="secondary"/>
        <SbButton label="Three" type="secondary"/>
        <SbButton label="Four" type="secondary"/>
        <SbButton label="Five" type="secondary"/>
      </SbButtonGroup>
    </div>

    <div style="margin: 10px 0;">
      <SbButtonGroup>
        <SbButton label="One" type="secondary"/>
        <SbButton label="Two" type="secondary"/>
        <SbButton label="Three" type="secondary"/>
        <SbButton label="Four" type="secondary"/>
        <SbButton label="Five" type="secondary"/>
      </SbButtonGroup>
    </div>

    <div style="margin: 10px 0;">
      <SbButtonGroup size="large">
        <SbButton label="One" type="secondary"/>
        <SbButton label="Two" type="secondary"/>
        <SbButton label="Three" type="secondary"/>
        <SbButton label="Four" type="secondary"/>
        <SbButton label="Five" type="secondary"/>
      </SbButtonGroup>
    </div>
  </div>
  `
})

export const LabelAndIconGroupButtons = () => ({
  components: { SbButtonGroup, SbButton },
  template: `
    <SbButtonGroup size="small">
      <SbButton label="Check" icon="check" type="secondary"/>
      <SbButton label="This" icon="check" type="secondary"/>
      <SbButton label="Rocket" icon="check" type="secondary"/>
    </SbButtonGroup>
  `
})

export const IconGroupButtons = () => ({
  components: { SbButtonGroup, SbButton },
  template: `
    <SbButtonGroup size="small">
      <SbButton icon="check" type="secondary"/>
      <SbButton icon="check" type="secondary"/>
      <SbButton icon="check" type="secondary"/>
    </SbButtonGroup>
  `
})
