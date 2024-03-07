import SbSeparator from '.'
import { defineComponent } from 'vue'

import type { Args, Meta, StoryObj, StoryFn } from '@storybook/vue3'

type Story = StoryObj<typeof SbSeparator>

const meta: Meta<typeof SbSeparator> = {
  title: 'Basic/SbSeparator',
  component: SbSeparator,
  argTypes: {
    orientation: {
      name: 'orientation',
      description: 'Orientation of the separator',
      options: ['horizontal', 'vertical'],
      control: {
        type: 'select',
      },
    },
    centered: {
      name: 'centered',
      description: 'Centered separator',
      control: {
        type: 'boolean',
      },
    },
  },
  render: (args: Args) => ({
    components: {
      SbSeparator,
    },
    setup() {
      return { args }
    },
    template: `
    <div style="list-style: none; display: flex; flex-direction: column">
      <h2 style="padding: 8px; text-align: center">Section 1</h2>
      <SbSeparator v-bind="args" />
      <h2 style="padding: 8px; text-align: center">Section 2</h2>
    </div>`,
  }),
}

export default meta

export const Default: Story = {}

export const WithMargin: Story = {
  args: {
    my: 5,
  },
}

const TemplateHorizontal: StoryFn = (args: Args) => ({
  components: {
    SbSeparator,
  },
  setup(): { args: Args } {
    return { args }
  },
  // TODO replace with ListContainer + ListItem
  template: `
      <ul style="list-style: none; display: flex; flex-direction: column; padding: 0; border: 1px solid lightgray; border-radius: 5px">
        <li style="padding: 10px">Item 1</li>
        <SbSeparator v-bind="args" />
        <li style="padding: 10px">Item 2</li>
        <SbSeparator v-bind="args" />
        <li style="padding: 10px">Item 3</li>
      </ul>`,
})

export const Horizontal: StoryObj = {
  render: TemplateHorizontal,
  args: { orientation: 'horizontal', is: 'li' },
}

export const Centered: StoryObj = {
  render: TemplateHorizontal,
  args: { orientation: 'horizontal', is: 'li', centered: true },
}

export const Vertical: StoryObj = {
  render: (args) => ({
    components: {
      SbSeparator,
    },
    setup(): { args: Args } {
      return { args }
    },
    // TODO replace with ListContainer + ListItem
    template: `
      <div style="width: fit-content; display: flex; flex-direction: row; padding: 0;">
        <span style="padding: 10px">Item 1</span>
        <SbSeparator v-bind="args" />
        <span style="padding: 10px">Item 2</span>
        <SbSeparator v-bind="args" />
        <span style="padding: 10px">Item 3</span>
      </div>`,
  }),
  args: { orientation: 'vertical' },
}
