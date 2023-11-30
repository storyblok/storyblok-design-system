<template>
  <div
    v-click-outside="wrapClose"
    class="sb-datepicker"
    :class="{ 'sb-datepicker--active': isOverlayVisible }"
  >
    <div class="sb-datepicker__input">
      <SbTextField
        v-if="showTextInput"
        ref="input"
        v-model="internalValue"
        :mask="internalMask"
        type="text"
        icon-left="calendar"
        :disabled="disabled"
        :readonly="isInputReadonly"
        :placeholder="placeholder"
        :model-value="internalValueFormatted"
        :error="invalidDate"
        :inline-label="inlineLabel"
        clearable
        @icon-click="handleInputClick"
        @clear="handleClear"
        @keyup.enter="handleDoneAction"
        @blur="handleDoneAction"
      />

      <SbDatepickerFakeInput
        v-else-if="!showTextInput"
        ref="input"
        :prefix="daterange[0]"
        :sufix="daterange[1]"
        :type="type"
        :view="isComponentView"
        :is-overlay-visible="isOverlayVisible"
        @open-calendar="handleInputClick"
        @clear="handleClear"
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
        v-if="showDatepickerHeader"
        v-bind="{
          isCalendarView,
          isYearView,
          isMonthView,
          isTimeView,
          modelValue: internalDate,
        }"
        @previous-month="handlePreviousMonth"
        @next-month="handleNextMonth"
        @change-month="handleChangeMonth"
        @change-year="handleChangeYear"
      />

      <component
        :is="isComponentView"
        :model-value="internalValue"
        :internal-date="internalDate"
        :min-date="minDate"
        :max-date="maxDate"
        :minute-range="minuteRange"
        :disabled-past="disabledPast"
        :timezone="internalTimezone"
        :hour-format="hourFormat"
        :range="daterange"
        @update:model-value="handleComponentsInput"
        @input-timezone="handleTimezoneInput"
      />

      <div class="sb-datepicker__actions">
        <SbButton
          :label="cancelButtonLabel"
          variant="tertiary"
          size="small"
          class="sb-datepicker__action-button"
          @click="handleCancelAction"
        />
        <SbButton
          label="Apply"
          variant="primary"
          size="small"
          class="sb-datepicker__action-button"
          @click="handleDoneAction"
        />
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
import { SbButton } from '../Button'

import SbDatepickerHeader from './components/DatepickerHeader'
import SbDatepickerTime from './components/DatepickerTime'
import SbDatepickerDays from './components/DatepickerDays'
import SbDatepickerMonths from './components/DatepickerMonths'
import SbDatepickerYears from './components/DatepickerYears'
import SbDatepickerFakeInput from './components/DatepickerFakeInput'

