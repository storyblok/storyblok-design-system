<template>
  <div class="sb-datepicker-header">
    <div class="sb-datepicker-header__top">
      <p v-if="isCalendarView" class="sb-datepicker-header__title">
        <span data-testid="span-current-month" @click="handleCurrentMonthClick">
          {{ currentMonth }},&nbsp;
        </span>

        <span data-testid="span-current-year" @click="handleCurrentYearClick">
          {{ currentYear }}
        </span>
      </p>

      <p v-if="isMonthView" class="sb-datepicker-header__title">
        {{ currentYear }}
      </p>

      <p v-if="isYearView || isTimeView" class="sb-datepicker-header__title">
        {{ currentMonth }}, {{ currentYear }}
      </p>

      <SbButton
        class="sb-datepicker-header__button"
        :disabled="isDisabled"
        size="small"
        icon="chevron-left"
        only-icon
        variant="tertiary"
        @click="handlePreviousClick"
      />

      <SbButton
        class="sb-datepicker-header__button"
        :disabled="isDisabled"
        size="small"
        icon="chevron-right"
        only-icon
        variant="tertiary"
        @click="handleNextClick"
      />
    </div>

    <SbDatepickerWeek v-if="isCalendarView" />

    <p v-else class="sb-datepicker-header__subtitle">
      {{ label }}
    </p>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import SbDatepickerWeek from './DatepickerWeek'
import SbButton from '../../Button'

export default {
  name: 'SbDatepickerHeader',

  components: { SbDatepickerWeek, SbButton },

  props: {
    isCalendarView: Boolean,
    isMonthView: Boolean,
    isTimeView: Boolean,
    isYearView: Boolean,
    modelValue: {
      type: String,
      default: null,
    },
  },

  emits: ['change-month', 'change-year', 'next-month', 'previous-month'],

  computed: {
    iconColor() {
      return this.isDisabled ? 'light-gray' : 'primary-dark'
    },

    isDisabled() {
      return !this.isCalendarView
    },

    title() {
      if (this.isDisabled) {
        return dayjs(this.modelValue).format('MMM D, YYYY')
      }

      return dayjs(this.modelValue).format('MMM, YYYY')
    },

    currentMonth() {
      return dayjs(this.modelValue).format('MMM')
    },

    currentYear() {
      return dayjs(this.modelValue).format('YYYY')
    },

    label() {
      if (this.isTimeView) {
        return 'Choose exact time'
      }

      if (this.isYearView) {
        return 'Choose year'
      }

      return 'Choose month'
    },
  },

  methods: {
    handlePreviousClick() {
      this.$emit('previous-month')
    },

    handleNextClick() {
      this.$emit('next-month')
    },

    handleCurrentMonthClick($event) {
      $event.stopPropagation()
      this.$emit('change-month')
    },

    handleCurrentYearClick($event) {
      $event.stopPropagation()
      this.$emit('change-year')
    },
  },
}
</script>
