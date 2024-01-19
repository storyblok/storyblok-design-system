import SbSeparator from './index'

export default {
  title: 'Basic/SbSeparator',
  component: SbSeparator,
  argTypes: {
    small: {
      name: 'small',
      description: 'small',
      options: [true, false],
      control: {
        type: 'select',
      },
    },
    isFlat: {
      name: 'isFlat',
      description: 'isFlat',
      options: [true, false],
      control: {
        type: 'select',
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbSeparator },
  setup() {
    return { args }
  },
  template: `
    <SbSeparator v-bind="args" />
  `,
})

export const Small = (args) => ({
  components: { SbSeparator },
  setup() {
    return { args }
  },
  template: `
      <SbSeparator small />
  `,
})

export const Vertical = (args) => ({
  components: { SbSeparator },
  setup() {
    return { args }
  },
  template: `
      <SbSeparator :is-flat="false" />
  `,
})
