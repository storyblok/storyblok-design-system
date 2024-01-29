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
      defaultComponentMounted.find('.sb-datepicker-time__title').exists(),
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
      1,
    )

    await waitMs(100)

    minuteSelect.trigger('click')

    defaultComponentMounted
      .find(`[data-testid="minutes-select-list-item__${minuteToSelect}"]`)
      .trigger('click')

    expect(defaultComponentMounted.vm.internalMinutes).toEqual(minuteToSelect)
    expect(defaultComponentMounted.emitted('update:modelValue')[0].length).toBe(
      1,
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
  })
})
