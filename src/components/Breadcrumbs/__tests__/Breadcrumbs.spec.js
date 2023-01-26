import { mount } from '@vue/test-utils'

import {
  SbBreadcrumbs,
  SbBreadcrumbItem,
  SbBreadcrumbDropdown,
  SbBreadcrumbSeparator,
} from '..'
import { defaultBreadcrumbItemsData } from '../Breadcrumbs.stories'

const factory = (props = {}) => {
  return mount(SbBreadcrumbs, {
    props,
  })
}

const defaultLastItem = {
  label: 'CTA Section',
  isActive: true,
}

describe('SbBreadrumbs component', () => {
  describe('when render a simple breadcrumbs list', () => {
    const wrapper = factory({
      items: [...defaultBreadcrumbItemsData.slice(0, 2), defaultLastItem],
    })

    it('should render the correct list of SbBreadcrumbItem', () => {
      expect(wrapper.findAllComponents(SbBreadcrumbItem).length).toBe(3)
    })
  })

  describe('when render a long list of breadcrumbs', () => {
    const wrapper = factory({
      items: [
        ...defaultBreadcrumbItemsData,
        {
          label: 'Long hero section name tooltip',
          href: '#test-truncated',
        },
        defaultLastItem,
      ],
    })

    it('should show only two SbBreadcrumbItem in the first level', () => {
      expect(
        wrapper.findAll('.sb-breadcrumbs > .sb-breadcrumbs__item').length
      ).toBe(3)
    })

    it('should render the dropdown when it clicks in the first separator', async () => {
      expect(
        wrapper
          .findComponent(SbBreadcrumbDropdown)
          .find('.sb-breadcrumbs__dropdown')
          .exists()
      ).toBe(false)

      await wrapper.vm.toggleDropdown()

      expect(
        wrapper
          .findComponent(SbBreadcrumbDropdown)
          .find('.sb-breadcrumbs__dropdown')
          .exists()
      ).toBe(true)

      await wrapper.vm.toggleDropdown()

      expect(
        wrapper
          .findComponent(SbBreadcrumbDropdown)
          .find('.sb-breadcrumbs__dropdown')
          .exists()
      ).toBe(false)
    })
  })

  describe('when render a large section', () => {
    const wrapper = factory({
      items: [...defaultBreadcrumbItemsData.slice(0, 2), defaultLastItem],
      isLargeSection: true,
    })

    it('should the container contains a class with --large-section modifier', () => {
      expect(wrapper.attributes('class')).toBe(
        'sb-breadcrumbs sb-breadcrumbs--large-section'
      )
    })
  })

  describe('when render the SbBreadcrumbItem in slots', () => {
    const children = []
    const lastIndex = defaultBreadcrumbItemsData.length - 1

    defaultBreadcrumbItemsData.forEach((breadcrumbItem, index) => {
      const ItemComponent = {
        name: 'BreadcrumbItem',
        components: { SbBreadcrumbItem },
        data: () => ({
          props: breadcrumbItem,
        }),
        template: `<SbBreadcrumbItem v-bind="props" />`,
      }

      const SeparatorComponent = {
        name: 'SeparatorItem',
        components: { SbBreadcrumbSeparator },
        template: `<SbBreadcrumbSeparator />`,
      }

      children.push(ItemComponent)

      if (index !== lastIndex) {
        children.push(SeparatorComponent)
      }
    })

    const wrapper = mount(SbBreadcrumbs, {
      slots: {
        default: children,
      },
    })

    it('should render a list with breadcrumbs', () => {
      expect(wrapper.findAllComponents(SbBreadcrumbItem).length).toBe(6)
    })

    it('should render a list with breadcrumb separator', () => {
      expect(wrapper.findAllComponents(SbBreadcrumbSeparator).length).toBe(5)
    })
  })
})
