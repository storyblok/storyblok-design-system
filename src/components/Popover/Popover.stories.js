import { SbPopover, placementOptions } from '.'
import SbButton from '../Button'

export default {
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
      control: {
        type: 'select',
        options: placementOptions,
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

// @vue/component
export const Default = (args) => ({
  components: {
    SbButton,
    SbPopover,
  },
  setup() {
    return { args }
  },
  data: () => ({
    isOpen: false,
  }),
  methods: {
    handleClick() {
      this.isOpen = !this.isOpen
    },
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
})

export const UsingPortalTarget = (args) => ({
  components: {
    SbButton,
    SbPopover,
  },
  setup() {
    return { args }
  },
  data: () => ({
    isOpen: false,
  }),
  methods: {
    handleClick() {
      this.isOpen = !this.isOpen
    },
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
})
