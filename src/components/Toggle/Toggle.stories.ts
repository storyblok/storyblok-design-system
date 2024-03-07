import SbToggle from './index'
import availableIcons from '../../lib/all-icons'

import type { Args, Meta, StoryObj } from '@storybook/vue3'
import { execPath } from 'process'

type Story = StoryObj<typeof SbToggle>

const meta: Meta<typeof SbToggle> = {
  title: 'Forms/SbToggle',
  component: SbToggle,
  args: {
    id: 'example',
    name: 'example',
    modelValue: true,
    nativeValue: true,
    indeterminate: false,
    disabled: false,
    required: false,
    variant: 'primary',
    icon: null,
  },
  argTypes: {
    variant: {
      name: 'variant',
      description: '`SbToggle` variant',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      control: {
        type: 'select',
      },
    },
    icon: {
      name: 'icon',
      description: '`SbToggle` icon',
      options: [...availableIcons],
      control: {
        type: 'select',
      },
    },
    render: (args: Args) => ({
      components: { SbToggle },
      setup() {
        return { args }
      },
      template: `
      <div>
        <SbToggle
          v-bind="args"
          label="Default"
        />
      </div>
    `,
    }),
  },
}

export default meta

export const Default: Story = {
  args: {
    id: 'example-default',
  },
}

export const Indeterminate: Story = {
  args: {
    id: 'example-indeterminate',
    indeterminate: true,
  },
}

export const withVisibleLabel: Story = {
  args: {
    id: 'example-visible-label',
    label: 'Visible label',
    showLabel: true,
  },
}

export const Disabled: Story = {
  args: {
    id: 'example-disabled',
    disabled: true,
  },
}

export const Required: Story = {
  args: {
    id: 'example-required',
    required: true,
  },
}

export const WithIcon: Story = {
  args: {
    icon: 'globe',
    id: 'example-icon',
  },
}

export const Variants: Story = {
  render: (args: Args) => ({
    components: { SbToggle },
    setup() {
      return { args }
    },
    template: `
    <div>
      <SbToggle
        v-bind="args"
        id="primary"
        label="Default Variant"
        variant="primary"
        style="margin-bottom: 10px;"
      /><br>

      <SbToggle
        v-bind="args"
        id="secondary"
        variant="secondary"
        style="margin-bottom: 10px;"
      /><br>

      <SbToggle
        v-bind="args"
        id="ghost"
        label="Ghost Variant"
        variant="ghost"
        style="margin-bottom: 10px;"
      /><br>

      <SbToggle
        v-bind="args"
        id="danger"
        label="Danger Variant"
        variant="danger"
        style="margin-bottom: 10px;"
      /><br>
    </div>
  `,
  }),
}
