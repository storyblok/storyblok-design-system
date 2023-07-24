import SbHeading from '.'
import { availableHeadingTags, availableHeadingWeights } from './lib'

export default {
  title: 'Basic/SbHeading',
  component: SbHeading,
  args: {
    as: 'h1',
    fontWeight: 'bold',
  },
  argTypes: {
    as: {
      name: 'as',
      description: 'The rendered tag element',
      options: availableHeadingTags,
      control: {
        type: 'select',
      },
    },
    fontWeight: {
      name: 'fontWeight',
      description: 'Render a different font-weight for heading element',
      options: availableHeadingWeights,
      control: {
        type: 'select',
      },
    },
    customFontSize: {
      name: 'customFontSize',
      description:
        'Render a different font-size style, overriding the existing one',
      control: {
        type: 'text',
      },
    },
  },
}

const Template = (args) => ({
  components: { SbHeading },
  setup() {
    return { args }
  },
  template: `
  <SbHeading v-bind="args"> Storyblok is amazing! </SbHeading>
`,
})

export const Default = Template.bind({})

export const HeadingWithCustomFontSize = Template.bind({})

HeadingWithCustomFontSize.args = {
  customFontSize: '40px',
}
