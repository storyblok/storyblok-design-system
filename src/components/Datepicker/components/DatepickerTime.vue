<template>
  <div class="sb-datepicker-time">
    <div class="sb-datepicker-time__numbers-container">
      <p class="sb-datepicker-time__title">Enter time</p>
      <div class="sb-datepicker-time__selection">
        <SbSelect
          :model-value="internalHour"
          :options="hours"
          @update:model-value="handleHourClick"
        />
        <p class="sb-datepicker-time__selection-spacer">:</p>
        <SbSelect
          :model-value="internalMinutes"
          :options="minutes"
          @update:model-value="handleMinuteClick"
        />
      </div>

      <p class="sb-datepicker-time__title">Time zone</p>

      <div class="sb-datepicker-time__selection-timezone">
        <SbSelect
          :options="timezones"
          :model-value="'Etc/GMT+12'"
          @update:model-value="handleChangeTimezone"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import SbSelect from '../../Select'

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
    timezoneList: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['update:modelValue', 'input-minutes'],

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
        list.push({
          label: `${hour}`,
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

    timezones() {
      return [
        {
          label: 'International Date Line West (UTC-12)',
          offset: '-12',
          value: 'Etc/GMT+12',
        },
      ]
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
      this.$_processInput(true)
    },

    $_processInput(isMinutes = false) {
      const hours = this.internalHour || 0
      const minutes = this.internalMinutes || 0
      const value = dayjs(this.internalDate)
        .hour(hours)
        .minute(minutes)
        .format()

      this.$emit('update:modelValue', value)
      if (isMinutes) this.$emit('input-minutes')
    },

    $_syncValue(value) {
      this.internalHour = dayjs(value).hour()
      this.internalMinutes = dayjs(value).minute()
    },

    handleChangeTimezone(timezone) {
      console.log(timezone)
    },
  },
}
</script>
