<template>
  <div class="sb-datepicker-days">
    <span
      v-for="(dayItem, key) in days"
      :key="key"
      class="sb-datepicker-day"
      :class="{
        'sb-datepicker-day--inactive': !dayItem.inMonth,
        'sb-datepicker-day--active': dayItem.checked,
      }"
      @click="($evt) => handleDayClick(dayItem)"
    >
      {{ dayItem.label }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'SbDatepickerDays',

  props: {
    days: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleDayClick(day) {
      this.$emit('choose-day', day)
    },
  },
}
</script>
