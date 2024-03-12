<template>
  <div
    v-click-outside="wrapClose"
    class="sb-datepicker"
    :class="{ 'sb-datepicker--active': isOverlayVisible }"
  >
    <div class="sb-datepicker__input">
      <SbTextField
        v-if="!showFakeInput"
        ref="input"
        v-model="internalValueFormatted"
        :mask="internalMask"
        type="text"
        icon-left="calendar"
        :disabled="disabled"
        :readonly="isInputReadonly"
        :placeholder="returnPlaceholder"
        :error="invalidDate"
        :inline-label="inlineLabel"
        :data-testid="`${baseDataTestId}-input`"
        data-cy="sb-datepicker-input"
        clearable
        @icon-click="handleInputClick"
        @clear="handleClear"
        @keyup.enter="handleDoneAction"
        @focus="handleInputClick"
      />

      <SbDatepickerFakeInput
        v-else-if="showFakeInput"
        ref="input"
        :prefix="returnPrefixValue"
        :suffix="returnSuffixValue"
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
        :is-calendar-view="isCalendarView"
        :is-year-view="isYearView"
        :is-month-view="isMonthView"
        :is-time-view="isTimeView"
        :model-value="internalDate"
        :data-testid="`${baseDataTestId}`"
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
        :show-timezone-input="showTimezoneInput"
        :disable-timezone-input="disableTimezoneInput"
        @update:model-value="handleComponentsInput"
        @input-timezone="handleTimezoneInput"
      />

      <div class="sb-datepicker__actions">
        <SbButton
          :label="cancelButtonLabel"
          variant="tertiary"
          size="small"
          class="sb-datepicker__action-button"
          :data-testid="`${baseDataTestId}-cancel`"
          @click="handleCancelAction"
        />
        <SbButton
          label="Apply"
          variant="primary"
          size="small"
          class="sb-datepicker__action-button"
          :data-testid="`${baseDataTestId}-done`"
          @click="handleDoneAction"
        />
      </div>
    </SbPopover>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

import { ClickOutside, Tooltip } from '../../directives'
import { includes } from '../../utils'

import { SbTextField } from '../TextField'
import { SbPopover } from '../Popover'
import { SbButton } from '../Button'

import SbDatepickerHeader from './components/DatepickerHeader.vue'
import SbDatepickerTime from './components/DatepickerTime.vue'
import SbDatepickerDays from './components/DatepickerDays.vue'
import SbDatepickerMonths from './components/DatepickerMonths.vue'
import SbDatepickerYears from './components/DatepickerYears.vue'
import SbDatepickerFakeInput from './components/DatepickerFakeInput.vue'

