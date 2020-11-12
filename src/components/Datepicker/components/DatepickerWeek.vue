<template>
  <div class="sb-datepicker-week">
    <span v-for="weekLabel in weekLabels" :key="weekLabel">
      {{ weekLabel }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'SbDatepickerWeek',

  computed: {
    weekLabels() {
      return ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    },
  },
}
</script>
