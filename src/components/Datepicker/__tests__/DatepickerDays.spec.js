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
})
