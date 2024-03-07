import SbIllustration from './index'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbIllustration>

const meta: Meta<typeof SbIllustration> = {
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

export default meta

export const Default: Story = {
  name: 'Default Illustration',
  render: (args: Args) => ({
    components: { SbIllustration },
    setup(): Args {
      return { args }
    },
    template: `
        <SbIllustration v-bind="args" />
      `,
  }),
}

export const DifferentSizes: Story = {
  name: 'Illustration in different sizes',
  render: (args: Args) => ({
    components: { SbIllustration },
    setup(): Args {
      return { args }
    },
    template: `
      <SbIllustration :src="args.src" width="80px" />
      <SbIllustration :src="args.src" width="160px" />
      <SbIllustration :src="args.src" width="50%" />

      `,
  }),
}
