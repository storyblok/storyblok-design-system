import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import Maska from 'maska'

import SbDatepicker from '../Datepicker.vue'
import SbDatepickerData, { WithTzOffset } from '../Datepicker.stories'

import { INTERNAL_VIEWS } from '../utils'

describe('SbDatepicker component', () => {
  const factory = (props) => {
    return mount(SbDatepicker, {
      props,
      plugins: [Maska],
    })
  }
  const { placeholder, timeZone, type, modelValue, hourFormat } =
    SbDatepickerData.args

  const wrapper = factory({
    placeholder,
    timeZone,
    type,
    modelValue,
    hourFormat,
  })

  describe('test datepicker I/Os', () => {
    it('should transform the date correctly', () => {
      wrapper.vm.handleDoneAction()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([
        '2021-12-02 00:00',
      ])
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
        wrapper.vm.internalVisualization === INTERNAL_VIEWS.calendar,
      ).toBeTruthy()
    })
  })

  describe('test flows', () => {
    it('Should subtract a month', () => {
      const currentDate = dayjs(wrapper.vm.internalDate)
      wrapper.vm.handlePreviousMonth()
      const after = dayjs(wrapper.vm.internalDate)

      expect(
        currentDate.subtract(1, 'month').month() === after.month(),
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
      modelValue: '2017-09-09',
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

      expect(document.querySelector('[role="tooltip"]')).toBeNull()
    })
  })

  describe('Inline label', () => {
    it('should render the inline label if present', () => {
      const wrapper = factory({
        inlineLabel: 'Inline label',
      })

      expect(wrapper.find('.sb-textfield__inner-label').text()).toBe(
        'Inline label',
      )
    })

    it('should not render the inline label by default', () => {
      const wrapper = factory()

      expect(wrapper.find('.sb-textfield__inner-label').exists()).toBe(false)
    })
  })
})
