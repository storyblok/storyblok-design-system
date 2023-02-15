import SbLogo from './index'

export default {
  title: 'Design System/Components/SbLogo',
  component: SbLogo,
  argTypes: {
    textVariant: {
      name: 'variant',
      description: 'Variant',
      control: {
        type: 'select',
        options: ['dark', 'white'],
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbLogo },
  setup() {
    return { args }
  },
  template: `
    <SbLogo v-bind="args" />
  `,
})

export const WhiteText = (args) => ({
  components: { SbLogo },
  setup() {
    return { args }
  },
  template: `
    <div style="background-color:#1b243f;padding:20px;">
      <SbLogo text-variant="white" />
    </div>
  `,
})
