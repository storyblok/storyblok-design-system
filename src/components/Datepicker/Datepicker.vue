<template>
  <div class="sb-datepicker">
    <div class="sb-datepicker-input"></div>

    <div class="sb-datepicker-overlay">
      <div class="sb-datepicker-header">
        <SbDatepickerMonth
          current-month="Oct"
          current-year="2020"
          :disabled="isTimeActive"
        />

        <SbDatepickerWeek v-if="isDatetimeType" />

        <span v-else class="sb-datepicker-time__label">
          Choose exact time
        </span>
      </div>

      <SbDatepickerDays v-if="isDatetimeType" />

      <SbDatepickerTime v-else />

      <div class="sb-datepicker-actions">
        <button
          class="sb-datepicker-actions__button"
          @click="handleCancelAction"
        >
          Cancel
        </button>

        <button
          class="sb-datepicker-actions__button sb-datepicker-actions__button--primary"
          @click="handleDoneAction"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SbDatepickerMonth from './components/DatepickerMonth'
import SbDatepickerTime from './components/DatepickerTime'
import SbDatepickerDays from './components/DatepickerDays'
import SbDatepickerWeek from './components/DatepickerWeek'

export default {
  name: 'SbDatepicker',

  components: {
    SbDatepickerMonth,
    SbDatepickerWeek,
    SbDatepickerDays,
    SbDatepickerTime,
  },

  props: {
    placeholder: {
      type: String,
      default: null,
    },

    value: {
      type: String,
      default: null,
      required: true,
    },

    type: {
      type: String,
      default: 'datetime',
    },
  },

  computed: {
    isDatetimeType() {
      return this.type === 'datetime'
    },

    isTimeActive() {
      return !this.isDatetimeType
    },
  },

  methods: {
    handleCancelAction() {},

    handleDoneAction() {},
  },
}
</script>
