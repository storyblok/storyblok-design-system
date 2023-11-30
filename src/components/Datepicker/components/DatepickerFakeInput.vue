<template>
  <div class="sb-datepicker__fake-input">
    <SbIcon
      name="calendar"
      color="light-gray"
      class="sb-textfield__icon sb-textfield__icon--left"
      data-testid="sb-textfield-icon-click"
      @click="handleAction('open-calendar')"
    />
    <p class="sb-datepicker__fake-input--text" :class="{ 'sb-datepicker__fake-input--focus' : focusOnFirst }">{{ prefixPlaceholder }}</p>
    <span class="sb-datepicker__fake-input--separator">-</span>
    <p class="sb-datepicker__fake-input--text" :class="{ 'sb-datepicker__fake-input--focus' : focusOnLast }">{{ sufixPlaceholder }}</p>
    <SbIcon
      name="x-clear"
      color="light-gray"
      class="sb-textfield__icon sb-textfield__icon--right"
      data-testid="sb-textfield-icon-click"
      @click="handleAction('clear')"
    />
  </div>
</template>
<script>
import { FOCUS_ITEM } from '../utils'
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
    focusItem: {
      type: String,
      default: null,
    }
  },

  emits: ['open-calendar', 'clear'],

  computed: {
    prefixPlaceholder() {
      const FORMATS = {
        date: 'YYYY-MM-DD',
        datetime: 'hh:mm',
      }

      return this.prefix ? this.prefix : FORMATS.date
    },

    sufixPlaceholder() {
      const FORMATS = {
        date: 'YYYY-MM-DD',
        time: 'hh:mm',
      }

      return this.sufix ? this.sufix : this.type === 'daterange' ? FORMATS.date : FORMATS.time
    },

    showSeparator() {
      return this.prefix !== null
    },

    focusOnFirst() {
      return this.focusItem === FOCUS_ITEM.FIRST
    },

    focusOnLast() {
      return this.focusItem === FOCUS_ITEM.LAST
    }
  },

  methods: {
    handleAction(action) {
      this.$emit(action)
    },
  }
}
</script>