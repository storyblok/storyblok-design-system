import { mountAttachingComponent, waitMs } from '../../../utils/tests-utils'

import SbDatepickerTime from '../components/DatepickerTime.vue'
import { SbSelect } from '../../index'

import { TIMEZONES_LIST } from '../../../utils'

const INTERNAL_DATE = '2021-12-02 00:00'

describe('SbDatepickerTime component', () => {
  const defaultComponentMounted = mountAttachingComponent(SbDatepickerTime, {
    props: {
      internalDate: INTERNAL_DATE,
      minuteRange: 1,
      timezone: null,
    },
  })
  const hourSelect = defaultComponentMounted.findAllComponents(SbSelect)[0]
  const minuteSelect = defaultComponentMounted.findAllComponents(SbSelect)[1]
  const timezoneSelect = defaultComponentMounted.findAllComponents(SbSelect)[2]

  it('should mount the component correctly', () => {
    expect(defaultComponentMounted.classes('sb-datepicker-time')).toBe(true)
    expect(
      defaultComponentMounted.find('.sb-datepicker-time__title').exists()
    ).toBeTruthy()
    expect(hourSelect.props().modelValue).toBe(0)
    expect(minuteSelect.props().modelValue).toBe(0)
  })

  it('should change hour and minutes correctly', async () => {
    const hourToSelect = 5
    const minuteToSelect = 10

    hourSelect.trigger('click')

    defaultComponentMounted
      .find(`[data-testid="hours-select-list-item__${hourToSelect}"]`)
      .trigger('click')

    await waitMs(100)

    expect(defaultComponentMounted.vm.internalHour).toEqual(hourToSelect)
    expect(defaultComponentMounted.emitted('update:modelValue')[0].length).toBe(
      1
    )

    await waitMs(100)

    minuteSelect.trigger('click')

    defaultComponentMounted
      .find(`[data-testid="minutes-select-list-item__${minuteToSelect}"]`)
      .trigger('click')

    expect(defaultComponentMounted.vm.internalMinutes).toEqual(minuteToSelect)
    expect(defaultComponentMounted.emitted('update:modelValue')[0].length).toBe(
      1
    )
  })

  it('should open and change the timezone', async () => {
    const HawaiiTimeZone = TIMEZONES_LIST[3]

    timezoneSelect.trigger('click')

    defaultComponentMounted
      .find(`[title="${HawaiiTimeZone.label}"]`)
      .trigger('click')

    expect(defaultComponentMounted.emitted('input-timezone')[0]).toEqual([
      HawaiiTimeZone,
    ])
  describe('Test component method to handle the TIME', () => {
    it('Should make a direct call method on click in HOURS', async () => {
      const handleHourClick = vi.spyOn(
        SbDatepickerTime.methods,
        'handleHourClick',
      )
      await shallowMount(SbDatepickerTime)
        .find('[data-testid="div-hours"]')
        .trigger('click')
      expect(handleHourClick).toHaveBeenCalled()
    })
    it('Should make a direct call method on click in MINUTES', async () => {
      const handleMinuteClick = vi.spyOn(
        SbDatepickerTime.methods,
        'handleMinuteClick',
      )
      await shallowMount(SbDatepickerTime)
        .find('[data-testid="div-minutes"]')
        .trigger('click')
      expect(handleMinuteClick).toHaveBeenCalled()
    })
    it('Should make an indirect call method on click', async () => {
      const processInput = vi.spyOn(SbDatepickerTime.methods, '$_processInput')
      await shallowMount(SbDatepickerTime)
        .find('.sb-datepicker-time__number')
        .trigger('click')
      expect(processInput).toHaveBeenCalled()
    })
    it('Should emit date for input on click', async () => {
      const wrapper = mount(SbDatepickerTime)
      const value = dayjs().format()
      await wrapper.setProps({ modelValue: value })
      wrapper.vm.$_processInput()
      expect(wrapper.emitted('update:modelValue')[0].length).toBe(1)
    })
  })
})
