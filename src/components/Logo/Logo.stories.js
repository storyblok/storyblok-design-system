import SbLogo from './index'

export default {
  title: 'Basic/SbLogo',
  component: SbLogo,
  argTypes: {
    textVariant: {
      name: 'variant',
      description: 'Variant',
      options: ['dark', 'white'],
      control: {
        type: 'select',
      },
    },
    iconOnly: {
      name: 'iconOnly',
      description: 'show the icon only',
      control: {
        type: 'boolean',
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

export const IconOnly = (args) => ({
  components: { SbLogo },
  setup() {
    return { args }
  },
  template: `
      <SbLogo icon-only />
  `,
})
