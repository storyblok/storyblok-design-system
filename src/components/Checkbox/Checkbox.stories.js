import SbCheckbox from './index'

export default {
  title: 'Design System/Components/Form/SbCheckbox',
  component: SbCheckbox,
  args: {
    id: 'example',
    name: 'example',
    value: false,
    nativeValue: false,
    indeterminate: false,
    disabled: false,
    required: false,
  },
}

export const Default = (args) => ({
  components: { SbCheckbox },
  setup() {
    return { args }
  },
  template: `
    <div>
      <SbCheckbox
        :name="name"
        id="inactive"
        label="Inactive"
        :value="value"
        :disabled="disabled"
        :required="required"
        inline
        style="margin-right: 10px;"
      />

      <SbCheckbox
        :name="name"
        id="inactive-disabled"
        label="Inactive - Disabled"
        :value="value"
        :required="required"
        disabled
        inline
      />
    </div>
  `,
})

export const Selected = (args) => ({
  components: { SbCheckbox },
  setup() {
    return { args }
  },
  template: `
    <div>
      <div style="margin-bottom: 20px">
        <SbCheckbox
          id="selected"
          label="Selected"
          :name="name"
          :value="true"
          native-value="Selected"
          inline
          style="margin-right: 10px;"
        />

        <SbCheckbox
          id="selected-disabled"
          label="Selected - Disabled"
          :name="name"
          :value="true"
          native-value="Selected - Disabled"
          disabled
          inline
        />
      </div>
      <div>
        <SbCheckbox
          id="indeterminate"
          label="Indeterminate"
          :name="name"
          native-value="Indeterminate"
          indeterminate
          inline
          style="margin-right: 10px;"
        />

        <SbCheckbox
          id="indeterminate-disabled"
          label="Indeterminate - Disabled"
          :name="name"
          native-value="Indeterminate - Disabled"
          indeterminate
          disabled
          inline
        />
      </div>
    </div>
  `,
})

export const Inline = (args) => ({
  components: { SbCheckbox },
  setup() {
    return { args }
  },
  template: `
    <div>
      <div style="margin-bottom: 20px;">
        <SbCheckbox
          :name="name"
          id="inline"
          label="Inactive"
          native-value="Inactive"
          inline
          style="margin-right: 10px;"
        />

        <SbCheckbox
          :name="name"
          id="inline-selected"
          label="Selected"
          native-value="Selected"
          :value="true"
          inline
          style="margin-right: 10px;"
        />

        <SbCheckbox
          :name="name"
          id="inline-disabled"
          native-value="Disabled"
          label="Disabled"
          inline
          disabled
          style="margin-right: 10px;"
        />
      </div>

      <div>
        <SbCheckbox
          name="radio-outline"
          id="outline"
          label="Inactive"
          native-value="Inactive"
          inline
          outline
          style="margin-right: 10px;"
        />

        <SbCheckbox
          name="radio-outline"
          id="outline-selected"
          label="Selected"
          native-value="Selected"
          :value="true"
          inline
          outline
          style="margin-right: 10px;"
        />

        <SbCheckbox
          name="radio-outline"
          id="outline-disabled"
          native-value="Disabled"
          label="Disabled"
          inline
          outline
          disabled
          style="margin-right: 10px;"
        />
      </div>
    </div>
  `,
})
