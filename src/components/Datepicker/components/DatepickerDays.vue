<template>
  <div class="sb-datepicker-days">
    <span
      v-for="(dayItem, key) in days"
      :key="key"
      :class="returnClasses(dayItem as unknown as DayItem)"
      @click.stop="handleDayClick(dayItem as unknown as DayItem)"
    >
      {{ dayItem.label }}
    </span>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import type { DayItem } from '../utils'
import type { PropType } from 'vue'

dayjs.extend(isBetween)
export default {
  name: 'SbDatepickerDays',

  props: {
    modelValue: {
      type: [String, Array],
      default: null,
    },
    internalDate: {
      type: String,
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
    range: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },

  emits: ['update:modelValue'],

  computed: {
    firstRangeValue(): string {
      return this.range[0]
    },

    secondRangeValue(): string {
      return this.range[1]
    },

    days() {
      const daysInTheMonth = dayjs(this.internalDate).daysInMonth()
      const firstDate = dayjs(this.internalDate).startOf('month')
      const lastDate = dayjs(this.internalDate).endOf('month')
      const days = []

      for (let i = this.$_getDayInWeek(firstDate); i > 1; i--) {
        const dateValue = firstDate.subtract(i - 1, 'day')

        days.push({
          label: dateValue.date(),
          date: dateValue,
          inMonth: false,
          checked: false,
          current: false,
          insideRange: this.insideRange(dateValue),
          disabled: this.isDisabledDay(dateValue),
          dataTestid: this.getDataTestid(dateValue.toString()),
        })
      }

      for (let i = 1; i <= daysInTheMonth; i++) {
        const dateValue = dayjs(this.internalDate).date(i)
        let checked = false
        if (!this.range || this.firstRangeValue === '') {
          checked = dayjs(this.modelValue.toString()).isSame(dateValue, 'day')
        } else {
          checked = dayjs(this.firstRangeValue).isSame(dateValue, 'day')
        }

        days.push({
          label: i,
          date: dateValue,
          inMonth: true,
          checked,
          border: this.isOnBorderOfDateRange(dateValue),
          insideRange: this.insideRange(dateValue),
          current: !this.hasRange ? dayjs().isSame(dateValue, 'day') : false,
          disabled: this.isDisabledDay(dateValue),
          dataTestid: this.getDataTestid(dateValue.toString()),
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
          current: false,
          insideRange: this.insideRange(dateValue),
          border: this.isOnBorderOfDateRange(dateValue),
          disabled: this.isDisabledDay(dateValue),
          dataTestid: this.getDataTestid(dateValue.toString()),
        })
      }

      return days
    },

    hasRange() {
      return this.range[0] !== '' && this.range[1] !== ''
    },
  },

  methods: {
    getDataTestid(key: string) {
      return `sb-datepicker-days-${key}`
    },

    handleDayClick(day: DayItem) {
      if (day.disabled) {
        return
      }
      const value = dayjs(day.date).format()
      this.$emit('update:modelValue', { value, key: 'day' })
    },

    /**
     * get the day of the week
     * @param {dayjs} dayJsInstance
     */
    $_getDayInWeek(dayJsInstance: dayjs.Dayjs) {
      const _day = dayJsInstance.day()
      return _day === 0 ? 7 : _day
    },

    isDateDisabledPast(dateValue: dayjs.Dayjs) {
      return this.disabledPast && dayjs().isAfter(dateValue, 'day')
    },

    isMinDateDisabled(dateValue: dayjs.Dayjs) {
      return this.minDate && dayjs(dateValue).isBefore(this.minDate, 'day')
    },

    isMaxDateDisabled(dateValue: dayjs.Dayjs) {
      return this.maxDate && dayjs(dateValue).isAfter(this.maxDate, 'day')
    },

    isDisabledDay(dateValue: dayjs.Dayjs) {
      return !!(
        this.isDateDisabledPast(dateValue) ||
        this.isMinDateDisabled(dateValue) ||
        this.isMaxDateDisabled(dateValue)
      )
    },

    returnClasses(dayItem: DayItem) {
      return [
        'sb-datepicker-days__item',
        !dayItem.inMonth && 'sb-datepicker-days__item--inactive',
        dayItem.checked && 'sb-datepicker-days__item--active',
        dayItem.current && 'sb-datepicker-days__item--current',
        dayItem.disabled && 'sb-datepicker-days__item--disabled',
        dayItem.insideRange && 'sb-datepicker-days__item--range',
        dayItem.border && 'sb-datepicker-days__item--range-border',
      ]
    },

    insideRange(day: dayjs.Dayjs) {
      const date = dayjs(day.toDate())

      return (
        this.hasRange &&
        date.isBetween(
          this.firstRangeValue,
          dayjs(this.secondRangeValue),
          'day',
          '[]',
        )
      )
    },

    isOnBorderOfDateRange(dateValue: string | dayjs.Dayjs): boolean {
      return (
        dayjs(this.firstRangeValue).isSame(dateValue, 'day') ||
        dayjs(this.secondRangeValue).isSame(dateValue, 'day')
      )
    },
  },
}
</script>
