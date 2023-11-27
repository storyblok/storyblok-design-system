<template>
  <div class="sb-datepicker-days">
    <span
      v-for="(dayItem, key) in days"
      :key="key"
      :class="returnClasses(dayItem)"
      @click.stop="handleDayClick(dayItem)"
    >
      {{ dayItem.label }}
    </span>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'SbDatepickerDays',

  props: {
    modelValue: {
      type: String,
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
  },

  emits: ['update:modelValue'],
  computed: {
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
          disabled: this.isDisabledDay(dateValue),
        })
      }

      for (let i = 1; i <= daysInTheMonth; i++) {
        const dateValue = dayjs(this.internalDate).date(i)

        days.push({
          label: i,
          date: dateValue,
          inMonth: true,
          checked: dayjs(this.modelValue).isSame(dateValue, 'day'),
          current: dayjs().isSame(dateValue, 'day'),
          disabled: this.isDisabledDay(dateValue),
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
          disabled: this.isDisabledDay(dateValue),
        })
      }

      return days
    },
  },
  methods: {
    handleDayClick(day) {
      if (day.disabled) {
        return
      }
      this.$emit('update:modelValue', day.date.format())
    },

    /**
     * get the day of the week
     * @param {dayjs} dayJsInstance
     */
    $_getDayInWeek(dayJsInstance) {
      const _day = dayJsInstance.day()
      return _day === 0 ? 7 : _day
    },

    isDateDisabledPast(dateValue) {
      return this.disabledPast && dayjs().isAfter(dateValue, 'day')
    },

    isMinDateDisabled(dateValue) {
      return this.minDate && dayjs(dateValue).isBefore(this.minDate, 'day')
    },

    isMaxDateDisabled(dateValue) {
      return this.maxDate && dayjs(dateValue).isAfter(this.maxDate, 'day')
    },

    isDisabledDay(dateValue) {
      return !!(
        this.isDateDisabledPast(dateValue) ||
        this.isMinDateDisabled(dateValue) ||
        this.isMaxDateDisabled(dateValue)
      )
    },

    returnClasses(dayItem) {
      return [
        'sb-datepicker-days__item',
        !dayItem.inMonth && 'sb-datepicker-days__item--inactive',
        dayItem.checked && 'sb-datepicker-days__item--active',
        dayItem.current && 'sb-datepicker-days__item--current',
        dayItem.disabled && 'sb-datepicker-days__item--disabled',
      ]
    },
  },
}
</script>
