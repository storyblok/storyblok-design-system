import { SbGroupButton } from './index'
import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbGroupButton>

import { availableVariants, availableButtonsTypes } from '../Button/lib'
import { availableSizes } from '../../utils'

const defaultOptions = [
  { label: 'First Button', value: 'first', icon: 'calendar' },
  { label: 'Second Button', value: 'second' },
  { label: 'Third Button', value: 'third' },
]

const meta: Meta<typeof SbGroupButton> = {
  title: 'Basic/SbGroupButton',
  component: SbGroupButton,
  args: {
    options: defaultOptions,
    variant: 'tertiary',
    size: 'small',
  },
  argTypes: {
    size: {
      name: 'size',
      description: 'Size to each `SbButton` inside the `SbGroupButton`',
      options: [...availableSizes],
      control: {
        type: 'select',
      },
    },
    variant: {
      name: 'variant',
      description: '`SbButton` variant',
      options: [...availableVariants],
      control: {
        type: 'select',
      },
    },
    type: {
      name: 'type',
      description: 'button type',
      options: [...availableButtonsTypes],
      control: {
        type: 'select',
      },
    },
    hasSpaces: {
      name: 'hasSpaces',
      description: 'Set if it has spaces between `SbButton` components',
      control: {
        type: 'boolean',
      },
    },
  },
  render: (args): unknown => ({
    components: { SbGroupButton },
    setup(): Args {
      const handleClicked = (value: string): void => {
        window.alert('Clicked: ' + value)
      }
      return { args, handleClicked }
    },
    template: `<SbGroupButton v-bind="args" @update:modelValue="handleClicked" />`,
  }),
}

export default meta

export const Default: Story = {}

export const WithIcons: Story = {
  args: {
    options: [
      { label: 'First', value: 'first', icon: 'calendar', hasIconOnly: true },
      {
        label: 'Second Option',
        value: 'second',
        icon: 'plus',
        hasIconOnly: true,
      },
      {
        label: 'Third Option',
        value: 'third',
        icon: 'more-vertical',
        hasIconOnly: true,
      },
    ],
  },
}

export const InvertedLink: Story = {
  render: (args: Args): unknown => ({
    components: { SbGroupButton },
    setup(): Args {
      return { args }
    },
    template: ` <div style="background-color:#1b243f;height:100px;"><SbGroupButton v-bind="args"  /> </div>`,
  }),
  args: {
    variant: 'inverted-link',
  },
}
