<template>
  <div class="sb-datepicker-time">
    <div class="sb-datepicker-time__number-container">
      <div class="sb-datepicker-time__number">
        <div v-for="hour in options.hours" :key="hour.value">
          {{ hour.value }}
        </div>
      </div>

      <div class="sb-datepicker-time__number">
        <div v-for="minute in options.minutes" :key="minute.value">
          {{ minute.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function generateHours() {
  const list = []
  let hour = 24
  while (hour > 0) {
    hour--
    list.push({
      checked: false,
      value: hour < 10 ? '0' + hour : hour,
    })
  }
  return list
}

function generateMinutes() {
  const list = []
  let min = 60
  while (min > 0) {
    min--
    list.push({
      checked: false,
      value: min < 10 ? '0' + min : min,
    })
  }
  return list
}

export default {
  name: 'SbDatepickerTime',

  data: () => ({
    options: {
      hours: generateHours(),
      minutes: generateMinutes(),
    },
  }),
}
</script>
