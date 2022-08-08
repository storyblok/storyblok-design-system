<template>
  <div class="sb-card__options">
    <SbMenu>
      <SbMenuButton
        :icon-name="'menu-horizontal'"
        :has-icon-only="true"
        :variant="'tertiary'"
      >
      </SbMenuButton>
      <SbMenuList :items="options" :placement="'bottom-end'"></SbMenuList>
    </SbMenu>
  </div>
</template>
<script>
import { SbMenu, SbMenuButton, SbMenuList } from '../../Menu'

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
