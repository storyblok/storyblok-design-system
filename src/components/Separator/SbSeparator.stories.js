import SbSeparator from './index'

export default {
  title: 'Design System/Components/SbSeparator',
  component: SbSeparator,
  argTypes: {
    small: {
      name: 'small',
      description: 'small',
      control: {
        type: 'select',
        options: [true, false],
      },
    },
    isFlat: {
      name: 'isFlat',
      description: 'isFlat',
      control: {
        type: 'select',
        options: [true, false],
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
