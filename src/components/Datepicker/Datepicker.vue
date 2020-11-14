<template>
  <div v-click-outside="$_wrapClose" class="sb-datepicker">
    <div class="sb-datepicker-input">
      <input
        ref="input"
        type="text"
        :placeholder="placeholder"
        :value="internalValueFormated"
        @click="handleInputClick"
      />
    </div>

    <SbPopover
      :is-open="isOverlayVisible"
      :reference="inputElement"
      placement="bottom-start"
      class="sb-datepicker-overlay"
    >
      <div class="sb-datepicker-header">
        <SbDatepickerMonth
          :disabled="!isShowCalendar"
          :value="internalDate"
          @previous-month="handlePreviousMonth"
          @next-month="handleNextMonth"
        />

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
    </SbPopover>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import { ClickOutside } from '../../directives'
import { includes } from '../../utils'

import { SbPopover } from '../Popover'
import SbDatepickerMonth from './components/DatepickerMonth'
import SbDatepickerTime from './components/DatepickerTime'
import SbDatepickerDays from './components/DatepickerDays'
import SbDatepickerWeek from './components/DatepickerWeek'

import { datepickerOptions } from './utils'

export default {
  name: 'SbDatepicker',

  components: {
    SbPopover,
    SbDatepickerMonth,
    SbDatepickerWeek,
    SbDatepickerDays,
    SbDatepickerTime,
  },

  directives: {
    ClickOutside,
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
      validations: (val) => includes(datepickerOptions, val),
    },
  },

  data: () => ({
    forceVisibleTime: false,
    internalDate: dayjs().format(),
    internalValue: dayjs().format(),
    inputElement: null,
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

      return this.type === 'datetime' || this.type === 'date'
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

  mounted() {
    this.$nextTick(() => {
      this.inputElement = this.$refs.input
    })
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
      this.internalDate = dayjs(this.internalDate).subtract(1, 'month').format()
    },

    handleNextMonth() {
      this.internalDate = dayjs(this.internalDate).add(1, 'month').format()
    },

    handleChooseDay(day) {
      this.internalDate = day.date.format()
      this.internalValue = day.date.format()

      if (this.type === 'date') {
        this.closeOverlay()
        return
      }

      this.forceVisibleTime = true
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

    $_wrapClose(e) {
      if (!this.$el.contains(e.target)) {
        this.closeOverlay()
      }
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
