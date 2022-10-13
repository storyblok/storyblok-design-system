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
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 'Jon Doe',
  }),
  template: `
    <SbRadio
      v-bind="args"
      v-model="internalValue"
    />
  `,
})

export const Selected = (args) => ({
  components: { SbRadio },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 'Jon Doe',
  }),
  template: `
    <div>
      <div class="mb-20">
        <SbRadio
          v-bind="args"
          id="selected"
          label="Jon Doe"
          v-model="internalValue"
          name="input"
          native-value="Jon Doe"
        />
      </div>

      <div class="mb-20">
        <SbRadio
          v-bind="args"
          id="unselected"
          label="Albert Einstein"
          v-model="internalValue"
          name="input"
          native-value="Albert Einstein"
        />
      </div>
    </div>
  `,
})

export const Inline = (args) => ({
  components: { SbRadio },
  setup() {
    return { args }
  },
  data: () => ({
    internalValue: 'Jon Doe',
  }),
  template: `
    <div>
      <div class="mb-20">
        <SbRadio
          v-bind="args"
          name="radio-inline"
          id="inline"
          label="Jon Doe"
          v-model="internalValue"
          native-value="Jon Doe"
          inline
        />

        <SbRadio
          v-bind="args"
          name="radio-inline"
          id="inline-selected"
          label="Albert Einstein"
          v-model="internalValue"
          native-value="Albert Einstein"
          inline
        />

        <SbRadio
          v-bind="args"
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
          v-bind="args"
          name="radio-outline"
          id="inline"
          label="Jon Doe"
          v-model="internalValue"
          native-value="Jon Doe"
          inline
          outline
        />

        <SbRadio
          v-bind="args"
          name="radio-outline"
          id="inline-selected"
          label="Albert Einstein"
          v-model="internalValue"
          native-value="Albert Einstein"
          inline
          outline
        />

        <SbRadio
          v-bind="args"
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
