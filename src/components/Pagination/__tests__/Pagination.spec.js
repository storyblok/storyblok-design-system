import { mount } from '@vue/test-utils'

import SbPagination from '..'
import { SbSelect } from '../../index'

const factory = (propsData) => {
  return mount(SbPagination, {
    propsData,
  })
}

describe('SbPagination component', () => {
  describe('when use the SbPagination with intial data', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 25,
    })

    it('should have a per page select information with correct state', () => {
      expect(wrapper.findComponent(SbSelect).props().label).toBe('25')
    })

    it('should have a page select information with correct state', () => {
      expect(wrapper.findAllComponents(SbSelect).at(1).props().label).toBe('1')
    })

    it('should have the previous button disabled', () => {
      expect(
        wrapper.find('[data-testid="pagination-previous-button"]').element
          .disabled
      ).toBe(true)
    })

    it('should have a text showing how many pages are', () => {
      expect(
        wrapper.find('[data-testid="pagination-pages-information"]').text()
      ).toBe('of 4 pages')
    })

    it('should have a text showing the current pagination items', () => {
      expect(
        wrapper.find('[data-testid="pagination-items-information"]').text()
      ).toBe('1-25 of 100 items')
    })
  })

  describe('when pass a specific page property', () => {
    const wrapper = factory({
      value: 3,
      total: 100,
      perPage: 25,
    })

    it('should have the page select with this specific page', () => {
      expect(wrapper.findAllComponents(SbSelect).at(1).props().label).toBe('3')
    })

    it('should not have the previous and next buttons disabled', () => {
      expect(
        wrapper.find('[data-testid="pagination-previous-button"]').element
          .disabled
      ).toBe(false)

      expect(
        wrapper.find('[data-testid="pagination-next-button"]').element.disabled
      ).toBe(false)
    })

    it('should have the correct text showing the current page items', () => {
      expect(
        wrapper.find('[data-testid="pagination-items-information"]').text()
      ).toBe('51-75 of 100 items')
    })
  })

  describe('when it is the last page', () => {
    const wrapper = factory({
      value: 4,
      total: 100,
      perPage: 30,
    })

    it('should have the page select with this specific page', () => {
      expect(wrapper.findAllComponents(SbSelect).at(1).props().label).toBe('4')
    })

    it('should have the next button disabled', () => {
      expect(
        wrapper.find('[data-testid="pagination-next-button"]').element.disabled
      ).toBe(true)
    })

    it('should have the text showing the residual last items', () => {
      expect(
        wrapper.find('[data-testid="pagination-items-information"]').text()
      ).toBe('91-100 of 100 items')
    })
  })

  describe('when pass a specific perPage property', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 50,
    })

    it('should have the per page select with this specific value', () => {
      expect(wrapper.findComponent(SbSelect).props().label).toBe('50')
    })

    it('should have the correct text with how many pages information', () => {
      expect(
        wrapper.find('[data-testid="pagination-pages-information"]').text()
      ).toBe('of 2 pages')
    })
  })

  describe('when changes the perPage by using the select', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 25,
    })

    it('should emit the per-page-change event with the value select', async () => {
      await wrapper.setProps({ value: 50 })
      await wrapper.vm.$nextTick()

      expect(wrapper.findAllComponents(SbSelect).at(1).props().label).toBe('50')
    })

    it('should update the text with how many pages information', async () => {
      await wrapper.setProps({
        perPage: 50,
      })
      expect(
        wrapper.find('[data-testid="pagination-pages-information"]').text()
      ).toBe('of 2 pages')
    })
  })

  describe('when changes the page by using the select', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 25,
    })

    it('should emit the input event with the value selected', async () => {
      await wrapper.setProps({ value: 4 })
      await wrapper.vm.$nextTick()

      expect(wrapper.findAllComponents(SbSelect).at(1).props().label).toBe('4')
    })
  })

  describe('when changes the page by using the buttons', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 25,
    })

    it('should emit the input event when next button is clicked', async () => {
      await wrapper
        .find('[data-testid="pagination-next-button"]')
        .trigger('click')

      await wrapper.vm.$nextTick()

      // get the input event result (the result is: [[2]])
      expect(wrapper.emitted('input')[0][0]).toBe(2)
    })

    it('should emit the input event when previous button is clicked', async () => {
      // setting the value manually to the previous button is not disable
      await wrapper.setProps({
        value: 5,
      })

      await wrapper
        .find('[data-testid="pagination-previous-button"]')
        .trigger('click')

      await wrapper.vm.$nextTick()

      // get the input event result (the result is: [[2]])
      expect(wrapper.emitted('input')[0][0]).toBe(2)
    })
  })

  describe('when pass the customPerPageOptions property', () => {
    const wrapper = factory({
      value: 1,
      total: 60,
      perPage: 5,
      customPerPageOptions: [5, 15, 30],
    })

    it('should have three options with respective values', () => {
      const options = wrapper.findComponent(SbSelect).props().options

      expect(options.length).toBe(3)

      expect(options).toEqual([
        { value: 5, label: '5', ariaLabel: 'Select per page 5 items' },
        { value: 15, label: '15', ariaLabel: 'Select per page 15 items' },
        { value: 30, label: '30', ariaLabel: 'Select per page 30 items' },
      ])
    })

    it('should have the text showing pagination items information', () => {
      expect(
        wrapper.find('[data-testid="pagination-items-information"]').text()
      ).toBe('1-5 of 60 items')
    })
  })

  describe('with isFullWidth property', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 25,
      isFullWidth: true,
    })

    it('should add the --full-width modifier class', () => {
      expect(wrapper.classes('sb-pagination--full-width')).toBe(true)
    })
  })

  describe('with compact property', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 25,
      compact: true,
    })

    it('should add the --compact modifier class', () => {
      expect(wrapper.classes('sb-pagination--compact')).toBe(true)
    })

    it('should have a text with pages information', () => {
      expect(
        wrapper.find('[data-testid="pagination-pages-information"]').text()
      ).toBe('1 of 4 pages')
    })
  })

  describe('with carousel property', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 25,
      carousel: true,
    })

    it('should add the --carousel modifier class', () => {
      expect(wrapper.classes('sb-pagination--carousel')).toBe(true)
    })

    it('should have a role navigation', () => {
      expect(wrapper.find('[role="navigation"]').exists()).toBe(true)
    })

    it('should have a one element with aria-current=true', () => {
      expect(wrapper.findAll('[aria-current="true"]').length).toBe(1)
    })

    it('should emit the page when click a dot button', async () => {
      const dotButtons = wrapper.findAll('nav button')
      const thirdPageDot = dotButtons.at(2)

      await thirdPageDot.trigger('click')

      expect(wrapper.emitted('input')[0][0]).toBe(3)
    })
  })
})
