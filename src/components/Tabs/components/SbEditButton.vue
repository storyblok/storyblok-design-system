<template>
  <button
    v-tooltip="{
      label: 'New Tab',
      position: 'bottom',
    }"
    class="sb-tab-edit-button"
    aria-label="Edit tab"
    v-on="$listeners"
  >
    <SbIcon name="edit" size="normal" color="light-gray" />
  </button>
</template>

<script>
import { Tooltip } from '../../../directives'
import SbIcon from '../../Icon'

export default {
  name: 'SbEditButton',

  components: {
    SbIcon,
  },

  directives: {
    tooltip: Tooltip,
  },
}
</script>
