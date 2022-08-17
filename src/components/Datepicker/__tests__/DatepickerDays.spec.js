import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'

import SbDatepickerDays from '../components/DatepickerDays.vue'

describe('SbDatepickerDays component', () => {
  const wrapper = mount(SbDatepickerDays)

  describe('Test component method to handle the DAYS', () => {
    it('Should emit date for input on click', async () => {
      const internalDate = dayjs().format()
      await wrapper.setProps({ internalDate })
      await wrapper.find('.sb-datepicker-days__item').trigger('click')
      expect(wrapper.emitted().input[0].length).toBe(1)
    })
  })

  describe('Test class date', () => {
    it('Should include the `sb-datepicker-days__item--current` class in the current day', async () => {
      const internalDate = dayjs().add(3, 'day').format()
      await wrapper.setProps({ internalDate })
      expect(wrapper.find('.sb-datepicker-days__item--current')).toBeTruthy()
    })

    it('Should include the `sb-datepicker-days__item--active` class in the active day', async () => {
      const internalDate = dayjs().format()
      await wrapper.setProps({ internalDate })
      expect(wrapper.find('.sb-datepicker-days__item--active')).toBeTruthy()
    })

    it('Should include the `sb-datepicker-days item--disabled` class when maxDate or minDate is passed', async () => {
      const minDate =   dayjs().add(3, 'day').format()
      const maxDate =  dayjs().subtract(3, 'day').format()
      await wrapper.setProps({ minDate, maxDate })

      expect(wrapper.find('.sb-datepicker-days__item--disabled')).toBeTruthy()
    })

    it('Should include the `sb-datepicker-days__item--disabled` class when disabledPast is true', async () => {
      const disabledPast =  true
      await wrapper.setProps({ disabledPast })

      expect(wrapper.find('.sb-datepicker-days__item--disabled')).toBeTruthy()
    })
  })
})
