<template>
  <div class="sb-datepicker-time">
    <div class="sb-datepicker-time__numbers-container">
      <p class="sb-datepicker-time__title">Enter time</p>
      <div class="sb-datepicker-time__selection">
        <SbSelect
          :model-value="internalHour"
          :options="hours"
          data-testid="hours-select"
          @update:model-value="handleHourClick"
        >
          <template #innerSelect>
            <span
              class="sb-select-inner__value sb-select-inner__value-filterable"
            >
              {{ hourLabel() }}
            </span>
          </template>
        </SbSelect>
        <p class="sb-datepicker-time__selection-spacer">:</p>
        <SbSelect
          :model-value="internalMinutes"
          :options="minutes"
          data-testid="minutes-select"
          @update:model-value="handleMinuteClick"
        >
          <template #innerSelect>
            <span
              class="sb-select-inner__value sb-select-inner__value-filterable"
            >
              {{ minutesLabel() }}
            </span>
          </template>
        </SbSelect>
      </div>
      <p class="sb-datepicker-time__title">Time zone</p>

      <div class="sb-datepicker-time__selection-timezone">
        <SbSelect
          :options="timezonesList"
          :model-value="currentTimeZone"
          data-testid="timezone-select"
          filterable
          @update:model-value="handleChangeTimezone"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import SbSelect from '../../Select'
import { TIMEZONES_LIST } from '../../../utils'

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
    hourFormat: {
      type: String,
      dafult: () => '24h',
      validator: (value: string) => ['24h', '12h'].includes(value),
    },
  },

  emits: ['update:modelValue', 'input-minutes', 'input-timezone'],

  data: () => ({
    internalHour: null as null | string | number,
    internalMinutes: null as null | string | number,
  }),

  computed: {
    hours() {
      const list = []

      for (let hour = 0; hour < 24; hour++) {
        if (this.is24hFormat) {
          const hourLabel = `${hour.toString().padStart(2, '0')}`
          list.push({
            label: hourLabel,
            checked: hour === this.internalHour,
            value: hour,
          })
        } else {
          let hour12h = (hour % 12 || 12).toString().padStart(2, '0')
          const period = hour < 12 ? 'AM' : 'PM'
          list.push({
            label: `${hour12h} ${period}`,
            checked: hour === this.internalHour,
            value: hour,
          })
        }
      }

      return list
    },

    minutes() {
      const list = []
      for (let min = 0; min < 60; min += this.minuteRange) {
        const minLabel = `${min.toString().padStart(2, '0')}`
        list.push({
          label: minLabel,
          checked: min === this.internalMinutes,
          value: `${min}`,
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

    is24hFormat() {
      return this.hourFormat === '24h'
    },
  },

  watch: {
    internalDate: {
      handler: '$_syncValue',
      immediate: true,
    },
  },

  methods: {
    handleHourClick(hour: string | number) {
      this.internalHour = hour
      this.$_processInput()
    },

    handleMinuteClick(minute: string | number) {
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

    $_syncValue(value: string | number) {
      this.internalHour = dayjs(value).hour()
      this.internalMinutes = dayjs(value).minute()
    },

    handleChangeTimezone(timezone: string) {
      this.$emit('input-timezone', timezone)
    },

    minutesLabel(): string {
      return (
        this.minutes.find((min) => min.value === `${this.internalMinutes}` || 0)
          ?.label || '00'
      )
    },

    hourLabel(): string {
      return (
        this.hours.find((hour) => hour.value === this.internalHour || 0)
          ?.label || '00'
      )
    },
  },
}
</script>
