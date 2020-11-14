<template>
  <div class="sb-datepicker">
    <div class="sb-datepicker-input">
      <input
        type="text"
        :placeholder="placeholder"
        :value="internalValueFormated"
        @click="handleInputClick"
      />
    </div>

    <div v-if="isOverlayVisible" class="sb-datepicker-overlay">
      <div class="sb-datepicker-header">
        <SbDatepickerMonth :disabled="!isShowCalendar" :value="internalValue" />

        <SbDatepickerWeek v-if="isShowCalendar" />

        <span v-else class="sb-datepicker-time__label">
          Choose exact time
        </span>
      </div>

      <SbDatepickerDays
        v-if="isShowCalendar"
        :days="daysToCalendar"
        @choose-day="handleChooseDay"
      />

      <SbDatepickerTime
        v-else
        :value="internalValue"
        @input="handleTimeInput"
      />

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
    forceVisibleTime: false,
    internalDate: dayjs().format(),
    internalValue: dayjs().format(),
    isOverlayVisible: false,
  }),

  computed: {
    internalFormat() {
      const FORMATS = {
        time: 'HH:mm',
        date: 'YYYY-MM-DD',
        datetime: 'YYYY-MM-DD HH:mm',
      }

      return FORMATS[this.type]
    },

    internalValueFormated() {
      return dayjs(this.internalValue).format(this.internalFormat)
    },

    isShowCalendar() {
      if (this.forceVisibleTime || this.type === 'time') {
        return false
      }

      return this.type === 'datetime'
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
    handleCancelAction() {
      this.closeOverlay()
    },

    handleDoneAction() {
      this.$emit('input', this.internalValue)

      this.$nextTick(() => {
        this.closeOverlay()
      })
    },

    handlePreviousMonth() {
      this.internalDate = dayjs(this.internalDate).subtract(1, 'month')
    },

    handleNextMonth() {
      this.internalDate = dayjs(this.internalDate).add(1, 'month')
    },

    handleChooseDay(day) {
      this.internalDate = day.date.format()
      this.internalValue = day.date.format()

      if (this.type !== 'date') {
        this.forceVisibleTime = true
      }
    },

    handleTimeInput(value) {
      const { hour, minutes } = value
      const currentDate = dayjs(this.internalValue).hour(hour).minute(minutes)
      this.internalDate = currentDate.format()
      this.internalValue = currentDate.format()
    },

    handleInputClick() {
      this.isOverlayVisible = true
      this.forceVisibleTime = false
    },

    closeOverlay() {
      this.isOverlayVisible = false
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
