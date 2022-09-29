<template>
  <div
    :ref="_uid"
    v-click-outside="$_wrapClose"
    class="sb-datepicker"
    :class="{ 'sb-datepicker--active': isOverlayVisible }"
  >
    <div class="sb-datepicker__input">
      <SbTextField
        ref="input"
        v-model="internalValue"
        :mask="internalMask"
        type="text"
        icon-right="calendar"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="internalValueFormatted"
        :error="invalidDate"
        clearable
        @icon-click="handleInputClick"
        @clear="handleClear"
        @keyup.enter="handleDoneAction"
        @blur="handleDoneAction"
      />

      <template v-if="isShowTzOffset">
        <span
          v-if="tzTooltip"
          v-tooltip="{ label: tzTooltip, position: 'top' }"
          class="sb-datepicker__timezone"
        >
          {{ tzOffsetLabel }}
        </span>

        <span v-else class="sb-datepicker__timezone">
          {{ tzOffsetLabel }}
        </span>
      </template>
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
        :min-date="minDate"
        :max-date="maxDate"
        :disabled-past="disabledPast"
        @input="handleComponentsInput"
      />

      <div class="sb-datepicker__actions">
        <button
          class="sb-datepicker__action-button"
          @click="handleCancelAction"
        >
          Cancel
        </button>

        <button
          class="sb-datepicker__action-button sb-datepicker__action-button--primary"
          @click="handleDoneAction"
        >
          Apply
        </button>
      </div>
    </SbPopover>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

import { ClickOutside, Tooltip } from '../../directives'
import { includes } from '../../utils'
import { SbTextField } from '../TextField'
import { SbPopover } from '../Popover'

import SbDatepickerHeader from './components/DatepickerHeader'
import SbDatepickerTime from './components/DatepickerTime'
import SbDatepickerDays from './components/DatepickerDays'
import SbDatepickerMonths from './components/DatepickerMonths'
import SbDatepickerYears from './components/DatepickerYears'

import { datepickerOptions, INTERNAL_VIEWS } from './utils'

dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.extend(utc)

