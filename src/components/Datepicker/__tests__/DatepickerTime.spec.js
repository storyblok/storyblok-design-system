import { shallowMount } from '@vue/test-utils'

import SbDatepickerTime from '../components/DatepickerTime.vue'

describe('SbDatepickerTime component', () => {
  describe('Test component method to handle the TIME', () => {
    it('Should make a direct call method on click in HOURS', async () => {
      const handleHourClick = jest.spyOn(
        SbDatepickerTime.methods,
        'handleHourClick'
      )
      await shallowMount(SbDatepickerTime).find('.hours').trigger('click')
      expect(handleHourClick).toHaveBeenCalled()
    })
    it('Should make a direct call method on click in MINUTES', async () => {
      const handleMinuteClick = jest.spyOn(
        SbDatepickerTime.methods,
        'handleMinuteClick'
      )
      await shallowMount(SbDatepickerTime).find('.minutes').trigger('click')
      expect(handleMinuteClick).toHaveBeenCalled()
    })
    it('Should make an indirect call method on click', async () => {
      const processInput = jest.spyOn(
        SbDatepickerTime.methods,
        '$_processInput'
      )
      await shallowMount(SbDatepickerTime)
        .find('.sb-datepicker-time__number')
        .trigger('click')
      expect(processInput).toHaveBeenCalled()
    })
  })
})
