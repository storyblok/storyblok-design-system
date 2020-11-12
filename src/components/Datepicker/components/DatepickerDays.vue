<template>
  <div class="sb-datepicker-days">
    <span v-for="dayItem in dayList" :key="dayItem">{{ dayItem }}</span>
  </div>
</template>

<script>
export default {
  name: 'SbDatepickerDays',

  computed: {
    dayList() {
      const days = []

      for (let i = 0; i < 42; i++) {
        days.push(i)
      }

      return days
    },
  },
}
</script>
