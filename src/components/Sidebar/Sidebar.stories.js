import { SbSidebar, SbSidebarListItem } from '.'
import { SbMenu, SbMenuList, SbMenuItem } from '../Menu'
import SbIcon from '../Icon'

export const listItemsData = [
  {
    href: '#back',
    icon: 'chevron-left',
    label: 'Back to Spaces',
  },
  {
    href: '#content',
    icon: 'content',
    label: 'Content',
    ariaLabel: 'Go to content',
  },
  {
    href: '#tooltip',
    icon: 'content',
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
    icon: 'block-block',
    label: 'A really long entry that goes over a few lines',
    ariaLabel: 'Go to entry',
  },
]

const SidebarTemplate = (args) => ({
  components: {
    SbIcon,
    SbSidebar,
    SbSidebarListItem,
    SbMenu,
    SbMenuList,
    SbMenuItem,
  },

  setup() {
    return { args }
  },

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
      :logo="logo"
      :minimize.sync="internalMinimize"
      :max-width="maxWidth"
    >
      <SbSidebarListItem
        icon="partner-team"
        icon-right="chevron-down"
        label="Apps"
        class="sb-sidebar-item--parent"
      >
        <SbSidebarListItem
          v-if="!internalMinimize"
          label="Other activities"
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
            <SbMenuList
              :placement="listPlacement"
              :reference="$refs.userDropdown"
            >
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
})

export default {
  title: 'Interface/SbSidebar',
  component: SbSidebar,
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    listItems: [...listItemsData],
    minimize: false,
    logo: '',
    maxWidth: null,
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
    logo: {
      name: 'logo',
      description: 'Adds a custom logo (with a url to an image) to the sidebar',
      control: {
        type: 'string',
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

export const CustomLogo = SidebarTemplate.bind({})

CustomLogo.args = {
  logo: 'https://bcassetcdn.com/social/bvrg7kkg12/preview.png',
}

export const MaxWidth = SidebarTemplate.bind({})

MaxWidth.args = {
  maxWidth: '800px',
}

MaxWidth.parameters = {
  docs: {
    description: {
      story:
        'When setting the `maxWidth` value, the sidebar will automatically collapse/expand when the window width is equal or lower than and greater than.',
    },
  },
}
