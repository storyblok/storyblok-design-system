// Sidebar.stories.js

import Sidebar from './Sidebar.vue'

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

export default {
  title: 'Interface/SbSidebarNew',
  component: Sidebar,
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
}

export const Normal = {
  render: (args, { argTypes }) => ({
    components: { Sidebar },
    props: Object.keys(argTypes),
    template: '<Sidebar v-bind="$props" v-on="$props" />',
  }),
}

export const Minimized = {
  render: (args) => ({
    components: { Sidebar },
    props: Object.keys(args),
    template: '<Sidebar v-bind="$props" v-on="$props" />',
  }),
  args: {
    minimize: true,
  },
}

export const CustomLogo = {
  render: (args) => ({
    components: { Sidebar },
    props: Object.keys(args),
    template: '<Sidebar v-bind="$props" v-on="$props" />',
  }),
  args: {
    logo: 'https://bcassetcdn.com/social/bvrg7kkg12/preview.png',
  },
}
