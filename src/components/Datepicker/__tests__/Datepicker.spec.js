import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'

import SbDatepicker from '../Datepicker.vue'
import SbDatepickerData, { WithTzOffset } from '../Datepicker.stories'

import { INTERNAL_VIEWS } from '../utils'
const localVue = global.localVue

describe('SbDatepicker component', () => {
  const factory = (props) => {
    return mount(SbDatepicker, {
      props,
      localVue,
    })
  }
  const { placeholder } = SbDatepickerData.args
  const { timeZone } = SbDatepickerData.args
  const { type } = SbDatepickerData.args
  const { value } = SbDatepickerData.args
  const wrapper = factory({
    placeholder,
    timeZone,
    type,
    value,
  })

  describe('test datepicker I/Os', () => {
    it('should transform the date correctly', () => {
      wrapper.vm.handleDoneAction()
      expect(wrapper.emitted().input[0]).toEqual(['2021-12-02 00:00'])
      expect(wrapper.vm.internalValue).toEqual('2021-12-01 19:00')
    })
  })

  describe('test visuals', () => {
    it('Should render overlay property visible', () => {
      wrapper.vm.handleInputClick()
      expect(wrapper.vm.isOverlayVisible).toBeTruthy()
    })

    it('Should render overlay property not visible, direct shut', () => {
      wrapper.vm.closeOverlay()
      expect(wrapper.vm.isOverlayVisible).toBeFalsy()
    })

    it('Should change internal visualization property based on type', () => {
      wrapper.vm.handleInputClick()
      expect(
        wrapper.vm.internalVisualization === INTERNAL_VIEWS.CALENDAR
      ).toBeTruthy()
    })
  })

  describe('test flows', () => {
    it('Should subtract a month', () => {
      const currentDate = dayjs(wrapper.vm.internalDate)
      wrapper.vm.handlePreviousMonth()
      const after = dayjs(wrapper.vm.internalDate)

      expect(
        currentDate.subtract(1, 'month').month() === after.month()
      ).toBeTruthy()
    })
    it('Should add a month', () => {
      const currentDate = dayjs(wrapper.vm.internalDate)
      wrapper.vm.handleNextMonth()
      const after = dayjs(wrapper.vm.internalDate)

      expect(currentDate.add(1, 'month').month() === after.month()).toBeTruthy()
    })
  })

  describe('Test timezone tooltip', () => {
    const wrapper = factory({
      ...SbDatepickerData.args,
      ...WithTzOffset.args,
      value: '2017-09-09',
    })

    it('Should exist the tooltip with correct label', async () => {
      await wrapper.find('.sb-datepicker__timezone').trigger('mouseover')

      const tooltip = document.querySelector('[role="tooltip"]')

      expect(tooltip.innerText).toBe(WithTzOffset.args.tzTooltip)
    })

    it('Should not exist the tooltip when the tzTooltip property is empty', async () => {
      await wrapper.setProps({
        tzTooltip: null,
      })

      expect(document.querySelector('[role="tooltip"]')).toBe(null)
    })
  })
})
