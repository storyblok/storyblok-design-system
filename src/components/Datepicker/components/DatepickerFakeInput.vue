<template>
  <div :class="returnClasses" @click="handleAction('open-calendar')">
    <SbIcon
      name="calendar"
      color="light-gray"
      class="sb-textfield__icon sb-textfield__icon--left"
      data-testid="sb-textfield-icon-click"
    />
    <p
      class="sb-datepicker__fake-input-text"
      :class="{ 'sb-datepicker__fake-input-text--focus': focusOnFirst }"
    >
      {{ prefixPlaceholder }}
    </p>
    <span class="sb-datepicker__fake-input-separator">-</span>
    <p
      class="sb-datepicker__fake-input-text"
      :class="{ 'sb-datepicker__fake-input-text--focus': focusOnLast }"
    >
      {{ suffixPlaceholder }}
    </p>
    <SbIcon
      v-if="showClearIcon"
      v-tooltip="{ label: 'Clear' }"
      name="x-clear"
      color="light-gray"
      class="sb-textfield__icon sb-textfield__icon--right"
      data-testid="sb-textfield-icon-click"
      @click.stop="handleAction('clear')"
    />
  </div>
</template>
<script>
import { FORMATS, COMPONENTS, datepickerOption } from '../utils'
import { Tooltip } from '../../../directives'

import SbIcon from '../../Icon'
export default {
  name: 'SbDatepickerFakeInput',

  directives: {
    tooltip: Tooltip,
  },

  components: { SbIcon },

  props: {
    type: {
      type: String,
      default: 'datetime',
    },
    prefix: {
      type: String,
      default: null,
    },
    suffix: {
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

    suffixPlaceholder() {
      return this.suffix
        ? this.suffix
        : this.type === datepickerOption.daterange
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

    isDateRangeType() {
      return this.type === datepickerOption.daterange
    },

    hasValues() {
      return this.prefix !== '' || this.suffix !== ''
    },

    focusOnFirst() {
      if (this.isDateRangeType && this.isOverlayVisible) {
        return this.prefix === ''
      }
      return false
    },

    focusOnLast() {
      if (this.isDateRangeType && this.isOverlayVisible) {
        return this.hasValues
      }
      return false
    },

    showClearIcon() {
      return this.hasValues
    },

    returnClasses() {
      return [
        'sb-datepicker__fake-input',
        !this.hasValues && 'sb-datepicker__fake-input-placeholder',
      ]
    },
  },

  methods: {
    handleAction(action) {
      this.$emit(action)
    },
  },
}
</script>
