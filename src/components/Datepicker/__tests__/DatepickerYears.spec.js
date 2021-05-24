import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'

import SbDatepickerYears from '../components/DatepickerYears.vue'

describe('SbDatepickerYears component', () => {
  const wrapper = mount(SbDatepickerYears)

  describe('Test component method to handle the MONTHS', () => {
    it('Should emit date for input on click', async () => {
      const internalDate = dayjs().format()
      await wrapper.setProps({ internalDate })
      await wrapper.find('.sb-datepicker-years__item').trigger('click')
      expect(wrapper.emitted().input[0].length).toBe(1)
    })
  })
})
