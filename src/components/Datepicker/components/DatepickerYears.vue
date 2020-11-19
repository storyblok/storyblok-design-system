<template>
  <div class="sb-datepicker-years">
    <span
      v-for="(yearItem, index) in yearsList"
      :key="index"
      class="sb-datepicker-years__item"
      :class="{ 'sb-datepicker-years__item--active': yearItem.checked }"
      @click="($evt) => handleYearClick($evt, yearItem.label)"
    >
      {{ yearItem.label }}
    </span>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'SbDatepickerYears',

  props: {
    offset: {
      type: Number,
      default: 30,
    },
    value: {
      type: String,
      default: null,
    },
  },

  computed: {
    yearsList() {
      const years = []
      const minYear = this.currentYear - this.offset
      const maxYear = this.currentYear + this.offset

      for (let x = minYear; x <= maxYear; x++) {
        years.push(x)
      }

      return years.map((year) => {
        return {
          label: year,
          checked: year === this.currentYear,
        }
      })
    },

    currentYear() {
      return dayjs(this.value).year()
    },
  },

  methods: {
    /**
     * handle with selected a year item and emit an input event with a new value
     * @param {Event}  $event
     * @param {String} month
     */
    handleYearClick($event, year) {
      $event.stopPropagation()
      const value = dayjs(this.value).year(year).format()

      this.$emit('input', value)
    },
  },
}
</script>
