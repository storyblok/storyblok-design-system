<template>
  <li class="sb-tab-add" data-testid="new-tab-container">
    <button
      v-tooltip="{
        label: newTabLabel,
        position: 'bottom',
      }"
      class="sb-tabs__add-button"
      aria-label="New tab"
    >
      <SbIcon name="plus" size="normal" color="light-gray" />
    </button>
  </li>
</template>

<script lang="ts">
import { Tooltip } from '../../../directives'
import SbIcon from '../../Icon'

export default {
  name: 'SbTabAdd',

  components: {
    SbIcon,
  },

  directives: {
    tooltip: Tooltip,
  },

  props: {
    newTabLabel: {
      type: String,
      default: 'New tab',
    },
  },
}
</script>
