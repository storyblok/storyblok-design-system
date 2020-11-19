<template>
  <div v-click-outside="$_wrapClose" class="sb-datepicker">
    <div class="sb-datepicker__input">
      <input
        ref="input"
        type="text"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="internalValueFormated"
        @click="handleInputClick"
      />

      <span v-if="isShowTzOffset" class="sb-datepicker-input__tz">
        {{ tzOffset }}
      </span>
    </div>

    <SbPopover
      :is-open="isOverlayVisible"
      :reference="inputElement"
      placement="bottom-start"
      class="sb-datepicker__overlay"
    >
      <SbDatepickerHeader
        v-bind="{
          isCalendarView,
          isYearView,
          isMonthView,
          isTimeView,
          value: internalDate,
        }"
        @previous-month="handlePreviousMonth"
        @next-month="handleNextMonth"
        @change-month="handleChangeMonth"
        @change-year="handleChangeYear"
      />

      <component
        :is="isComponentView"
        :value="internalValue"
        :internal-date="internalDate"
        @input="handleComponentsInput"
      />

      <div class="sb-datepicker__actions">
        <button
          class="sb-datepicker-actions-button"
          @click="handleCancelAction"
        >
          Cancel
        </button>

        <button
          class="sb-datepicker-actions-button sb-datepicker-actions-button--primary"
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

import SbDatepickerHeader from './components/DatepickerHeader'
import SbDatepickerTime from './components/DatepickerTime'
import SbDatepickerDays from './components/DatepickerDays'
import SbDatepickerMonths from './components/DatepickerMonths'
import SbDatepickerYears from './components/DatepickerYears'

import { datepickerOptions, INTERNAL_VIEWS } from './utils'

export default {
  name: 'SbDatepicker',

  components: {
    SbPopover,
    SbDatepickerHeader,
    SbDatepickerDays,
    SbDatepickerTime,
    SbDatepickerMonths,
    SbDatepickerYears,
  },

  directives: {
    ClickOutside,
  },

  props: {
    disabled: Boolean,

    placeholder: {
      type: String,
      default: null,
    },

    type: {
      type: String,
      default: 'datetime',
      validations: (val) => includes(datepickerOptions, val),
    },

    tzOffset: {
      type: String,
      default: '',
    },

    value: {
      type: String,
      default: '',
      required: true,
    },
  },

  data: () => ({
    forceVisibleTime: false,
    internalDate: dayjs().format(),
    internalValue: dayjs().format(),
    inputElement: null,
    isOverlayVisible: false,
    internalVisualization: INTERNAL_VIEWS.CALENDAR,
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

    isDisabledTime() {
      return this.type === 'date'
    },

    isShowTzOffset() {
      return !this.isDisabledTime && this.tzOffset
    },

    isShowCalendar() {
      if (this.forceVisibleTime || this.type === 'time') {
        return false
      }

      return this.type === 'datetime' || this.type === 'date'
    },

    isCalendarView() {
      return this.internalVisualization === INTERNAL_VIEWS.CALENDAR
    },

    isTimeView() {
      return this.internalVisualization === INTERNAL_VIEWS.TIME
    },

    isMonthView() {
      return this.internalVisualization === INTERNAL_VIEWS.MONTH
    },

    isYearView() {
      return this.internalVisualization === INTERNAL_VIEWS.YEAR
    },

    isComponentView() {
      const COMPONENTS = {
        CALENDAR: 'SbDatepickerDays',
        TIME: 'SbDatepickerTime',
        MONTH: 'SbDatepickerMonths',
        YEAR: 'SbDatepickerYears',
      }

      return COMPONENTS[this.internalVisualization]
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

    handleChangeMonth() {
      this.internalVisualization = INTERNAL_VIEWS.MONTH
    },

    handleChangeYear() {
      this.internalVisualization = INTERNAL_VIEWS.YEAR
    },

    handleComponentsInput(value) {
      this.internalDate = value
      this.internalValue = value

      if (this.type === 'date') {
        this.closeOverlay()
        return
      }

      if (this.isCalendarView) {
        this.internalVisualization = INTERNAL_VIEWS.TIME
      }

      if (this.isMonthView) {
        this.internalVisualization = INTERNAL_VIEWS.CALENDAR
      }

      if (this.isYearView) {
        this.internalVisualization = INTERNAL_VIEWS.MONTH
      }
    },

    handleInputClick() {
      this.isOverlayVisible = true
      this.internalVisualization =
        this.type === 'time' ? INTERNAL_VIEWS.TIME : INTERNAL_VIEWS.CALENDAR
    },

    closeOverlay() {
      this.isOverlayVisible = false
    },

    $_wrapClose(e) {
      if (!this.$el.contains(e.target)) {
        this.closeOverlay()
      }
    },
  },
}
</script>
