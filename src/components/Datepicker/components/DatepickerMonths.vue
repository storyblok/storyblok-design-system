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
import { MONTHS } from '../utils'
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
  },

  emits: ['update:modelValue'],

  computed: {
    monthsList() {
      return MONTHS.map((month) => {
        return {
          checked: dayjs(this.internalDate).format('MMM') === month,
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
      const monthIndex = MONTHS.indexOf(month)
      const value = dayjs(this.internalDate).month(monthIndex).format()
      this.$emit('update:modelValue', value)
    },
  },
}
</script>
