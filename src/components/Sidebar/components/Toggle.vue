<template>
  <div class="sb-sidebar-toggle">
    <SbButton
      data-testid="sidebar-button-toggle"
      size="small"
      has-icon-only
      is-rounded
      tooltip-position="right"
      :icon="icon"
      :icon-description="iconDescription"
    />
  </div>
</template>

<script>
import SbButton from '../../Button'
export default {
  name: 'SbSidebarToggle',

  components: {
    SbButton,
  },

  props: {
    minimize: Boolean,
  },

  computed: {
    iconDescription() {
      return this.minimize ? 'Expand Sidebar' : 'Collapse Sidebar'
    },

    icon() {
      return this.minimize ? 'chevron-right' : 'chevron-left'
    },
  },
}
</script>
