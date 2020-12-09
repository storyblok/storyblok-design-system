<template>
  <div class="sb-datepicker-week">
    <span v-for="weekLabel in weekDays" :key="weekLabel">
      {{ weekLabel }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'SbDatepickerWeek',

  computed: {
    weekDays() {
      return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    },
  },
}
</script>
