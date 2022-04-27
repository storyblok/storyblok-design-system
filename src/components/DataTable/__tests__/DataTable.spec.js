import { mount } from '@vue/test-utils'

import { SbDataTable } from '..'

import {
  SbDataTableActions,
  SbDataTableBody,
  SbDataTableHeader,
} from '../components'

import SbCheckbox from '../../Checkbox'
import SbLoading from '../../Loading'

import {
  defaultTableHeadersData,
  defaultTableItemsData,
} from '../DataTable.stories'

const factory = (propsData) => {
  return mount(SbDataTable, {
    propsData,
  })
}

describe('SbDataTable component', () => {
  describe('when in default behavior', () => {
    const wrapper = factory({
      headers: [...defaultTableHeadersData],
      items: [...defaultTableItemsData],
    })

    it('should render a table', () => {
      expect(wrapper.find('table').exists()).toBe(true)
    })

    it('should render the SbDataTableHeader component and 1 row', () => {
      const wrapperSbDataTableHeader = wrapper.findComponent(SbDataTableHeader)
      expect(wrapperSbDataTableHeader.exists()).toBe(true)
      expect(wrapperSbDataTableHeader.findAll('tr').length).toBe(1)
    })

    it('should render the SbDataTableBody component and 5 rows', () => {
      const wrapperSbDataTableBody = wrapper.findComponent(SbDataTableBody)
      expect(wrapperSbDataTableBody.exists()).toBe(true)
      expect(wrapperSbDataTableBody.findAll('.sb-data-table__row').length).toBe(
        5
      )
    })

    it('should not render the SbDataTableActions component', () => {
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)
    })
  })

  describe('when single selection is enabled', () => {
    const wrapper = factory({
      allowSelection: true,
      headers: [...defaultTableHeadersData],
      items: [...defaultTableItemsData],
    })

    const wrapperSbDataTableBody = wrapper.findComponent(SbDataTableBody)
    const wrapperSbDataTableHeader = wrapper.findComponent(SbDataTableHeader)

    it('should not render the SbDataTableActions component yet', () => {
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)
    })

    it('should not render any checkbox in table header', () => {
      expect(
        wrapperSbDataTableHeader.findAll('.sb-checkbox__native').length
      ).toBe(0)
    })

    it('should render 5 checkboxes in table body', () => {
      expect(
        wrapperSbDataTableBody.findAll('.sb-checkbox__native').length
      ).toBe(5)
    })

    it('should toggle the color of the checkbox and toggle the background color of the row itself', async () => {
      const row = wrapperSbDataTableBody.findAll('.sb-data-table__row').at(2)
      const checkbox = wrapperSbDataTableBody.findAll('.sb-checkbox').at(2)

      // should actions menu is not visible
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)

      // when clicks the checkbox
      await checkbox.trigger('click')
      await wrapper.vm.$nextTick()

      // should checkbox status is checked
      expect(row.findComponent(SbCheckbox).props('value')).toBe(true)

      // should add class to selected row
      expect(row.classes('sb-data-table__row--selected')).toBe(true)

      // should actions menu is visible
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(true)

      // should show 1 item selected in actions menu
      expect(
        wrapper
          .findComponent(SbDataTableActions)
          .find('.sb-actions-menu__rows-selected')
          .text()
      ).toBe('1 item selected')

      // when clicks the same checkbox again
      await checkbox.trigger('click')
      await wrapper.vm.$nextTick()

      // should checkbox status is unchecked
      expect(
        row.find('.sb-checkbox__inner').classes('sb-checkbox__inner--truthy')
      ).toBe(false)

      // should remove class to selected row
      expect(row.classes('sb-data-table__row--selected')).toBe(false)

      // should actions menu is invisible
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)
    })
  })

  describe('when multiple selection is enabled', () => {
    const wrapper = factory({
      allowSelection: true,
      selectionMode: 'multiple',
      headers: [...defaultTableHeadersData],
      items: [...defaultTableItemsData],
    })

    const wrapperSbDataTableBody = wrapper.findComponent(SbDataTableBody)
    const wrapperSbDataTableHeader = wrapper.findComponent(SbDataTableHeader)

    it('should not render the SbDataTableActions component yet', () => {
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)
    })

    it('should render 1 checkbox in table header', () => {
      expect(
        wrapperSbDataTableHeader.findAll('.sb-checkbox__native').length
      ).toBe(1)
    })

    it('should render 5 checkboxes in table body', () => {
      expect(
        wrapperSbDataTableBody.findAll('.sb-checkbox__native').length
      ).toBe(5)
    })

    it('should toggle the color of each checkbox and toggle the background color of each row itself', async () => {
      const row = wrapperSbDataTableBody.findAll('.sb-data-table__row').at(2)
      const row2 = wrapperSbDataTableBody.findAll('.sb-data-table__row').at(3)
      const checkbox = wrapperSbDataTableBody.findAll('.sb-checkbox').at(2)
      const checkbox2 = wrapperSbDataTableBody.findAll('.sb-checkbox').at(3)

      // should actions menu is not visible
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)

      // when clicks the checkboxes
      await checkbox.trigger('click')
      await checkbox2.trigger('click')
      await wrapper.vm.$nextTick()

      // should checkboxes status are checked
      expect(row.findComponent(SbCheckbox).props('value')).toBe(true)
      expect(row2.findComponent(SbCheckbox).props('value')).toBe(true)

      // should add class to selected rows
      expect(row.classes('sb-data-table__row--selected')).toBe(true)
      expect(row2.classes('sb-data-table__row--selected')).toBe(true)

      // should actions menu is visible
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(true)

      // should show 2 items selected in actions menu
      expect(
        wrapper
          .findComponent(SbDataTableActions)
          .find('.sb-actions-menu__rows-selected')
          .text()
      ).toBe('2 items selected')

      // when clicks the first row again
      await checkbox.trigger('click')
      await wrapper.vm.$nextTick()

      // should checkbox status is unchecked
      expect(row.findComponent(SbCheckbox).props('value')).toBe(false)

      // should remove class to selected row
      expect(row.classes('sb-data-table__row--selected')).toBe(false)

      // should show 1 item selected in actions menu
      expect(
        wrapper
          .findComponent(SbDataTableActions)
          .find('.sb-actions-menu__rows-selected')
          .text()
      ).toBe('1 item selected')

      // when clicks the second row again
      await checkbox2.trigger('click')
      await wrapper.vm.$nextTick()

      // should checkbox status is unchecked
      expect(row2.findComponent(SbCheckbox).props('value')).toBe(false)

      // should remove class to selected row
      expect(row2.classes('sb-data-table__row--selected')).toBe(false)

      // should actions menu is invisible
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)
    })
  })

  describe('when column selection is enabled', () => {
    const wrapper = factory({
      allowSelection: true,
      selectionMode: 'multiple',
      headers: [...defaultTableHeadersData],
      items: [...defaultTableItemsData],
    })

    const wrapperSbDataTableBody = wrapper.findComponent(SbDataTableBody)
    const wrapperSbDataTableHeader = wrapper.findComponent(SbDataTableHeader)

    it('should not render the SbDataTableActions component yet', () => {
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)
    })

    it('should render 1 checkbox in table header', () => {
      expect(
        wrapperSbDataTableHeader.findAll('.sb-checkbox__native').length
      ).toBe(1)
    })

    it('should render 5 checkboxes in table body', () => {
      expect(
        wrapperSbDataTableBody.findAll('.sb-checkbox__native').length
      ).toBe(5)
    })

    it('should toggle the color of all checkboxes and toggle the background color of all rows itself', async () => {
      const selector = wrapperSbDataTableHeader.findComponent(SbCheckbox)
      const rows = wrapperSbDataTableBody.findAll('.sb-data-table__row')

      // should actions menu is not visible
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)

      // when clicks the column selector
      await selector.trigger('click')
      await wrapper.vm.$nextTick()

      // should all checkboxes status are checked
      rows.wrappers.forEach((wrapper) => {
        expect(wrapper.findComponent(SbCheckbox).props('value')).toBe(true)
      })

      // should add class to all rows
      rows.wrappers.forEach((wrapper) => {
        expect(wrapper.classes('sb-data-table__row--selected')).toBe(true)
      })

      // should actions menu is visible
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(true)

      // should show 5 items selected in actions menu
      expect(
        wrapper
          .findComponent(SbDataTableActions)
          .find('.sb-actions-menu__rows-selected')
          .text()
      ).toBe('5 items selected')

      // when clicks the first row again
      await selector.trigger('click')
      await wrapper.vm.$nextTick()

      // should checkbox status is unchecked
      rows.wrappers.forEach((wrapper) => {
        expect(
          wrapper
            .find('.sb-checkbox__inner')
            .classes('sb-checkbox__inner--truthy')
        ).toBe(false)
      })

      // should remove class to selected row
      rows.wrappers.forEach((wrapper) => {
        expect(wrapper.classes('sb-data-table__row--selected')).toBe(false)
      })

      // should actions menu is invisible
      expect(wrapper.findComponent(SbDataTableActions).exists()).toBe(false)
    })
  })

  describe('with hideHeader property', () => {
    const wrapper = factory({
      hideHeader: true,
      headers: [...defaultTableHeadersData],
      items: [...defaultTableItemsData],
    })

    it('should not render the SbDataTableHeader component', () => {
      expect(wrapper.findComponent(SbDataTableHeader).exists()).toBe(false)
    })
  })

  describe('with isLoading property', () => {
    const wrapper = factory({
      isLoading: true,
      headers: [...defaultTableHeadersData],
      items: [...defaultTableItemsData],
    })

    it('should add the --loading modifier class', () => {
      expect(wrapper.classes('sb-data-table--loading')).toBe(true)
    })
  })

  describe('with striped property', () => {
    const wrapper = factory({
      striped: true,
      headers: [...defaultTableHeadersData],
      items: [...defaultTableItemsData],
    })

    it('should add the --striped modifier class', () => {
      expect(wrapper.classes('sb-data-table--striped')).toBe(true)
    })
  })

  describe('when sorting column', () => {
    const wrapper = factory({
      headers: [...defaultTableHeadersData],
      items: [...defaultTableItemsData],
    })

    const wrapperSbDataTableHeader = wrapper.findComponent(SbDataTableHeader)
    const wrapperSbDataTableBody = wrapper.findComponent(SbDataTableBody)

    it('should change the rows order', async () => {
      const cell = wrapperSbDataTableHeader
        .findAll('.sb-data-table__head-cell')
        .at(0)
      const row = wrapperSbDataTableBody
        .findAll('.sb-data-table__row')
        .at(0)
        .findAll('.sb-data-table__body-cell')
        .at(0)

      // should have text 'Frozen Yogurt'
      expect(row.text()).toBe('Frozen Yogurt')

      // when clicks the column selector
      await cell.trigger('click')
      await wrapper.vm.$nextTick()

      // should show sort icon
      expect(cell.classes('sb-data-table--show-icon')).toBe(true)

      // should have text 'Cupcake'
      expect(row.text()).toBe('Cupcake')

      // when clicks the column selector again
      await cell.trigger('click')
      await wrapper.vm.$nextTick()

      // should show sort icon
      expect(cell.classes('sb-data-table--show-icon')).toBe(true)

      // should have text 'Ice cream sandwich'
      expect(row.text()).toBe('Ice cream sandwich')

      // when clicks the column selector again
      await cell.trigger('click')
      await wrapper.vm.$nextTick()

      // should hide sort icon
      expect(cell.classes('sb-data-table--show-icon')).toBe(false)

      // should have text 'Frozen Yogurt'
      expect(row.text()).toBe('Frozen Yogurt')
    })
  })
})
