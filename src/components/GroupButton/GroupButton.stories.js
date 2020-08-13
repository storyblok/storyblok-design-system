import SbButtonGroup from './index'
import SbButton from '../Button/index'
import { withKnobs, select, text } from '@storybook/addon-knobs'

export default {
  title: 'SbButtonGroup',
  component: SbButtonGroup,
  decorators: [withKnobs]
}

export const Default = () => ({
  components: { SbButtonGroup, SbButton },
  props: {
    label: {
      default: () => text('Label', 'One')
    },
    status: {
      default: () => select('Status', ['primary', 'secondary'], 'primary')
    },
    size: {
      default: () => select('Size', ['small', 'default', 'large'], 'default')
    }
  },
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
