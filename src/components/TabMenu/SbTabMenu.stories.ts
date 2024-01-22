import SbTabMenu from './index'
import type { Args, Meta, StoryObj } from '@storybook/vue3'
import type { MenuItem } from 'primevue/menuitem'

type Story = StoryObj<typeof SbTabMenu>

const defaultItems = [
  {
    label: 'Option 1',
  },
  {
    label: 'Option 2',
  },
  {
    label: 'Option Disabled',
    disabled: true,
  },
  {
    label: 'Option Invisible',
    visible: false,
  },
  {
    label: 'Customized Option',
    class: 'sb-custom-class',
  },
  {
    label: 'Option 3',
  },
  {
    label: 'Option 4',
  },
  {
    label: 'Option 5',
  },
  {
    label: 'Option 6',
  },
  {
    label: 'Option 7',
  },
] as MenuItem[]

const meta: Meta<typeof SbTabMenu> = {
  title: 'Navigation/SbTabMenu',
  component: SbTabMenu,
  args: {
    model: defaultItems,
  },
}

const renderFn = (args: Args): unknown => ({
  components: { SbTabMenu },
  setup(): Args {
    return { args }
  },
  template: `<SbTabMenu v-bind="args" />`,
})

export const Default: Story = {
  render: renderFn,
}

export const VerticalMenu: Story = {
  render: renderFn,
  args: {
    vertical: true,
  },
}

export const LoadingMenu: Story = {
  render: renderFn,
  args: {
    isLoading: true,
  },
}

export default meta
