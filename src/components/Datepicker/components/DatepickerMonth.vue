<template>
  <div class="sb-datepicker-month">
    <button
      class="sb-datepicker-month__button"
      :disabled="disabled"
      @click="handlePreviousClick"
    >
      <SbIcon name="chevron-left" size="small" :color="iconColor" />
    </button>

    <p v-if="disabled" class="sb-datepicker-month__label">
      {{ label }}
    </p>

    <p v-else class="sb-datepicker-month__label">
      <span @click="handleCurrentMonthClick"> {{ currentMonth }}, </span>

      <span @click="handleCurrentYearClick">
        {{ currentYear }}
      </span>
    </p>

    <button
      class="sb-datepicker-month__button"
      :disabled="disabled"
      @click="handleNextClick"
    >
      <SbIcon name="chevron-right" size="small" :color="iconColor" />
    </button>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import SbIcon from '../../Icon'

export default {
  name: 'SbDatepickerMonth',

  components: { SbIcon },

  props: {
    disabled: Boolean,
    value: {
      type: String,
      default: null,
    },
  },

  computed: {
    iconColor() {
      return this.disabled ? 'light-gray' : 'primary-dark'
    },

    label() {
      if (this.disabled) {
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
