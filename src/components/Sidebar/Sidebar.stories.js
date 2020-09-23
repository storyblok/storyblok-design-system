import {
  SbSidebar,
  SbSidebarLink
} from '.'

export const listItemsData = [
  {
    href: '#',
    icon: 'sidebar-arrow',
    label: 'Back to Spaces'
  },
  {
    href: '#',
    icon: 'sidebar-dashboard',
    label: 'Dashboard',
    ariaLabel: 'Goto dashboard',
    active: true
  },
  {
    href: '#',
    icon: 'sidebar-content',
    label: 'Content'
  },
  {
    href: '#',
    icon: 'sidebar-tags',
    label: 'Tags'
  },
  {
    href: '#',
    icon: 'sidebar-assets',
    label: 'Assets'
  },
  {
    href: '#',
    icon: 'sidebar-components',
    label: 'Components'
  },
  {
    href: '#',
    icon: 'sidebar-datasources',
    label: 'Datasources'
  },
  {
    href: '#',
    icon: 'sidebar-activity',
    label: 'Activities'
  },
  {
    href: '#',
    icon: 'sidebar-addons',
    label: 'Apps'
  },
  {
    href: '#',
    icon: 'sidebar-settings',
    label: 'Settings'
  }
]

export const userData = {
  name: 'Dominik Angerer',
  src: 'https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4',
  email: 'fake@fake.com'
}

const SidebarTemplate = args => ({
  components: { SbSidebar, SbSidebarLink },
  props: Object.keys(args),
  template: `
    <SbSidebar
      v-bind="{
        user,
        listItems,
        minimize
      }"
    >

      <template slot="bottom">
        <SbSidebarLink
          href="#"
          icon="sidebar-report"
          label="Report a problem"
        />
      </template>
    </SbSidebar>
  `
})

export default {
  title: 'SbSidebar',
  component: SbSidebar,
  excludeStories: /.*Data$/,
  args: {
    user: { ...userData },
    listItems: [...listItemsData],
    minimize: false
  },
  argTypes: {
    user: {
      name: 'user',
      description: 'User information object',
      control: {
        type: 'object'
      }
    },
    minimize: {
      name: 'minimize',
      description: 'Minimize the Sidebar to just show the icons',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = SidebarTemplate.bind({})

export const Minimized = SidebarTemplate.bind({})

Minimized.args = {
  minimize: true
}
