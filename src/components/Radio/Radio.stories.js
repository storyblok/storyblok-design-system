import SbRadio from './index'

export default {
  title: 'Design System/Components/Form/SbRadio',
  component: SbRadio,
  args: {
    label: 'Simple radio input',
    id: 'example',
    name: 'example',
    outline: false,
    inline: false,
    value: 'Jon Doe',
    nativeValue: 'Jon Doe',
    disabled: false,
    required: false,
  },
}

export const Default = (args) => ({
  components: { SbRadio },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Jon Doe',
  }),
  template: `
    <SbRadio
      :name="name"
      :id="id"
      :outline="outline"
      :inline="inline"
      :label="label"
      :disabled="disabled"
      :required="required"
      v-model="internalValue"
      :native-value="nativeValue"
    />
  `,
})

export const Selected = (args) => ({
  components: { SbRadio },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Jon Doe',
  }),
  template: `
    <div>
      <SbRadio
        style="margin-bottom: 10px;"
        id="selected"
        label="Jon Doe"
        v-model="internalValue"
        name="input"
        native-value="Jon Doe"
      />

      <SbRadio
        id="unselected"
        label="Albert Einstein"
        v-model="internalValue"
        name="input"
        native-value="Albert Einstein"
      />
    </div>
  `,
})

export const Inline = (args) => ({
  components: { SbRadio },
  props: Object.keys(args),
  data: () => ({
    internalValue: 'Jon Doe',
  }),
  template: `
    <div>
      <div style="margin-bottom: 20px;">
        <SbRadio
          style="margin-right: 10px;"
          name="radio-inline"
          id="inline"
          label="Jon Doe"
          v-model="internalValue"
          native-value="Jon Doe"
          inline
        />

        <SbRadio
          style="margin-right: 10px;"
          name="radio-inline"
          id="inline-selected"
          label="Albert Einstein"
          v-model="internalValue"
          native-value="Albert Einstein"
          inline
        />

        <SbRadio
          style="margin-right: 10px;"
          name="radio-inline"
          id="inline-disabled"
          v-model="internalValue"
          native-value="None of those"
          label="None of those"
          inline
          disabled
        />
      </div>

      <div>
        <SbRadio
          style="margin-right: 10px;"
          name="radio-outline"
          id="inline"
          label="Jon Doe"
          v-model="internalValue"
          native-value="Jon Doe"
          inline
          outline
        />

        <SbRadio
          style="margin-right: 10px;"
          name="radio-outline"
          id="inline-selected"
          label="Albert Einstein"
          v-model="internalValue"
          native-value="Albert Einstein"
          inline
          outline
        />

        <SbRadio
          style="margin-right: 10px;"
          name="radio-outline"
          id="inline-disabled"
          v-model="internalValue"
          native-value="None of those"
          label="None of those"
          inline
          outline
          disabled
        />
      </div>
    </div>
  `,
})
