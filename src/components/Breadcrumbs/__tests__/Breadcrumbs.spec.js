import { mount } from '@vue/test-utils'

import {
  SbBreadcrumbs,
  SbBreadcrumbItem,
  SbBreadcrumbDropdown
} from '..'
import { defaultBreadcrumbItems } from '../Breadcrumbs.stories'

const factory = (propsData = {}) => {
  return mount(SbBreadcrumbs, {
    propsData
  })
}

const defaultLastItem = {
  label: 'CTA Section',
  isActive: true
}

describe('SbBreadrumbs component', () => {
  describe('when render a simple breadcrumbs list', () => {
    const wrapper = factory({
      items: [
        ...defaultBreadcrumbItems.slice(0, 2),
        defaultLastItem
      ]
    })

    it('should render the correct list of SbBreadcrumbItem', () => {
      expect(wrapper.findAllComponents(SbBreadcrumbItem).length).toBe(3)
    })
  })

  describe('when render a long list of breadcrumbs', () => {
    const wrapper = factory({
      items: [
        ...defaultBreadcrumbItems,
        {
          label: 'Long hero section name tooltip',
          href: '#test-truncated'
        },
        defaultLastItem
      ]
    })

    it('should show only two SbBreadcrumbItem in the first level', () => {
      expect(
        wrapper.findAll('.sb-breadcrumbs > .sb-breadcrumbs__item').length
      ).toBe(3)
    })

    it('should render the dropdown when it clicks in the first separator', async () => {
      expect(
        wrapper.findComponent(SbBreadcrumbDropdown).find('.sb-breadcrumbs__dropdown').exists()
      ).toBe(false)

      await wrapper.vm.toggleDropdown()

      expect(
        wrapper.findComponent(SbBreadcrumbDropdown).find('.sb-breadcrumbs__dropdown').exists()
      ).toBe(true)

      await wrapper.vm.toggleDropdown()

      expect(
        wrapper.findComponent(SbBreadcrumbDropdown).find('.sb-breadcrumbs__dropdown').exists()
      ).toBe(false)
    })
  })

  describe('when render a large section', () => {
    const wrapper = factory({
      items: [
        ...defaultBreadcrumbItems.slice(0, 2),
        defaultLastItem
      ],
      isLargeSection: true
    })

    it('should the container contains a class with --large-section modifier', () => {
      expect(wrapper.attributes('class')).toBe('sb-breadcrumbs sb-breadcrumbs--large-section')
    })
  })
})
