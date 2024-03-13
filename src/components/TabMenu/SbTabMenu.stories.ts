import SbTabMenu from './index'
import type { Args, Meta, StoryObj } from '@storybook/vue3'
import type { MenuItem } from 'primevue/menuitem'
import SbIcon from '../Icon'
import SbAvatar from '../Avatar'

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

type Story = StoryObj<typeof SbTabMenu>

const meta: Meta<typeof SbTabMenu> = {
  title: 'Navigation/SbTabMenu',
  args: {
    model: defaultItems,
  },
  render: (args) => ({
    components: { SbTabMenu },
    setup(): Args {
      return { args }
    },
    template: `<SbTabMenu v-bind="args" />`,
  }),
}

export default meta

export const Default: Story = {}

export const VerticalMenu: Story = {
  args: {
    vertical: true,
  },
}

export const LoadingMenu: Story = {
  args: {
    isLoading: true,
  },
}

export const WithContainer: Story = {
  args: {
    type: 'container',
  },
}

export const WithActiveIndex: Story = {
  args: {
    activeIndex: 6,
  },
  parameters: {
    docs: {
      description: {
        story:
          'If `activeIndex` is set, the active tab will be highlighted based on the index. The index starts at 0.',
      },
    },
  },
}

export const WithScroll: Story = {
  args: {
    scrollable: true,
  },
  render: (args) => ({
    components: { SbTabMenu },
    setup(): Args {
      return { args }
    },
    template: `<div style="maxWidth: 300px;"><SbTabMenu v-bind="args" /></div>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'If `scrollable` is `true` (by default it is true), the menu will be scrollable when the content is bigger than the container.',
      },
    },
  },
}

export const WithSlot = (): unknown => ({
  components: { SbTabMenu, SbIcon, SbAvatar },
  setup(): Args {
    const model = [
      {
        label: 'Option 1',
        iconLeft: 'chevron-down-circle',
      },
      {
        label: 'Option 2',
        iconRight: 'search',
      },
      {
        label: 'Option 3',
        avatar: 'https://avatars.githubusercontent.com/u/6871945?v=4',
      },
    ]
    return { model }
  },
  template: `<SbTabMenu :model="model">
  <template #item="{ item, props }">
  <a v-bind="props.action" role="menuitem" class="sb-tab-menu__slot-item">
      <SbAvatar v-if="item.avatar" :src="item.avatar" />
      <SbIcon v-if="item.iconLeft" :name="item.iconLeft" />
      {{ item.label }}
      <SbIcon v-if="item.iconRight" :name="item.iconRight" />
  </a>
  </template>
  </SbTabMenu>`,
})
