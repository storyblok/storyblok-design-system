<template>
  <div class="sb-datepicker-days">
    <span
      v-for="(dayItem, key) in days"
      :key="key"
      class="sb-datepicker-days__item"
      :class="{
        'sb-datepicker-days__item--inactive': !dayItem.inMonth,
        'sb-datepicker-days__item--active': dayItem.checked,
      }"
      @click="($evt) => handleDayClick($evt, dayItem)"
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
    value: {
      type: String,
      default: null,
    },
    internalDate: {
      type: String,
      default: null,
    },
  },
  computed: {
    days() {
      const daysInTheMonth = dayjs(this.internalDate).daysInMonth()
      const firstDate = dayjs(this.internalDate).startOf('month')
      const lastDate = dayjs(this.internalDate).endOf('month')
      const days = []

      for (let i = this.$_getDayInWeek(firstDate); i > 1; i--) {
        const dateValue = firstDate.subtract(i, 'day')

        days.push({
          label: dateValue.date(),
          date: dateValue,
          inMonth: false,
          checked: false,
        })
      }

      for (let i = 1; i <= daysInTheMonth; i++) {
        const dateValue = dayjs(this.internalDate).date(i)

        days.push({
          label: i,
          date: dateValue,
          inMonth: true,
          checked: dayjs(this.value).isSame(dateValue),
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
        })
      }

      return days
    },
  },
  methods: {
    handleDayClick($event, day) {
      $event.stopPropagation()
      this.$emit('input', day.date.format())
    },

    /**
     * get the day of the week
     * @param {dayjs} dayJsInstance
     */
    $_getDayInWeek(dayJsInstance) {
      const _day = dayJsInstance.day()
      return _day === 0 ? 7 : _day
    },
  },
}
</script>
