<template>
  <div class="sb-datepicker__fake-input">
    <SbIcon
      name="calendar"
      color="light-gray"
      class="sb-textfield__icon sb-textfield__icon--left"
      data-testid="sb-textfield-icon-click"
      @click="handleAction('open-calendar')"
    />
    <p
      class="sb-datepicker__fake-input--text"
      :class="{ 'sb-datepicker__fake-input--focus': focusOnFirst }"
    >
      {{ prefixPlaceholder }}
    </p>
    <span class="sb-datepicker__fake-input--separator">-</span>
    <p
      class="sb-datepicker__fake-input--text"
      :class="{ 'sb-datepicker__fake-input--focus': focusOnLast }"
    >
      {{ sufixPlaceholder }}
    </p>
    <SbIcon
      v-if="showClearIcon"
      v-tooltip="{ label: 'Clear' }"
      name="x-clear"
      color="light-gray"
      class="sb-textfield__icon sb-textfield__icon--right"
      data-testid="sb-textfield-icon-click"
      @click="handleAction('clear')"
    />
  </div>
</template>
<script>
import { FORMATS, COMPONENTS } from '../utils'
export default {
  name: 'SbDatepickerFakeInput',

  props: {
    type: {
      type: String,
      default: 'datetime',
    },
    prefix: {
      type: String,
      default: null,
    },
    sufix: {
      type: String,
      default: null,
    },
    view: {
      type: String,
      default: null,
    },
    isOverlayVisible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['open-calendar', 'clear'],

  computed: {
    prefixPlaceholder() {
      return this.prefix ? this.prefix : FORMATS.date
    },

    sufixPlaceholder() {
      return this.sufix
        ? this.sufix
        : this.type === 'daterange'
        ? FORMATS.date
        : FORMATS.time
    },

    showSeparator() {
      return this.prefix !== null
    },

    isCalendarView() {
      return this.view === COMPONENTS.CALENDAR
    },

    isTimeView() {
      return this.view === COMPONENTS.TIME
    },

    focusOnFirst() {
      return this.isOverlayVisible && this.prefix === '' && this.isCalendarView
    },

    focusOnLast() {
      return (
        (this.isOverlayVisible && this.sufix === '' && this.isTimeView) ||
        (this.prefix !== '' && this.sufix === '')
      )
    },

    showClearIcon() {
      return this.prefix !== '' || this.sufix !== ''
    },
  },

  methods: {
    handleAction(action) {
      this.$emit(action)
    },
  },
}
</script>
