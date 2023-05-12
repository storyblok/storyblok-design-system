<template>
  <div class="sb-card__options">
    <SbMenu>
      <SbMenuButton
        icon-name="more-horizontal"
        has-icon-only
        variant="tertiary"
      />
      <SbMenuList :items="options" placement="bottom-end" />
    </SbMenu>
  </div>
</template>
<script>
import { SbMenu, SbMenuButton, SbMenuList } from '../Menu'
export default {
  name: 'SbCardOptions',
  components: {
    SbMenu,
    SbMenuButton,
    SbMenuList,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
