<template>
  <div class="sb-datepicker-months">
    <span
      v-for="(monthItem, index) in monthsList"
      :key="index"
      class="sb-datepicker-months__item"
      :class="{ 'sb-datepicker-months__item--active': monthItem.checked }"
      @click="($evt) => handleMonthClick($evt, monthItem.label)"
    >
      {{ monthItem.label }}
    </span>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'SbDatepickerMonths',

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

  data: () => ({
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  }),

  computed: {
    monthsList() {
      return this.months.map((month) => {
        return {
          checked: dayjs(this.value).format('MMM') === month,
          label: month,
        }
      })
    },
  },

  methods: {
    /**
     * handle with selected a month item and emit an input event with a new value
     * @param {Event}  $event
     * @param {String} month
     */
    handleMonthClick($event, month) {
      $event.stopPropagation()
      const monthIndex = this.months.indexOf(month)
      const value = dayjs(this.value).month(monthIndex).format()
      this.$emit('input', value)
    },
  },
}
</script>
