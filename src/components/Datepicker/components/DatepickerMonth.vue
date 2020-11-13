<template>
  <div class="sb-datepicker-month">
    <button
      class="sb-datepicker-month__button"
      :disabled="disabled"
      @click="($evt) => $emit('previous-month', $evt)"
    >
      <SbIcon name="chevron-left" size="small" :color="iconColor" />
    </button>

    <span class="sb-datepicker-month__label">{{ label }}</span>

    <button
      class="sb-datepicker-month__button"
      :disabled="disabled"
      @click="($evt) => $emit('next-month', $evt)"
    >
      <SbIcon name="chevron-right" size="small" :color="iconColor" />
    </button>
  </div>
</template>

<script>
import SbIcon from '../../Icon'

export default {
  name: 'SbDatepickerMonth',

  components: { SbIcon },

  props: {
    currentMonth: {
      type: String,
      default: null,
    },
    currentYear: {
      type: String,
      default: null,
    },
    disabled: Boolean,
    value: {
      type: String,
      default: null,
    },
  },

  computed: {
    iconColor() {
      return this.disabled ? 'light-gray' : 'primary-dark'
    },

    label() {
      if (this.value) {
        return this.value
      }

      return `${this.currentMonth}, ${this.currentYear}`
    },
  },
}
</script>
