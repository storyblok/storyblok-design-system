import SbRadio from './index'

export default {
  title: 'SbRadio',
  component: SbRadio,
}

export const Default = (args) => ({
  components: { SbRadio },
  props: Object.keys(args),
  template: `
    <div>
      <SbRadio
        name="radio-default"
        id="default"
        label="Default Inactive"
      />
      <SbRadio
        name="radio-default"
        id="default-disabled"
        label="Default Inactive - Disabled"
        disabled
      />
    </div>
  `,
})

export const Selected = (args) => ({
  components: { SbRadio },
  props: Object.keys(args),
  template: `
    <div>
      <SbRadio
        id="selected"
        label="Default Selected"
        checked
      />
      <SbRadio
        id="selected-disabled"
        label="Default Selected - Disabled"
        checked
        disabled
      />
    </div>
  `,
})

export const Inline = (args) => ({
  components: { SbRadio },
  props: Object.keys(args),
  template: `
    <div>
      <div>
        <SbRadio
          name="radio-inline"
          id="inline"
          label="Inline Inactive"
          inline
        />
        <SbRadio
          name="radio-inline"
          id="inline-selected"
          label="Inline Selected"
          inline
          checked
        />
        <SbRadio
          name="radio-inline"
          id="inline-disabled"
          label="Inline Inactive - Disabled"
          inline
          disabled
        />
      </div>
      <div>
        <SbRadio
          name="radio-inline-outline"
          id="inline-outline"
          label="Inline Outline Inactive"
          inline
          outline
        />
        <SbRadio
          name="radio-inline-outline"
          id="inline-outline-selected"
          label="Inline Outline Selected"
          inline
          outline
          checked
        />
      </div>
    </div>
  `,
})
