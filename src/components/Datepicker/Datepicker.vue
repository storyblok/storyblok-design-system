<template>
  <div class="sb-datepicker">
    <div class="sb-datepicker-input"></div>

    <div class="sb-datepicker-overlay">
      <div class="sb-datepicker-header">
        <SbDatepickerMonth
          :current-month="currentMonth"
          :current-year="currentYear"
          :disabled="isTimeActive"
          @previous-month="handlePreviousMonth"
          @next-month="handleNextMonth"
        />

        <SbDatepickerWeek v-if="isDatetimeType" />

        <span v-else class="sb-datepicker-time__label">
          Choose exact time
        </span>
      </div>

      <SbDatepickerDays
        v-if="isDatetimeType"
        :days="daysToCalendar"
        @choose-day="handleChooseDay"
      />

      <SbDatepickerTime v-else />

      <div class="sb-datepicker-actions">
        <button
          class="sb-datepicker-actions__button"
          @click="handleCancelAction"
        >
          Cancel
        </button>

        <button
          class="sb-datepicker-actions__button sb-datepicker-actions__button--primary"
          @click="handleDoneAction"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import SbDatepickerMonth from './components/DatepickerMonth'
import SbDatepickerTime from './components/DatepickerTime'
import SbDatepickerDays from './components/DatepickerDays'
import SbDatepickerWeek from './components/DatepickerWeek'

export default {
  name: 'SbDatepicker',

  components: {
    SbDatepickerMonth,
    SbDatepickerWeek,
    SbDatepickerDays,
    SbDatepickerTime,
  },

  props: {
    placeholder: {
      type: String,
      default: null,
    },

    value: {
      type: String,
      default: null,
      required: true,
    },

    type: {
      type: String,
      default: 'datetime',
    },
  },

  data: () => ({
    internalDate: dayjs().format(),
    internalValue: dayjs().format(),
  }),

  computed: {
    isDatetimeType() {
      return this.type === 'datetime'
    },

    isTimeActive() {
      return !this.isDatetimeType
    },

    currentMonth() {
      return dayjs(this.internalDate).format('MMM')
    },

    currentYear() {
      return dayjs(this.internalDate).format('YYYY')
    },

    daysToCalendar() {
      const daysInTheMonth = dayjs(this.internalDate).daysInMonth()
      const firstDate = dayjs(this.internalDate).startOf('month')
      const lastDate = dayjs(this.internalDate).endOf('month')
      const days = []

      for (let i = this.$_getDayInWeek(firstDate); i > 1; i--) {
        const dateValue = firstDate.subtract(i, 'day')

        days.push({
          label: dateValue.date(),
          date: dateValue,
          inMonth: false,
          checked: false,
        })
      }

      for (let i = 1; i <= daysInTheMonth; i++) {
        const dateValue = dayjs(this.internalDate).date(i)

        days.push({
          label: i,
          date: dateValue,
          inMonth: true,
          checked: dayjs(this.internalValue).isSame(dateValue),
        })
      }

      const nextDays = 42 - days.length
      for (let i = 1; i <= nextDays; i++) {
        const dateValue = lastDate.add(i, 'day')

        days.push({
          label: dateValue.date(),
          date: dateValue,
          inMonth: false,
          checked: false,
        })
      }

      return days
    },
  },

  methods: {
    handleCancelAction() {},

    handleDoneAction() {},

    handlePreviousMonth() {
      this.internalDate = dayjs(this.internalDate).subtract(1, 'month')
    },

    handleNextMonth() {
      this.internalDate = dayjs(this.internalDate).add(1, 'month')
    },

    handleChooseDay(day) {
      this.internalDate = day.date.format()
      this.internalValue = day.date.format()
    },

    /**
     * get the day of the week
     * @param {dayjs} dayJsInstance
     */
    $_getDayInWeek(dayJsInstance) {
      const _day = dayJsInstance.day()
      return _day === 0 ? 7 : _day
    },
  },
}
</script>
