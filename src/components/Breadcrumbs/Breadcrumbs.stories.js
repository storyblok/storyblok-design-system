import { withKnobs, boolean } from '@storybook/addon-knobs'

import { SbBreadcrumbs } from '.'

// default export defines configurations to all stories
export default {
  title: 'SbBreadcrumbs',
  component: SbBreadcrumbs,
  decorators: [withKnobs]
}

export const defaultBreadcrumbItems = [
  {
    label: 'Global',
    href: '#Global',
    title: 'Global'
  },
  {
    label: 'Hero',
    href: '#Hero',
    title: 'Hero'
  },
  {
    label: 'Enterprise Page',
    href: '#Enterprise-Page',
    title: 'Enterprise Page'
  },
  {
    label: 'Enterprise Into',
    href: '#Enterprise-Into',
    title: 'Enterprise Into'
  },
  {
    label: 'Enterprise CTA',
    href: '#Enterprise CTA',
    title: 'Enterprise CTA'
  },
  {
    label: 'CTA Section',
    isActive: true
  }
]

export const Default = () => ({
  components: { SbBreadcrumbs },
  props: {
    items: {
      default: () => [
        ...defaultBreadcrumbItems.slice(0, 2),
        {
          label: 'CTA Section',
          isActive: true
        }
      ]
    },
    isLargeSection: {
      default: boolean('Enable Large Section', false)
    }
  },
  template: `
    <SbBreadcrumbs v-bind="{ items, isLargeSection }" />
  `
})

export const WithLargeSection = () => ({
  components: { SbBreadcrumbs },
  props: {
    items: {
      default: () => [
        ...defaultBreadcrumbItems.slice(0, 2),
        {
          label: 'CTA Section',
          isActive: true
        }
      ]
    }
  },
  template: `
    <SbBreadcrumbs :items="items" is-large-section />
  `
})

export const LongBreadcrums = () => ({
  components: { SbBreadcrumbs },
  props: {
    items: {
      default: () => [
        ...defaultBreadcrumbItems.slice(0, -1),
        {
          label: 'Button CTA',
          href: '#Button-CTA',
          title: 'Button CTA'
        },
        {
          label: 'CTA Section',
          isActive: true
        }
      ]
    }
  },
  template: `
    <div style="max-width: 400px">
      <SbBreadcrumbs :items="items" />
    </div>
  `
})

export const LongBreadcrumsInTwoLines = () => ({
  components: { SbBreadcrumbs },
  props: {
    items: {
      default: () => [
        ...defaultBreadcrumbItems.slice(0, -1),
        {
          label: 'CTA Section',
          isActive: true
        }
      ]
    }
  },
  template: `
    <div style="max-width: 400px">
      <SbBreadcrumbs :items="items" />
    </div>
  `
})

export const ItemsTruncated = () => ({
  components: { SbBreadcrumbs },
  props: {
    items: {
      default: () => [
        ...defaultBreadcrumbItems.slice(0, 2),
        {
          label: 'Long hero section name tooltip',
          href: '#test-truncated'
        },
        {
          label: 'CTA Section',
          isActive: true
        }
      ]
    }
  },
  template: `
    <div style="max-width: 400px">
      <SbBreadcrumbs :items="items" />
    </div>
  `
})
