import { SbSidebar, SbSidebarListItem } from '.'
import { SbMenu, SbMenuList, SbMenuItem } from '../Menu'

export const listItemsData = [
  {
    href: '#',
    icon: 'sidebar-arrow',
    label: 'Back to Spaces',
  },
  {
    href: '#',
    icon: 'sidebar-dashboard',
    label: 'Dashboard',
    ariaLabel: 'Goto dashboard',
    active: true,
  },
  {
    href: '#',
    icon: 'sidebar-content',
    label: 'Content',
  },
  {
    href: '#',
    icon: 'sidebar-tags',
    label: 'Tags',
  },
  {
    href: '#',
    icon: 'sidebar-assets',
    label: 'Assets',
  },
  {
    href: '#',
    icon: 'sidebar-components',
    label: 'Components',
  },
  {
    href: '#',
    icon: 'sidebar-datasources',
    label: 'Datasources',
  },
  {
    href: '#',
    icon: 'sidebar-activity',
    label: 'Activities',
  },
  {
    href: '#',
    icon: 'sidebar-addons',
    label: 'Apps',
  },
  {
    href: '#',
    icon: 'sidebar-settings',
    label: 'Settings',
  },
]

const SidebarTemplate = (args) => ({
  components: { SbSidebar, SbSidebarListItem, SbMenu, SbMenuList, SbMenuItem },

  props: Object.keys(args),

  data: () => ({
    internalMinimize: false,
    openUserDropdown: false,
  }),

  computed: {
    listPlacement() {
      return this.internalMinimize ? 'auto' : 'top'
    },
  },

  watch: {
    minimize: {
      immediate: true,
      handler(value) {
        this.internalMinimize = value
      },
    },
  },

  template: `
    <SbSidebar
      v-bind="{ listItems }"

      :minimize.sync="internalMinimize"
    >

      <template slot="bottom">
        <SbSidebarListItem
          href="#"
          icon="sidebar-report"
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
            <SbMenuList
              :placement="listPlacement"
              :reference="$refs.userDropdown"
            >
              <div slot="top">
                <span> John Doe </span>
                <span> jondoe@lipsum.com </span>
              </div>

              <SbMenuItem> Account settings </SbMenuItem>
              <SbMenuItem> Security settings </SbMenuItem>
              <SbMenuItem> Personal access tokens </SbMenuItem>
              <SbMenuItem> Privacy Settings </SbMenuItem>
              <SbMenuItem> Change Language </SbMenuItem>
            </SbMenuList>
          </SbMenu>
        </SbSidebarListItem>
      </template>
    </SbSidebar>
  `,
})

export default {
  title: 'Design System/Components/SbSidebar',
  component: SbSidebar,
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    listItems: [...listItemsData],
    minimize: false,
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
}

export const Default = SidebarTemplate.bind({})

export const Minimized = SidebarTemplate.bind({})

Minimized.args = {
  minimize: true,
}

Minimized.parameters = {
  docs: {
    description: {
      story:
        'When you define the sidebar as `minimize`, it will collapse the sidebar to just show the link icons.',
    },
  },
}
