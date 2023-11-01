<template>
  <div class="sb-datepicker-time">
    <div class="sb-datepicker-time__numbers-container">
      <p class="sb-datepicker-time__title">Enter time</p>
      <div class="sb-datepicker-time__selection">
        <SbSelect
          :model-value="internalHour"
          :options="hours"
          filterable
          @update:model-value="handleHourClick"
        />
        <p class="sb-datepicker-time__selection-spacer">:</p>
        <SbSelect
          :model-value="internalMinutes"
          :options="minutes"
          filterable
          @update:model-value="handleMinuteClick"
        />
      </div>
      <p class="sb-datepicker-time__title">Time zone</p>

      <div class="sb-datepicker-time__selection-timezone">
        <SbSelect
          :options="timezonesList"
          :model-value="currentTimeZone"
          filterable
          @update:model-value="handleChangeTimezone"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import SbSelect from '../../Select'
import { TIMEZONES_LIST } from '../utils'

export default {
  name: 'SbDatepickerTime',

  components: { SbSelect },

  props: {
    internalDate: {
      type: String,
      default: null,
    },
    minuteRange: {
      type: Number,
      default: 1,
    },
    timezone: {
      type: String,
      default: null,
    },
  },

  emits: ['update:modelValue', 'input-minutes', 'input-timezone'],

  data: () => ({
    internalHour: null,
    internalMinutes: null,
  }),

  computed: {
    hours() {
      const list = []
      let hour = 24
      while (hour > 0) {
        hour--
        const hourLabel = `${hour} ${hour >= 12 ? 'PM' : 'AM'}`
        list.push({
          label: hourLabel,
          checked: hour === this.internalHour,
          value: hour < 10 ? '0' + hour : hour,
        })
      }
      return list
    },

    minutes() {
      const list = []
      let min = 60
      const minuteRange = min % this.minuteRange === 0 ? this.minuteRange : 0
      while (min > 0) {
        minuteRange > 1 ? (min = min - minuteRange) : min--
        list.push({
          label: `${min}`,
          checked: min === this.internalMinutes,
          value: min < 10 ? '0' + min : min,
        })
      }
      return list
    },

    currentTimeZone() {
      const currentTimeZone = TIMEZONES_LIST.find(
        (tz) => tz.value === this.timezone
      )

      return currentTimeZone?.label || ''
    },

    timezonesList() {
      return TIMEZONES_LIST
    },
  },

  watch: {
    internalDate: {
      handler: '$_syncValue',
      immediate: true,
    },
  },

  methods: {
    handleHourClick(hour) {
      this.internalHour = hour
      this.$_processInput()
    },

    handleMinuteClick(minute) {
      this.internalMinutes = minute
      this.$_processInput()
    },

    $_processInput() {
      const hours = this.internalHour || 0
      const minutes = this.internalMinutes || 0
      const value = dayjs(this.internalDate)
        .hour(hours)
        .minute(minutes)
        .format()

      this.$emit('update:modelValue', value)
    },

    $_syncValue(value) {
      this.internalHour = dayjs(value).hour()
      this.internalMinutes = dayjs(value).minute()
    },

    handleChangeTimezone(timezone) {
      this.$emit('input-timezone', timezone)
    },
  },
}
</script>
