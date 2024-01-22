import SbToggle from './index'
import availableIcons from '../../lib/all-icons'

export default {
  title: 'Forms/SbToggle',
  component: SbToggle,
  args: {
    id: 'example',
    name: 'example',
    modelValue: false,
    nativeValue: false,
    indeterminate: false,
    disabled: false,
    required: false,
    variant: 'primary',
    icon: null,
  },
  argTypes: {
    variant: {
      name: 'variant',
      description: '`SbToggle` variant',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      control: {
        type: 'select',
      },
    },
    icon: {
      name: 'icon',
      description: '`SbToggle` icon',
      options: [...availableIcons],
      control: {
        type: 'select',
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbToggle },
  setup() {
    return { ...args }
  },
  template: `
    <div>
      <SbToggle
        :name="name"
        id="inactive"
        label="Inactive"
        :modelValue="modelValue"
        :disabled="disabled"
        :required="required"
        :icon="icon"
        :variant="variant"
        style="margin-bottom: 10px;"
      /><br>

      <SbToggle
        :name="name"
        id="active"
        label="Active"
        :modelValue="true"
        :disabled="disabled"
        :required="required"
        :icon="icon"
        :variant="variant"
        style="margin-bottom: 10px;"
      /><br>

      <SbToggle
        :name="name"
        id="inactive-disabled"
        label="Inactive - Disabled"
        :modelValue="modelValue"
        :required="required"
        :icon="icon"
        :variant="variant"
        disabled
      /><br>

    </div>
  `,
})

export const WithIcon = (args) => ({
  components: { SbToggle },
  setup() {
    return { ...args }
  },
  template: `
    <div>
      <div style="margin-bottom: 20px">
        <SbToggle
          id="selected"
          label="With Icon Inactive"
          :name="name"
          :modelValue="false"
          icon="globe"
          :variant="variant"
          native-value="With Icon Inactive"
          style="margin-bottom: 10px;"
        /><br>
      </div>
    </div>
  `,
})
export const WithVariant = (args) => ({
  components: { SbToggle },
  setup() {
    return { ...args }
  },
  template: `
    <div>
      <SbToggle
        id="default-variant"
        label="Default Variant"
        :name="name"
        :modelValue="true"
        :icon="icon"
        :variant="'primary'"
        native-value="Default Variant"
        style="margin-bottom: 10px;"
      /><br>

      <SbToggle
        id="secondary-variant"
        label="Secondary Variant"
        :name="name"
        :modelValue="true"
        :icon="icon"
        :variant="'secondary'"
        native-value="Secondary Variant"
        style="margin-bottom: 10px;"
      /><br>

      <SbToggle
        id="ghost-variant"
        label="Ghost Variant"
        :name="name"
        :modelValue="true"
        :icon="icon"
        :variant="'ghost'"
        native-value="Ghost Variant"
        style="margin-bottom: 10px;"
      /><br>

      <SbToggle
        id="danger-variant"
        label="Danger Variant"
        :name="name"
        :modelValue="true"
        :icon="icon"
        :variant="'danger'"
        native-value="Danger Variant"
        style="margin-bottom: 10px;"
      /><br>
    </div>
  `,
})
