<template>
  <div class="sb-actions-menu" :class="activeClasses">
    <span class="sb-actions-menu__rows-selected">{{
      labelSelectedRowsLength
    }}</span>
    <SbButton
      variant="secondary"
      size="small"
      label="Clear"
      class="sb-actions-menu__btn sb-actions-menu__btn-cancel"
      data-testid="sb-data-table-action__clear"
      @click="$emit('cancel')"
    />
    <SbButton
      v-for="action in actions"
      :key="action.value"
      v-tooltip="{
        label: action.tooltip || action.label,
        position: 'top',
      }"
      variant="secondary"
      size="small"
      :icon="action.icon"
      :has-icon-only="!isOnDesktop"
      :data-testid="`sb-data-table-action__${action.value}`"
      class="sb-actions-menu__btn"
      @click="() => $emit('click', action.value)"
      >{{ action.label }}</SbButton
    >
  </div>
</template>

<script>
import SbButton from '../../Button'
import { Tooltip } from '../../../directives'
import { WindowResizeObserverMixin } from '../../../mixins'
import sharedProps from '../sharedProps'

export default {
  name: 'SbDataTableActions',

  components: {
    SbButton,
  },

  directives: {
    tooltip: Tooltip,
  },

  mixins: [WindowResizeObserverMixin()],
  props: {
    actions: sharedProps.actions,
    hideLabelActionsBreakpoint: sharedProps.hideLabelActionsBreakpoint,
    selectedRows: sharedProps.selectedRows,
    sticky: sharedProps.stickyMenu,
  },
  computed: {
    activeClasses() {
      return {
        'sb-actions-menu--sticky': this.sticky,
      }
    },
    labelSelectedRowsLength() {
      const labelItem = this.selectedRowsLength > 1 ? 'items' : 'item'
      return `${this.selectedRowsLength} ${labelItem} selected`
    },
    selectedRowsLength() {
      return this.selectedRows.length
    },
  },
}
</script>