<template>
  <div class="sb-card__options">
    <SbMenu v-if="options">
      <SbMenuButton
        icon-name="menu-horizontal"
        :has-icon-only="true"
        variant="ghost"
      />
      <SbMenuList :items="options" placement="bottom-end" />
    </SbMenu>
  </div>
</template>

<script>
import { SbMenu, SbMenuButton, SbMenuList } from '../../Menu'
export default {
  name: 'SbCardOptions',
  components: [SbMenu, SbMenuButton, SbMenuList],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log(this.items)
  },
}
</script>
