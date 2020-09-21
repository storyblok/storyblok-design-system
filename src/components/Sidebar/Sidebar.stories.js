import {
  SbSidebar,
  SbSidebarLink
} from '.'

const SidebarTemplate = args => ({
  components: { SbSidebar, SbSidebarLink },
  props: Object.keys(args),
  template: `
    <SbSidebar
      v-bind="{
        user,
        listItems
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
  args: {
    user: {
      name: 'Dominik Angerer',
      src: 'https://avatars1.githubusercontent.com/u/7952803?s=400&u=0fd8a3a0721768210fdcedb7607e9ad33af9f7ad&v=4',
      email: 'fake@fake.com'
    },
    listItems: [
      {
        href: '#',
        icon: 'sidebar-arrow',
        label: 'Back to Spaces'
      },
      {
        href: '#',
        icon: 'sidebar-dashboard',
        label: 'Dashboard',
        ariaLabel: 'Ir para o dashboard',
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
  },
  argTypes: {
    user: {
      name: 'user',
      description: 'User information object',
      control: {
        type: 'object'
      }
    }
  }
}

export const Default = SidebarTemplate.bind({})