import {
  datepickerOptions,
  INTERNAL_VIEWS,
  FORMATS,
  MASKS,
  COMPONENTS,
} from './utils'

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
    SbButton,
    SbDatepickerFakeInput,
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

    modelValue: {
      type: [String, Array],
      default: null,
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

    inlineLabel: {
      type: String,
      default: '',
    },

    minuteRange: {
      type: Number,
      default: 1,
    },

    hourFormat: {
      type: String,
      dafult: () => '24h',
      validator: (value) => ['24h', '12h'].includes(value),
    },
  },

  emits: ['clear', 'update:modelValue'],

  data: () => ({
    internalDate: dayjs().format(),
    internalValue: '',
    internalTimezone: '',
    inputElement: null,
    isOverlayVisible: false,
    internalVisualization: INTERNAL_VIEWS.CALENDAR,
    hitClear: false,
    invalidDate: false,
    vcoConfig: {
      detectIFrame: false,
    },
    daterange: ['', ''],
  }),

  computed: {
    isInputReadonly() {
      return this.minuteRange > 1
    },

    hasDayDisabled() {
      return this.maxDate || this.minDate || this.disabledPast
    },

    internalMask() {
      return MASKS[this.type]
    },

    internalFormat() {
      return FORMATS[this.type]
    },

    internalValueFormatted() {
      return this.internalValue ? this.internalValue : ''
    },

    isTimeDisabled() {
      return this.type === 'date'
    },

    isDateRangeType() {
      return this.type === 'daterange'
    },

    isShowTzOffset() {
      return (
        !this.isTimeDisabled &&
        this.tzOffsetValue &&
        this.internalValue &&
        !this.isDateRangeType
      )
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
      return COMPONENTS[this.internalVisualization]
    },

    tzValue() {
      return this.isTimeDisabled
        ? 'UTC'
        : this.internalTimezone
        ? this.internalTimezone
        : 'UTC'
    },

    tzOffsetLabel() {
      return `GMT ${this.tzOffsetValue}`
    },

    tzOffsetValue() {
      if (!dayjs(this.internalValue, this.internalFormat, true).isValid()) {
        return
      }

      if (
        !this.internalTimezone ||
        !this.internalValue ||
        this.internalValue.length <= 4
      ) {
        return ''
      }

      if (this.tzOffset) return this.tzOffset.replace('GMT', '')

      return this.sanitizetzValue(
        dayjs.tz(this.internalValue, this.internalTimezone).format('ZZ')
      )
    },

    isDateDisabledPast() {
      return this.disabledPast && dayjs().isAfter(this.internalValue, 'day')
    },

    isMinDateDisabled() {
      return (
        this.minDate && dayjs(this.internalValue).isBefore(this.minDate, 'day')
      )
    },

    isMaxDateDisabled() {
      return (
        this.maxDate && dayjs(this.internalValue).isAfter(this.maxDate, 'day')
      )
    },

    isDateDisabled() {
      return !!(
        this.isDateDisabledPast ||
        this.isMinDateDisabled ||
        this.isMaxDateDisabled
      )
    },

    showDatepickerHeader() {
      return this.isComponentView !== 'SbDatepickerTime'
    },

    hasRange() {
      return this.daterange[0] !== '' && this.daterange[1] !== ''
    },

    cancelButtonLabel() {
      return this.isDateRangeType && this.hasRange ? 'Clear range' : 'Cancel'
    },

    showTextInput() {
      return !this.isDateRangeType
    },
  },

  watch: {
    modelValue: {
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
    if (this.internalValue) this.internalDate = this.internalValue

    this.internalTimezone = this.timeZone

    this.$nextTick(() => {
      this.inputElement = this.$refs.input && this.$refs.input.$el
    })

    if (Array.isArray(this.modelValue) && this.isDateRangeType) {
      this.daterange = JSON.parse(JSON.stringify(this.modelValue))
      this.internalDate = this.daterange[0]
      this.internalValue = this.daterange[0]
    }
  },

  methods: {
    handleCancelAction(clearRange = false) {
      if (this.isDateRangeType && this.isOverlayVisible && clearRange) {
        this.daterange = ['', '']
        return
      }

      this.closeOverlay()

      if (!this.internalValue) {
        return
      } else if (this.hitClear) {
        this.internalValue = ''
        return
      }

      this.syncInternalValue(this.modelValue)
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

      if (!isValid || (this.hasDayDisabled && this.isDateDisabled)) {
        this.invalidDate = true
        return
      }

      if (!this.tzOffset) {
        utcTime = dayjs
          .tz(this.internalValue, this.tzValue)
          .utc()
          .format(this.isTimeDisabled ? FORMATS.datetime : this.internalFormat)
      } else {
        const offset = this.tzOffset.replace(/[+-]/g, ($1) =>
          $1 === '+' ? '-' : '+'
        )
        utcTime = dayjs
          .utc(this.internalValue)
          .utcOffset(offset)
          .format(this.isTimeDisabled ? FORMATS.datetime : this.internalFormat)
      }

      this.hitClear = false

      if (this.isoDate) {
        this.isoString = dayjs.utc(utcTime).toISOString()
        this.$emit('update:modelValue', this.isoString)
      } else {
        this.$emit('update:modelValue', utcTime)
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

      if (this.isDateRangeType) {
        this.populateRange(inputTime)

        this.internalDate = this.daterange[0]
        this.internalValue = this.daterange[0]

        return
      }

      this.internalDate = inputTime
      this.internalValue = inputTime

      if (this.isTimeDisabled) {
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
      this.daterange = ['', '']
      this.$emit('update:modelValue', '')
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

    wrapClose(e) {
      const hasTarget = e && e?.target && this.$el
      const hasContains = hasTarget && typeof this.$el?.contains === 'function'
      const targetIsNode = e?.target instanceof Node
      const targetHasElement = this.$el.contains(e.target)

      if (hasContains && targetIsNode && !targetHasElement) {
        const clearRange = !this.isDateRangeType
        this.handleCancelAction(clearRange)
      }
    },

    sanitizetzValue(input) {
      const match = input.match(/^([+-])(\d{2})(\d{2})$/)

      if (match) {
        const [, signal, hours, min] = match

        const minutes = min > 0 ? `.${min}` : ''

        return `${signal}${parseInt(hours, 10)}${minutes}`
      } else {
        return input
      }
    },

    handleTimezoneInput(timezone) {
      this.internalTimezone = timezone

      // TODO: EMIT
    },

    populateRange(date) {
      if (this.daterange[0] === '') {
        this.daterange[0] = dayjs(date).format(FORMATS.date)
        return
      }
      this.daterange[1] = dayjs(date).format(FORMATS.date)
    },
  },
}
</script>
