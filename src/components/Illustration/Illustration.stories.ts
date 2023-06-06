import SbIllustration from './index'
import type { StoryObj } from '@storybook/vue3'

export default {
  title: 'Data/SbIllustration',
  component: SbIllustration,
  args: {
    alt: 'Ready to go illustration',
    src: 'https://a.storyblok.com/f/136045/140x109/458988e575/first-entry-modal-image.svg',
  },
  argTypes: {
    width: {
      name: 'width',
      description: 'Max width in px or %',
      control: {
        type: 'text',
      },
    },
    alt: {
      name: 'alt',
      description: 'Alt text for image',
      control: {
        type: 'text',
      },
    },
    src: {
      name: 'src',
      description: 'Image source',
      control: {
        type: 'text',
      },
    },
  },
}

type Story = StoryObj<typeof SbIllustration>

export const Default: Story = {
  name: 'Default Illustration',
  render: (args, { argTypes }) => ({
    components: { SbIllustration },
    props: Object.keys(argTypes),
    template: `
        <SbIllustration v-bind="$props" />
      `,
  }),
}

export const DifferentSizes: Story = {
  name: 'Illustration in different sizes',
  render: (args, { argTypes }) => ({
    components: { SbIllustration },
    props: Object.keys(argTypes),
    template: `
      <SbIllustration :src="$props.src" width="80px" />
      <SbIllustration :src="$props.src" width="160px" />
      <SbIllustration :src="$props.src" width="50%" />

      `,
  }),
}
