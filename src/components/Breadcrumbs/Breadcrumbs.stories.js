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
      description: 'List with the breadcrumb items',
    },
    isLargeSection: {
      name: 'isLargeSection',
      description:
        'Prop to change the style of the last item, making the item have bigger font-size and in bold, and the item will be rendered on the next line.',
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
        'When you set the attribute `isLargeSection`, the last item will be show in a new line, and the font size of this item will be changed to `$heading-xl` with the `2.6rem` size.',
    },
  },
}

export const LongBreadcrumbs = (args) => ({
  components: { SbBreadcrumbs },
  props: Object.keys(args),
  template: `
    <div style="max-width: 400px">
      <SbBreadcrumbs v-bind="{ items }" />
    </div>
  `,
})

LongBreadcrumbs.args = {
  items: [
    ...defaultBreadcrumbItemsData,
    {
      label: 'Button CTA',
      href: '#Button-CTA',
      title: 'Button CTA',
    },
    {
      label: 'Button CTA2',
      href: '#Button-CTA2',
      title: 'Button CTA2',
    },
    {
      label: 'CTA2 Section',
      isActive: true,
    },
  ],
}

LongBreadcrumbs.parameters = {
  docs: {
    description: {
      story:
        'When a path contains more than six levels of entities, it will have a `SbDropdown` with the rest of the items, this happens automatically, you can click on the arrow to the right of the 3 dots to expand the `SbDropdown`.',
    },
  },
}

export const LongBreadcrumbsInTwoLines = Template.bind({})

LongBreadcrumbsInTwoLines.args = {
  items: [
    ...defaultBreadcrumbItemsData.slice(0, -1),
    {
      label: 'CTA Section',
      isActive: true,
    },
  ],
}

LongBreadcrumbsInTwoLines.parameters = {
  docs: {
    description: {
      story:
        "The SbBreadcrumbs will automatically wrap the line if the container doesn't have enough space to render the list in a single line, below you can see this, as the container is only `400px`, causing the list to break line and render on the next line.",
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
      story:
        'When the label is long it will be automatically truncated, the truncate function is activated when the label has more than 13 characters.',
    },
  },
}
