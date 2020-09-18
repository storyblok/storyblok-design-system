import { mount } from '@vue/test-utils'

import SbPagination from '..'

const factory = propsData => {
  return mount(SbPagination, {
    propsData
  })
}

describe('SbPagination component', () => {
  describe('when use the SbPagination with intial data', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 10
    })

    it('should have a per page select information with correct state', () => {
      expect(
        wrapper.find('[data-testid="per-page-select"]').element.value
      ).toBe('10')
    })

    it('should have a page select information with correct state', () => {
      expect(
        wrapper.find('[data-testid="page-select"]').element.value
      ).toBe('1')
    })

    it('should have the previous button disabled', () => {
      expect(
        wrapper.find('[data-testid="pagination-previous-button"]').element.disabled
      ).toBe(true)
    })

    it('should have a text showing how many pages are', () => {
      expect(
        wrapper.find('[data-testid="pagination-pages-information"]').text()
      ).toBe('of 10 pages')
    })

    it('should have a text showing the current pagination items', () => {
      expect(
        wrapper.find('[data-testid="pagination-items-information"]').text()
      ).toBe('1-10 of 100 items')
    })
  })

  describe('when pass a specific page property', () => {
    const wrapper = factory({
      value: 3,
      total: 100,
      perPage: 10
    })

    it('should have the page select with this specific page', () => {
      expect(
        wrapper.find('[data-testid="page-select"]').element.value
      ).toBe('3')
    })

    it('should not have the previous and next buttons disabled', () => {
      expect(
        wrapper.find('[data-testid="pagination-previous-button"]').element.disabled
      ).toBe(false)

      expect(
        wrapper.find('[data-testid="pagination-next-button"]').element.disabled
      ).toBe(false)
    })

    it('should have the correct text showing the current page items', () => {
      expect(
        wrapper.find('[data-testid="pagination-items-information"]').text()
      ).toBe('21-30 of 100 items')
    })
  })

  describe('when it is the last page', () => {
    const wrapper = factory({
      value: 4,
      total: 100,
      perPage: 30
    })

    it('should have the page select with this specific page', () => {
      expect(
        wrapper.find('[data-testid="page-select"]').element.value
      ).toBe('4')
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
      perPage: 20
    })

    it('should have the per page select with this specific value', () => {
      expect(
        wrapper.find('[data-testid="per-page-select"]').element.value
      ).toBe('20')
    })

    it('should have the correct text with how many pages information', () => {
      expect(
        wrapper.find('[data-testid="pagination-pages-information"]').text()
      ).toBe('of 5 pages')
    })
  })

  describe('when changes the perPage by using the select', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 10
    })

    beforeEach(async () => {
      await wrapper.find('[data-testid="per-page-select"]').setValue(20)

      await wrapper.vm.$nextTick()
    })

    it('should emit the per-page-change event with the value select', () => {
      // getting the first result from first emit
      expect(wrapper.emitted('per-page-change')[0][0]).toBe(20)
    })

    it('should update the text with how many pages information', async () => {
      await wrapper.setProps({
        perPage: 20
      })
      expect(
        wrapper.find('[data-testid="pagination-pages-information"]').text()
      ).toBe('of 5 pages')
    })
  })

  describe('when changes the page by using the select', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 10
    })

    beforeEach(async () => {
      await wrapper.find('[data-testid="page-select"]').setValue(4)

      await wrapper.vm.$nextTick()
    })

    it('should emit the input event with the value selected', () => {
      expect(wrapper.emitted('input')[0][0]).toBe(4)
    })
  })

  describe('when changes the page by using the buttons', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 10
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
        value: 5
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
      customPerPageOptions: [5, 15, 30]
    })

    it('should have three options with respective values', () => {
      const options = wrapper.findAll('[data-testid="per-page-select"] option')
      expect(options.length).toBe(3)
      expect(options.at(0).element.value).toBe('5')
      expect(options.at(1).element.value).toBe('15')
      expect(options.at(2).element.value).toBe('30')
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
      perPage: 10,
      isFullWidth: true
    })

    it('should add the --full-width modifier class', () => {
      expect(wrapper.classes('sb-pagination--full-width')).toBe(true)
    })
  })

  describe('with compact property', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 10,
      compact: true
    })

    it('should add the --compact modifier class', () => {
      expect(wrapper.classes('sb-pagination--compact')).toBe(true)
    })

    it('should have a text with pages information', () => {
      expect(
        wrapper.find('[data-testid="pagination-pages-information"]').text()
      ).toBe('1 of 10 pages')
    })
  })

  describe('with carousel property', () => {
    const wrapper = factory({
      value: 1,
      total: 100,
      perPage: 10,
      carousel: true
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
