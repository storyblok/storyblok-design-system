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
        readonly
        clearable
        type="text"
        icon-left="calendar"
        :disabled="disabled"
        :placeholder="placeholder"
        :value="internalValueFormatted"
        @click.native="handleInputClick"
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
          class="sb-datepicker__action-button"
          @click="handleCancelAction"
        >
          Cancel
        </button>

        <button
          class="
            sb-datepicker__action-button sb-datepicker__action-button--primary
          "
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
import timezone from 'dayjs/plugin/timezone'
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
  },

  data: () => ({
    forceVisibleTime: false,
    internalDate: dayjs().format(),
    internalValue: '',
    inputElement: null,
    isOverlayVisible: false,
    internalVisualization: INTERNAL_VIEWS.CALENDAR,
    FORMATS: {
      date: 'YYYY-MM-DD',
      datetime: 'YYYY-MM-DD HH:mm',
    },
    hitClear: false,
  }),

  computed: {
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

    tzValue() {
      return this.isTimeDisabled ? 'UTC' : this.timeZone ? this.timeZone : 'UTC'
    },

    tzOffsetLabel() {
      return `GMT ${this.tzOffsetValue}`
    },

    tzOffsetValue() {
      if (!this.timeZone || !this.internalValue) {
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

      this.$emit('input', utcTime)

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

      this.isOverlayVisible = true
      this.internalVisualization =
        this.type === 'time' ? INTERNAL_VIEWS.TIME : INTERNAL_VIEWS.CALENDAR
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

    $_wrapClose(e) {
      if (!this.$el.contains(e.target)) {
        this.handleCancelAction()
      }
    },
  },
}
</script>
