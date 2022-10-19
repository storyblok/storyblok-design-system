import { SbBreadcrumbs, SbBreadcrumbItem, SbBreadcrumbSeparator } from '.'

const Template = (args) => ({
  components: { SbBreadcrumbs, SbBreadcrumbItem, SbBreadcrumbSeparator },
  setup() {
    return { ...args }
  },
  computed: {
    lastIndex() {
      return this.items.length - 1
    },
  },
  template: `
    <div style="max-width: 400px">
      <SbBreadcrumbs v-bind="args">
        <template v-for="(item, index) in items">
          <SbBreadcrumbItem
            :key="item.label"
            :is-active="index === lastIndex"
            :label="item.label"
          />

          <SbBreadcrumbSeparator
            v-if="index < lastIndex"
            :key="index"
          />
        </template>
      </SbBreadcrumbs>
    </div>
  `,
})

// default export defines configurations to all stories
export default {
  title: 'Design System/Components/SbBreadcrumbs',
  component: SbBreadcrumbs,
  excludeStories: /.*Data$/,
  parameters: {
    docs: {
      description: {
        component:
          'Breadcrumbs show users their current location relative to the information architecture and enable them to quickly move up to a parent level or previous step.',
      },
    },
  },
  args: {
    items: [],
    isLargeSection: false,
  },
  argTypes: {
    items: {
      name: 'items',
      description: 'Breadcrumb items',
    },
    isLargeSection: {
      name: 'isLargeSection',
      description: 'Enable show the username on the right',
      control: {
        type: 'boolean',
      },
    },
  },
}

export const defaultBreadcrumbItemsData = [
  {
    label: 'Global',
    href: '#Global',
    title: 'Global',
  },
  {
    label: 'Hero',
    href: '#Hero',
    title: 'Hero',
  },
  {
    label: 'Enterprise Page',
    href: '#Enterprise-Page',
    title: 'Enterprise Page',
  },
  {
    label: 'Enterprise Into',
    href: '#Enterprise-Into',
    title: 'Enterprise Into',
  },
  {
    label: 'Enterprise CTA',
    href: '#Enterprise CTA',
    title: 'Enterprise CTA',
  },
  {
    label: 'CTA Section',
    isActive: true,
  },
]

export const Default = Template.bind({})

Default.args = {
  items: [
    ...defaultBreadcrumbItemsData.slice(0, 2),
    {
      label: 'CTA Section',
      isActive: true,
    },
  ],
}

export const WithLargeSection = Template.bind({})

WithLargeSection.args = {
  items: [
    ...defaultBreadcrumbItemsData.slice(0, 2),
    {
      label: 'CTA Section',
      isActive: true,
    },
  ],
  isLargeSection: true,
}

WithLargeSection.parameters = {
  docs: {
    description: {
      story:
        'When you set the attribute `isLargeSection`, the last item will be show in a new line',
    },
  },
}

export const LongBreadcrums = (args) => ({
  components: { SbBreadcrumbs, SbBreadcrumbItem },
  setup() {
    return { args }
  },
  computed: {
    lastIndex() {
      return this.items.length - 1
    },
  },
  template: `
    <div style="max-width: 400px">
      <SbBreadcrumbs v-bind="args" />
    </div>
  `,
})

LongBreadcrums.args = {
  items: [
    ...defaultBreadcrumbItemsData.slice(0, -1),
    {
      label: 'Button CTA',
      href: '#Button-CTA',
      title: 'Button CTA',
    },
    {
      label: 'CTA Section',
      isActive: true,
    },
  ],
}

LongBreadcrums.parameters = {
  docs: {
    description: {
      story:
        'When a path contains more than five levels of entities, it should have a `SbDropdown` with the rest of the items',
    },
  },
}

export const LongBreadcrumsInTwoLines = Template.bind({})

LongBreadcrumsInTwoLines.args = {
  items: [
    ...defaultBreadcrumbItemsData.slice(0, -1),
    {
      label: 'CTA Section',
      isActive: true,
    },
  ],
}

LongBreadcrumsInTwoLines.parameters = {
  docs: {
    description: {
      story: 'The SbBreadcrumbs can be split in two lines',
    },
  },
}

export const ItemsTruncated = Template.bind({})

ItemsTruncated.args = {
  items: [
    ...defaultBreadcrumbItemsData.slice(0, 2),
    {
      label: 'Long hero section name tooltip',
      href: '#test-truncated',
    },
    {
      label: 'CTA Section',
      isActive: true,
    },
  ],
}

ItemsTruncated.parameters = {
  docs: {
    description: {
      story: 'When have long label texts, it should truncate them',
    },
  },
}