import {
  datepickerOptions,
  datepickerOption,
  INTERNAL_VIEWS,
  FORMATS,
  FORMATS24h,
  MASKS,
  COMPONENTS,
  type TimeZone,
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
      validations: (val: string) => includes(datepickerOptions, val),
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
      default: '24h',
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

  emits: ['clear', 'update:modelValue', 'change-timezone'],

  data: () => ({
    internalDate: dayjs().format(),
    internalValue: '',
    internalTimezone: '',
    inputElement: '',
    isOverlayVisible: false,
    internalVisualization: INTERNAL_VIEWS.calendar,
    hitClear: false,
    invalidDate: false,
    vcoConfig: {
      detectIFrame: false,
    },
    daterange: ['', ''] as Array<string>,
    hasTimezoneChanges: false,
  }),

  computed: {
    baseDataTestId() {
      const dataTestid = this.$attrs['data-testid']
      return dataTestid || 'sb-datepicker'
    },
    isInputReadonly() {
      return this.minuteRange > 1
    },

    hasDayDisabled() {
      return this.maxDate || this.minDate || this.disabledPast
    },

    internalMask() {
      return MASKS[this.type as keyof typeof MASKS]
    },

    internalFormat() {
      return this.is24hFormat
        ? FORMATS24h[this.type as keyof typeof FORMATS24h]
        : FORMATS[this.type as keyof typeof FORMATS]
    },

    internalValueFormatted() {
      return this.internalValue ? this.internalValue : ''
    },

    isTimeDisabled() {
      return this.type === datepickerOption.date
    },

    isDateRangeType() {
      return this.type === datepickerOption.daterange
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
      return this.internalVisualization === INTERNAL_VIEWS.calendar
    },

    isTimeView() {
      return this.internalVisualization === INTERNAL_VIEWS.time
    },

    isMonthView() {
      return this.internalVisualization === INTERNAL_VIEWS.month
    },

    isYearView() {
      return this.internalVisualization === INTERNAL_VIEWS.year
    },

    isComponentView() {
      return COMPONENTS[this.internalVisualization as keyof typeof COMPONENTS]
    },

    tzValue(): string {
      if (this.isTimeDisabled) return 'UTC'

      return this.internalTimezone || this.timeZone || 'UTC'
    },

    tzOffsetLabel() {
      return `GMT${this.tzOffsetValue}`
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

      return this.sanitizeTzValue(
        dayjs.tz(this.internalValue, this.internalTimezone).format('ZZ'),
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

    showFakeInput() {
      return this.isDateRangeType
    },

    returnPrefixValue() {
      const dateValue = this.internalValue
        ? dayjs(this.internalValue).format(FORMATS.date)
        : ''
      return this.isDateRangeType ? this.daterange[0] : dateValue
    },

    returnSuffixValue() {
      const timeValue = this.internalValue
        ? dayjs(this.internalValue).format(FORMATS.time)
        : ''
      return this.isDateRangeType ? this.daterange[1] : timeValue
    },

    returnPlaceholder() {
      return this.placeholder ? this.placeholder : this.internalFormat
    },

    is24hFormat() {
      return this.hourFormat === '24h'
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
      if (this.hasRange && this.isOverlayVisible && clearRange) {
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

      this.syncInternalValue(this.modelValue as string)
    },

    handleDoneAction() {
      let utcTime

      if (this.internalValue === '') {
        this.handleClear()
        return
      }

      if (this.isDateRangeType) {
        this.$emit('update:modelValue', this.daterange)
        this.closeOverlay()

        return
      }

      const isValid = dayjs(
        this.internalValue,
        this.internalFormat,
        true,
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
          $1 === '+' ? '-' : '+',
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

      if (this.hasTimezoneChanges) {
        this.$emit('change-timezone', this.internalTimezone)
        this.hasTimezoneChanges = false
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
      this.internalVisualization = INTERNAL_VIEWS.month
    },

    handleChangeYear() {
      this.internalVisualization = INTERNAL_VIEWS.year
    },

    handleComponentsInput({
      value,
      key,
    }: {
      value: string
      key: string
    }): void {
      const inputTime = dayjs(value).format(this.internalFormat)

      if (this.isDateRangeType && key === 'day') {
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
        this.internalVisualization = INTERNAL_VIEWS.time
      }

      if (this.isMonthView) {
        this.internalVisualization = INTERNAL_VIEWS.calendar
      }

      if (this.isYearView) {
        this.internalVisualization = INTERNAL_VIEWS.month
      }
    },

    handleInputClick() {
      if (this.disabled) {
        return
      }

      this.isOverlayVisible = !this.isOverlayVisible
      this.internalVisualization = INTERNAL_VIEWS.calendar
    },

    handleClear(previousValue = null) {
      this.internalValue = ''
      this.hitClear = true
      this.daterange = ['', '']
      this.$emit('update:modelValue', '')
      this.$emit('clear', previousValue)
    },

    closeOverlay() {
      this.isOverlayVisible = false
    },

    syncInternalValue(value: string): void {
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

      this.internalTimezone = this.timeZone

      if (this.internalValue === 'Invalid Date') this.internalValue = ''
    },

    wrapClose(e: Event) {
      const hasTarget = e && e?.target && this.$el
      const hasContains = hasTarget && typeof this.$el?.contains === 'function'
      const targetIsNode = e?.target instanceof Node
      const targetHasElement = this.$el.contains(e.target)

      if (hasContains && targetIsNode && !targetHasElement) {
        const clearRange = !this.isDateRangeType
        this.handleCancelAction(clearRange)
      }
    },

    sanitizeTzValue(input: string): string {
      const match = input.match(/^([+-])(\d{2})(\d{2})$/)

      if (match) {
        const [, signal, hours, min] = match

        const minutes = Number(min) > 0 ? `.${min}` : ''

        return `${signal}${parseInt(hours, 10)}${minutes}`
      } else {
        return input
      }
    },

    handleTimezoneInput(timezone: TimeZone) {
      this.hasTimezoneChanges = true
      this.internalTimezone = timezone.value
    },

    populateRange(date: string) {
      if (this.daterange[0] === '') {
        this.daterange[0] = dayjs(date).format(FORMATS.date)
        return
      }
      this.daterange[1] = dayjs(date).format(FORMATS.date)

      if (dayjs(this.daterange[1]).isBefore(this.daterange[0])) {
        this.daterange.reverse()
      }
    },
  },
}
</script>
