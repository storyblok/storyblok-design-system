import SbRadio from './index'

export default {
  title: 'SbRadio',
  component: SbRadio
}

export const Default = args => ({
  components: { SbRadio },
  props: Object.keys(args),
  template: `
    <div>
      <SbRadio
        name="radio-default"
        id="default"
        label="Inactive"
      />
      <SbRadio
        name="radio-default"
        id="default-disabled"
        label="Inactive - Disabled"
        disabled
      />
    </div>
  `
})

export const Checked = args => ({
  components: { SbRadio },
  props: Object.keys(args),
  template: `
    <div>
      <SbRadio
        name="radio-checked"
        id="checked"
        label="Selected"
        checked
      />
      <SbRadio
        name="radio-checked"
        id="checked-disabled"
        label="Selected - Disabled"
        checked
        disabled
      />
    </div>
  `
})

export const Inline = args => ({
  components: { SbRadio },
  props: Object.keys(args),
  template: `
    <div>
      <SbRadio
        name="radio-inline"
        id="inline"
        label="Inactive"
        inline
      />
      <SbRadio
        name="radio-inline"
        id="inline-checked"
        label="Selected"
        inline
        checked
      />
      <SbRadio
        name="radio-inline"
        id="inline-disabled"
        label="Inactive - Disabled"
        inline
        disabled
      />
    </div>
  `
})
