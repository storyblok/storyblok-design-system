<template>
  <div class="sb-datepicker-months">
    <span
      v-for="(monthItem, index) in monthsList"
      :key="index"
      class="sb-datepicker-months__item"
      :class="{ 'sb-datepicker-months__item--active': monthItem.checked }"
      :data-testid="monthItem.dataTestid"
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
    modelValue: {
      type: String,
      default: null,
    },
    internalDate: {
      type: String,
      default: null,
    },
    dataTestid: {
      type: String,
      default: null,
    },
  },

  emits: ['update:modelValue'],

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
          checked: dayjs(this.internalDate).format('MMM') === month,
          label: month,
          dataTestid: `${this.dataTestid}-month-${month}`,
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
      const value = dayjs(this.internalDate).month(monthIndex).format()
      this.$emit('update:modelValue', value)
    },
  },
}
</script>