export default {
  name: 'SbDatepicker',

  components: {
    SbPopover,
    SbTextField,
    SbDatepickerHeader,
    SbDatepickerDays,
    SbDatepickerTime,
    SbDatepickerMonths,
    SbDatepickerYears,
  },

  directives: {
    tooltip: Tooltip,
    ClickOutside,
  },

  props: {
    disabled: Boolean,

    isoDate: {
      type: Boolean,
      default: false,
    },

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

    timeZone: {
      type: String,
      default: 'UTC',
    },

    tzTooltip: {
      type: String,
      default: null,
    },

    value: {
      type: String,
      default: '',
    },

    minDate: {
      type: String,
      default: null,
    },

    maxDate: {
      type: String,
      default: null,
    },

    disabledPast: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    internalDate: dayjs().format(),
    internalValue: '',
    inputElement: null,
    isOverlayVisible: false,
    internalVisualization: INTERNAL_VIEWS.CALENDAR,
    FORMATS: {
      date: 'YYYY-MM-DD',
      datetime: 'YYYY-MM-DD HH:mm',
    },
    MASKS: {
      date: '####-##-##',
      datetime: '####-##-## ##:##',
    },
    hitClear: false,
    invalidDate: false,
  }),

  computed: {
    hasDayDisabled() {
      return this.maxDate || this.minDate || this.disabledPast
    },

    internalMask() {
      return this.MASKS[this.type]
    },

    internalFormat() {
      return this.FORMATS[this.type]
    },

    internalValueFormatted() {
      return this.internalValue ? this.internalValue : ''
    },

    isTimeDisabled() {
      return this.type === 'date'
    },

    isShowTzOffset() {
      return !this.isTimeDisabled && this.tzOffsetValue && this.internalValue
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

    tzValue() {
      return this.isTimeDisabled ? 'UTC' : this.timeZone ? this.timeZone : 'UTC'
    },

    tzOffsetLabel() {
      return `GMT ${this.tzOffsetValue}`
    },

    tzOffsetValue() {
      if (!dayjs(this.internalValue, this.internalFormat, true).isValid()) {
        return
      }

      if (
        !this.timeZone ||
        !this.internalValue ||
        this.internalValue.length <= 4
      ) {
        return ''
      }

      if (this.tzOffset) return this.tzOffset.replace('GMT', '')
      return dayjs.tz(this.internalValue, this.timeZone).format('Z')
    },
  },

  watch: {
    value: {
      handler: 'syncInternalValue',
      immediate: true,
    },
    internalValueFormatted() {
      if (
        this.internalValue.length >= 4 &&
        dayjs(this.internalValue, this.internalFormat, true).isValid()
      ) {
        this.internalDate = this.internalValue
        this.invalidDate = false
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.inputElement = this.$refs.input && this.$refs.input.$el
    })
  },

  methods: {
    handleCancelAction() {
      this.closeOverlay()

      if (!this.internalValue) {
        return
      } else if (this.hitClear) {
        this.internalValue = ''
        return
      }

      this.syncInternalValue(this.value)
    },

    handleDoneAction() {
      let utcTime

      if (this.internalValue === '') {
        this.handleClear()
        return
      }

      const isValid = dayjs(
        this.internalValue,
        this.internalFormat,
        true
      ).isValid()
      if (!isValid || (this.hasDayDisabled && this.isDateDisabled())) {
        this.invalidDate = true
        return
      }

      if (!this.tzOffset) {
        utcTime = dayjs
          .tz(this.internalValue, this.tzValue)
          .utc()
          .format(
            this.isTimeDisabled ? this.FORMATS.datetime : this.internalFormat
          )
      } else {
        const offset = this.tzOffset.replace(/[+-]/g, ($1) =>
          $1 === '+' ? '-' : '+'
        )
        utcTime = dayjs
          .utc(this.internalValue)
          .utcOffset(offset)
          .format(
            this.isTimeDisabled ? this.FORMATS.datetime : this.internalFormat
          )
      }

      this.hitClear = false

      if (this.isoDate) {
        this.isoString = dayjs.utc(utcTime).toISOString()
        this.$emit('input', this.isoString)
      } else {
        this.$emit('input', utcTime)
      }

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
      const inputTime = dayjs(value).format(this.internalFormat)

      this.internalDate = inputTime
      this.internalValue = inputTime

      if (this.type === 'date') {
        this.closeOverlay()
        this.handleDoneAction()
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
      if (this.disabled) {
        return
      }

      this.isOverlayVisible = !this.isOverlayVisible
      this.internalVisualization = INTERNAL_VIEWS.CALENDAR
    },

    handleClear(previousValue) {
      this.internalValue = ''
      this.hitClear = true
      this.$emit('input', '')
      this.$emit('clear', previousValue)
    },

    closeOverlay() {
      this.isOverlayVisible = false
    },

    syncInternalValue(value) {
      if (!value) {
        this.internalValue = ''
      } else if (this.tzOffset) {
        this.internalValue = dayjs
          .utc(value)
          .utcOffset(this.tzOffset)
          .format(this.internalFormat)
      } else {
        this.internalValue = dayjs
          .utc(value)
          .tz(this.tzValue)
          .format(this.internalFormat)
      }

      if (this.internalValue === 'Invalid Date') this.internalValue = ''
    },

    isDateDisabled() {
      let valid = false
      if (this.disabledPast && dayjs().isAfter(this.internalValue, 'day')) {
        valid = true
      } else if (
        this.minDate &&
        dayjs(this.internalValue).isSameOrBefore(this.minDate, 'day')
      ) {
        valid = true
      } else if (
        this.maxDate &&
        dayjs(this.internalValue).isSameOrAfter(this.maxDate, 'day')
      ) {
        valid = true
      }

      return valid
    },

    $_wrapClose(e) {
      if (!this.$el.contains(e.target)) {
        this.handleCancelAction()
      }
    },
  },
}
</script>
