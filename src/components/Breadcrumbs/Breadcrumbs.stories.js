import { SbBreadcrumbs } from '.'

// default export defines configurations to all stories
export default {
  title: 'SbBreadcrumbs',
  component: SbBreadcrumbs
}

const defaultBreadcrumbItems = [
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
    }
  },
  template: `
    <SbBreadcrumbs :items="items" />
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
