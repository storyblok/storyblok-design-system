import { mount } from '@vue/test-utils'

import SbDatepicker from '../Datepicker.vue'
import SbDatepickerData from '../Datepicker.stories'

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

  fdescribe('Test component calendar methods', () => {
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
  })
})
