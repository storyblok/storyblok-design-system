<template>
  <div class="sb-datepicker-header">
    <div class="sb-datepicker-header__top">
      <button
        class="sb-datepicker-header__button"
        :disabled="isDisabled"
        @click="handlePreviousClick"
      >
        <SbIcon name="chevron-left" size="small" :color="iconColor" />
      </button>

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

      <button
        class="sb-datepicker-header__button"
        :disabled="isDisabled"
        @click="handleNextClick"
      >
        <SbIcon name="chevron-right" size="small" :color="iconColor" />
      </button>
    </div>

    <SbDatepickerWeek v-if="isCalendarView" />

    <p v-else class="sb-datepicker-header__subtitle">
      {{ label }}
    </p>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import SbIcon from '../../Icon'

import SbDatepickerWeek from './DatepickerWeek'

export default {
  name: 'SbDatepickerMonth',

  components: { SbIcon, SbDatepickerWeek },

  props: {
    isCalendarView: Boolean,
    isMonthView: Boolean,
    isTimeView: Boolean,
    isYearView: Boolean,
    value: {
      type: String,
      default: null,
    },
  },

  computed: {
    iconColor() {
      return this.isDisabled ? 'light-gray' : 'primary-dark'
    },

    isDisabled() {
      return !this.isCalendarView
    },

    title() {
      if (this.isDisabled) {
        return dayjs(this.value).format('MMM D, YYYY')
      }

      return dayjs(this.value).format('MMM, YYYY')
    },

    currentMonth() {
      return dayjs(this.value).format('MMM')
    },

    currentYear() {
      return dayjs(this.value).format('YYYY')
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
