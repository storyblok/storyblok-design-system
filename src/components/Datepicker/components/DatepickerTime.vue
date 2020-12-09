<template>
  <div class="sb-datepicker-time">
    <div class="sb-datepicker-time__numbers-container">
      <div class="sb-datepicker-time__number-column">
        <div
          v-for="hour in hours"
          :key="hour.value"
          class="sb-datepicker-time__number"
          data-testid="div-hours"
          :class="{ 'sb-datepicker-time__number--active': hour.checked }"
          @click="($evt) => handleHourClick(hour.value)"
        >
          {{ hour.value }}
        </div>
      </div>

      <div class="sb-datepicker-time__number-column">
        <div
          v-for="minute in minutes"
          :key="minute.value"
          class="sb-datepicker-time__number"
          data-testid="div-minutes"
          :class="{ 'sb-datepicker-time__number--active': minute.checked }"
          @click="($evt) => handleMinuteClick(minute.value)"
        >
          {{ minute.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'SbDatepickerTime',

  props: {
    value: {
      type: String,
      default: null,
    },
  },

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
          checked: hour === this.internalHour,
          value: hour < 10 ? '0' + hour : hour,
        })
      }
      return list
    },

    minutes() {
      const list = []
      let min = 60
      while (min > 0) {
        min--
        list.push({
          checked: min === this.internalMinutes,
          value: min < 10 ? '0' + min : min,
        })
      }
      return list
    },
  },

  watch: {
    value: {
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
      const value = dayjs(this.value).hour(hours).minute(minutes).format()

      this.$emit('input', value)
    },

    $_syncValue(value) {
      this.internalHour = dayjs(value).hour()
      this.internalMinutes = dayjs(value).minute()
    },
  },
}
</script>
