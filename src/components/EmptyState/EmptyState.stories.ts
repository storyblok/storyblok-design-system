import SbEmptyState from './index'
import type { StoryObj } from '@storybook/vue3'

export default {
  title: 'Data/SbEmptyState',
  component: SbEmptyState,
  args: {
    title: 'No bloks yet',
    description:
      'Your block consists of one or multiple fields with different field types. The field type defines what kind of content you want your editors to be able to store.',
  },
  argTypes: {},
}

type Story = StoryObj<typeof SbEmptyState>

export const Default: Story = {
  name: 'Default Empty State',
  render: (args, { argTypes }) => ({
    components: { SbEmptyState },
    props: Object.keys(argTypes),
    template: `
        <SbEmptyState v-bind="$props"  />
      `,
  }),
}

export const WithIcon: Story = {
  name: 'Empty State with Icon',
  render: (args, { argTypes }) => ({
    components: { SbEmptyState },
    props: Object.keys(argTypes),
    template: `
        <SbEmptyState v-bind="$props" title="Search stories" iconName="search" icon-rounded />
      `,
  }),
}

export const WithTopRightIcon: Story = {
  name: 'Empty State with Top Icon',
  render: (args, { argTypes }) => ({
    components: { SbEmptyState },
    props: Object.keys(argTypes),
    template: `
        <SbEmptyState v-bind="$props"
        title="Let's go!"
        top-right-icon="sparkles"
        illustration-link="https://a.storyblok.com/f/136045/140x109/458988e575/first-entry-modal-image.svg"
        />
      `,
  }),
}

export const WithIllustration: Story = {
  name: 'Empty State with Illustration',
  render: (args, { argTypes }) => ({
    components: { SbEmptyState },
    props: Object.keys(argTypes),
    template: `
        <SbEmptyState v-bind="$props" title="Ready to go" illustration-link="https://a.storyblok.com/f/136045/140x109/458988e575/first-entry-modal-image.svg" />
      `,
  }),
}

export const WithButtons: Story = {
  name: 'Empty State with Buttons',
  render: (args, { argTypes }) => ({
    components: { SbEmptyState },
    props: Object.keys(argTypes),
    template: `
        <SbEmptyState v-bind="$props" button-text="Continue" second-button-text="Cancel" />
      `,
  }),
}
