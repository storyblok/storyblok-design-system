import { SbSidebar, SbSidebarListItem } from '.'
import { SbMenu, SbMenuList, SbMenuItem } from '../Menu'
import { SbIcon } from '../Icon'
import { ref } from 'vue'

export const listItemsData = [
  {
    href: '#back',
    icon: 'chevron-left',
    label: 'Back to Spaces',
  },
  {
    href: '#content',
    icon: 'layers',
    label: 'Content',
    ariaLabel: 'Go to content',
  },
  {
    href: '#tooltip',
    icon: 'layers',
    label: 'Content tooltip',
    iconTooltip: 'square-warning',
    iconTooltipLabel: 'Label content tooltip',
    ariaLabel: 'Go to content',
  },
  {
    href: '#apps',
    icon: 'puzzle',
    label: 'Apps Directory',
  },
  {
    href: '#block',
    icon: 'book',
    label: 'A really long entry that goes over a few lines',
    ariaLabel: 'Go to entry',
  },
]

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbSidebar>

const meta: Meta<typeof SbSidebar> = {
  title: 'Interface/SbSidebar',
  component: SbSidebar,
  args: {
    listItems: [...listItemsData],
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    minimize: {
      name: 'minimize',
      description:
        'Minimize the Sidebar to just show the icons. When use this property, you should put the `sync` modifier (like `:minimize.sync`) to allow the sidebar change the state itself',
      control: {
        type: 'boolean',
      },
    },
  },
  render: (args: Args) => ({
    components: { SbSidebar },
    setup() {
      return { args }
    },
    template: '<SbSidebar v-bind="args" v-on="args" />',
  }),
}

export default meta

export const Default: Story = {}

export const Minimized: Story = {
  args: {
    minimize: true,
  },
}

export const CustomLogo: Story = {
  args: {
    logo: 'https://bcassetcdn.com/social/bvrg7kkg12/preview.png',
  },
}

export const CustomItems: Story = {
  render: (args: Args) => ({
    components: {
      SbIcon,
      SbSidebar,
      SbSidebarListItem,
      SbMenu,
      SbMenuList,
      SbMenuItem,
    },
    setup: () => {
      const internalMinimize = ref(false)
      const openUserDropdown = ref(false)
      return { args, internalMinimize, openUserDropdown }
    },
    template: `<SbSidebar>
    <SbSidebarListItem
      icon="partner-team"
      icon-right="chevron-down"
      label="Apps"
      class="sb-sidebar-item--parent"
    >
      <SbSidebarListItem
        label="Other activities"
        icon="puzzle"
        is-child
      />
    </SbSidebarListItem>
    <template #bottom>
      <SbSidebarListItem
        href="#"
        icon="settings"
        label="Report a problem"
      />
      <SbSidebarListItem
        :avatar="{
          src: 'https://avatars1.githubusercontent.com/u/160495?s=460&u=b88ece40883d2e9716e833f6a3c78c56ca3eb14f&v=4',
          name: 'Alexander Feiglstorfer'
        }"
        label="My account"
        ref="userDropdown"
        @click="openUserDropdown = !openUserDropdown"
      >
        <SbMenu v-model="openUserDropdown">
          <SbMenuList placement="top" :reference="$refs.userDropdown">>
            <div #top style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #dfe3e8; padding: 15px 20px; margin-bottom: 10px;">
              <div>
                <p style="font-size: 14px; font-weight: 500; color: #1b243f; margin: 0; margin-bottom: 5px;"> John Doe </p>
                <p style="font-size: 12px; color: #b1b5be; margin: 0;"> jondoe@lipsum.com </p>
              </div>

              <SbIcon name="log-out" color="light-gray" size="small" />
            </div>

            <SbMenuItem> Account settings </SbMenuItem>
            <SbMenuItem> Security settings </SbMenuItem>
            <SbMenuItem> Personal access tokens </SbMenuItem>
            <SbMenuItem> Privacy settings </SbMenuItem>
            <SbMenuItem> Change language </SbMenuItem>
          </SbMenuList>
        </SbMenu>
      </SbSidebarListItem>
    </template>
  </SbSidebar>
  `,
  }),
}
