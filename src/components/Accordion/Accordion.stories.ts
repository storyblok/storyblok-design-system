import Accordion from './index'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof Accordion>

const meta: Meta<typeof Accordion> = {
  title: 'Basic/SbAccordion',
  component: Accordion,
  args: {
    title: 'Group 1',
    icon: 'settings',
    iconDescription: '',
    isOpen: false,
    noHighlight: false,
    noBorder: false,
    noPadding: false,
    contentInfoSlot: '<i>4 items</i>',
  },
  render: (args: Args) => ({
    components: { Accordion },
    setup() {
      return { args }
    },
    template: `
      <div>
        <Accordion
          v-bind="args"
          style="max-width: 300px"
        >
          <h2>Some text</h2>
          <p>Some more text</p>

          <template #contentInfo>
            <span v-html="args.contentInfoSlot" />
          </template>
        </Accordion>

        <Accordion
          v-bind="args"
          style="max-width: 300px"
        >
          <h2>Some text</h2>
          <p>Some more text</p>

          <template #contentInfo>
            <span v-html="args.contentInfoSlot" />
          </template>
        </Accordion>

        <Accordion
            v-bind="args"
            style="max-width: 300px"
        >
          <h2>Some text</h2>
          <p>Some more text</p>

          <template #contentInfo>
            <span v-html="args.contentInfoSlot" />
          </template>
        </Accordion>
      </div>
    `,
  }),
}

export default meta

export const Default: Story = {
  args: { title: 'Hello World' },
}

export const WithIcon: Story = {
  args: {
    title: 'Hello World with Icon',
    icon: 'trash-2',
    iconDescription: 'Delete',
  },
}

export const isOpen: Story = {
  args: {
    isOpen: true,
  },
}

export const noHighlight: Story = {
  args: {
    noHighlight: true,
  },
}

export const noBorder: Story = {
  args: {
    noBorder: true,
  },
}

export const noPadding: Story = {
  args: {
    noPadding: true,
  },
}

export const contentInfo: Story = {
  args: {
    contentInfoSlot: '',
  },
}
