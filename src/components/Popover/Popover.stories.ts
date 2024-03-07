import { SbPopover, placementOptions } from '.'
import SbButton from '../Button'
import { ref } from 'vue'
import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbPopover>

const meta: Meta<typeof SbPopover> = {
  title: 'Interface/SbPopover',
  component: SbPopover,
  args: {
    offset: [0, 10],
    placement: 'auto',
    reference: '#buttontest',
  },
  argTypes: {
    anchor: {
      name: 'anchor',
      description: 'Reference to element itself',
      control: {
        type: 'text',
      },
    },
    offset: {
      name: 'offset',
      description: 'An array of numbers',
      control: {
        type: 'array',
      },
    },
    placement: {
      name: 'placement',
      description: 'Title for notification',
      options: placementOptions,
      control: {
        type: 'select',
      },
    },
    parentElementTag: {
      name: 'parentElementTag',
      description: 'Tag element for parent tag in Popover',
      control: {
        type: 'text',
      },
    },
    reference: {
      name: 'reference',
      description: 'Reference to element trigger popover',
      control: {
        type: 'text',
      },
    },
  },
}

export default meta

export const Default: Story = {
  render: (args: Args) => ({
    components: {
      SbButton,
      SbPopover,
    },
    setup() {
      const isOpen = ref(false)
      function handleClick() {
        isOpen.value = !isOpen.value
      }
      return { args, isOpen, handleClick }
    },
    template: `
    <div>
      <SbButton id="buttontest" label="Click me" @click="handleClick" />

      <SbPopover
        ref="popover"
        :reference="reference"
        :placement="placement"
        :is-open="isOpen"
      >
        <ul style="background-color: #BBBBBB;">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </SbPopover>
    </div>
  `,
  }),
}

export const UsingPortalTarget: Story = {
  render: (args: Args) => ({
    components: {
      SbButton,
      SbPopover,
    },
    setup() {
      const isOpen = ref(false)
      function handleClick() {
        isOpen.value = !isOpen.value
      }
      return { args, isOpen, handleClick }
    },
    template: `
    <div>
      <SbButton id="buttontest" label="Click me" @click="handleClick" />

      <SbPopover
        ref="popover"
        :reference="reference"
        :placement="placement"
        :is-open="isOpen"
        use-portal
        use-portal-target="#custom-target-el"
      >
        <ul style="background-color: #BBBBBB;">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </SbPopover>

      <div id="custom-target-el">
        <p>Portal Target</p>
      </div>
    </div>
  `,
  }),
}
