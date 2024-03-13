<template>
  <div class="sb-datepicker-time">
    <div class="sb-datepicker-time__numbers-container">
      <p class="sb-datepicker-time__title">Enter time</p>
      <div class="sb-datepicker-time__selection">
        <SbSelect
          :model-value="internalHour"
          :options="hours"
          class="sb-datepicker-time__selection--hours"
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
          class="sb-datepicker-time__selection--minutes"
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
      <div v-if="showTimezoneInput" class="sb-datepicker-timezone__selection">
        <p class="sb-datepicker-time__title">Time zone</p>

        <div class="sb-datepicker-time__selection-timezone">
          <SbSelect
            :options="timezonesList"
            :model-value="currentTimeZone"
            data-testid="timezone-select"
            filterable
            emit-option
            :is-disabled="disableTimezoneInput"
            @update:model-value="handleChangeTimezone"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import SbSelect from '../../Select'
import { TIMEZONES_LIST } from '../../../utils'
import { type TimeZone, HourFormats } from '../utils'

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
      default: () => '24h',
      validator: (value: string) => ['24h', '12h'].includes(value),
    },
    showTimezoneInput: {
      type: Boolean,
      default: false,
    },
    disableTimezoneInput: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'input-timezone'],

  data: () => ({
    internalHour: 0,
    internalMinutes: 0,
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
      const minutesPerHour = 60
      for (let min = 0; min < minutesPerHour; min += this.minuteRange) {
        const minLabel = `${min.toString().padStart(2, '0')}`
        list.push({
          label: minLabel,
          checked: min === this.internalMinutes,
          value: min,
        })
      }
      return list
    },

    currentTimeZone(): string {
      const currentTimeZone: TimeZone | undefined = TIMEZONES_LIST.find(
        (timezone: TimeZone) => timezone.value === this.timezone,
      )
      return currentTimeZone?.label ?? ''
    },

    timezonesList(): TimeZone[] {
      return TIMEZONES_LIST
    },

    is24hFormat(): boolean {
      return this.hourFormat === HourFormats.TwentyFour
    },
  },

  watch: {
    internalDate: {
      handler: '$_syncValue',
      immediate: true,
    },
  },

  methods: {
    handleHourClick(hour: number) {
      this.internalHour = hour
      this.$_processInput()
    },

    handleMinuteClick(minute: number) {
      this.internalMinutes = minute
      this.$_processInput()
    },

    $_processInput() {
      const hours = this.internalHour || 0
      const minutes = this.internalMinutes || 0
      const value = dayjs(this.internalDate)
        .hour(Number(hours))
        .minute(Number(minutes))
        .format()

      this.$emit('update:modelValue', { value, key: 'time' })
    },

    $_syncValue(value: string | number) {
      this.internalHour = dayjs(value).hour()
      this.internalMinutes = dayjs(value).minute()
    },

    handleChangeTimezone(timezone: object) {
      this.$emit('input-timezone', timezone)
    },

    minutesLabel(): string {
      return (
        this.minutes.find((min) => min.value === this.internalMinutes || 0)
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
