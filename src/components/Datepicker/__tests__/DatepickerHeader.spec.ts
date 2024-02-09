import { mount } from '@vue/test-utils'

import SbDatepickerHeader from '../components/DatepickerHeader.vue'

describe('SbDatepickerHeader component', () => {
  const wrapper = mount(SbDatepickerHeader)

  describe('Test component methods to handle the HEADER', () => {
    it('Should emit event on click PREVIOUS', async () => {
      wrapper.vm.handlePreviousClick()
      expect(wrapper.emitted()['previous-month']).toBeTruthy()
    })
    it('Should emit event on click NEXT', async () => {
      wrapper.vm.handleNextClick()
      expect(wrapper.emitted()['next-month']).toBeTruthy()
    })
    it('Should emit event on click CURRENT MONTH', async () => {
      await wrapper.setProps({ isCalendarView: true })
      await wrapper.find('[data-testid="span-current-month"]').trigger('click')
      expect(wrapper.emitted()['change-month']).toBeTruthy()
    })
    it('Should emit event on click CURRENT YEAR', async () => {
      await wrapper.setProps({ isCalendarView: true })
      await wrapper.find('[data-testid="span-current-year"]').trigger('click')
      expect(wrapper.emitted()['change-year']).toBeTruthy()
    })
  })
})
