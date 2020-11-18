import { mount } from '@vue/test-utils'

import SbDatepicker from '../Datepicker.vue'
import SbDatepickerData from '../Datepicker.stories'

import { INTERNAL_VIEWS } from '../utils'

describe('SbDatepicker component', () => {
  const factory = (propsData) => {
    return mount(SbDatepicker, {
      propsData,
    })
  }
  const { placeholder } = SbDatepickerData.args
  const { value } = SbDatepickerData.args
  const wrapper = factory({
    placeholder,
    value,
  })

  describe('Test component props', () => {
    it('Should match placeholder text', () => {
      expect(wrapper.props().placeholder).toBe(placeholder)
    })
    it('Should match value prop default value', () => {
      expect(wrapper.props().value).toBe(value)
    })
  })

  describe('Test component properties', () => {
    it('Should render overlay property visible', () => {
      wrapper.vm.handleInputClick()
      expect(wrapper.vm.isOverlayVisible).toBeTruthy()
    })
    it('Should render overlay property not visible, direct shut', () => {
      wrapper.vm.closeOverlay()
      expect(wrapper.vm.isOverlayVisible).toBeFalsy()
    })
    it('Should render overlay property not visible, indirect shut', () => {
      wrapper.vm.handleCancelAction()
      expect(wrapper.vm.isOverlayVisible).toBeFalsy()
    })
  })

  describe('Test component calendar methods', () => {
    it('Should subtract a month', () => {
      const before = new Date(wrapper.vm.internalDate)
      wrapper.vm.handlePreviousMonth()
      const after = new Date(wrapper.vm.internalDate)
      expect(before.getMonth() - after.getMonth()).toEqual(1)
    })
    it('Should add a month', () => {
      const before = new Date(wrapper.vm.internalDate)
      wrapper.vm.handleNextMonth()
      const after = new Date(wrapper.vm.internalDate)
      expect(after.getMonth() === before.getMonth() + 1).toBeTruthy()
    })
    it('Should match view type month', () => {
      wrapper.vm.handleChangeMonth()
      expect(
        wrapper.vm.internalVisualization === INTERNAL_VIEWS.MONTH
      ).toBeTruthy()
    })
    it('Should match view type year', () => {
      wrapper.vm.handleChangeYear()
      expect(
        wrapper.vm.internalVisualization === INTERNAL_VIEWS.YEAR
      ).toBeTruthy()
    })
    const date = new Date()
    it('Should match internal visualization with TIME type', () => {
      wrapper.vm.internalVisualization = INTERNAL_VIEWS.CALENDAR
      wrapper.vm.handleComponentsInput(`${date}`)
      expect(
        wrapper.vm.internalVisualization === INTERNAL_VIEWS.TIME
      ).toBeTruthy()
    })
    it('Should match internal visualization with CALENDAR type', () => {
      wrapper.vm.internalVisualization = INTERNAL_VIEWS.MONTH
      wrapper.vm.handleComponentsInput(`${date}`)
      expect(
        wrapper.vm.internalVisualization === INTERNAL_VIEWS.CALENDAR
      ).toBeTruthy()
    })
    it('Should match internal visualization with MONTH type', () => {
      wrapper.vm.internalVisualization = INTERNAL_VIEWS.YEAR
      wrapper.vm.handleComponentsInput(`${date}`)
      expect(
        wrapper.vm.internalVisualization === INTERNAL_VIEWS.MONTH
      ).toBeTruthy()
    })
  })
})
