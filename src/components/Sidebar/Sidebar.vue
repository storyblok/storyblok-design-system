<template>
  <aside
    class="sb-sidebar"
    :class="{
      'sb-sidebar--minimize': this.minimize,
    }"
  >
    <div class="sb-sidebar__top">
      <SbSidebarLogo :minimize="minimize" />
    </div>

    <SbSidebarList>
      <SbSidebarListItem
        v-for="(listItem, index) in listItems"
        :key="index"
        v-bind="listItem"
      />
    </SbSidebarList>

    <div class="sb-sidebar__bottom">
      <slot name="bottom" />

      <SbSidebarToggle :minimize="minimize" @click="toggleMinimizedState" />
    </div>
  </aside>
</template>

<script>
import {
  SbSidebarList,
  SbSidebarLogo,
  SbSidebarListItem,
  SbSidebarToggle,
} from './components'

export default {
  name: 'SbSidebar',

  components: {
    SbSidebarList,
    SbSidebarLogo,
    SbSidebarListItem,
    SbSidebarToggle,
  },

  props: {
    listItems: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      default: () => ({}),
    },
    minimize: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    toggleMinimizedState() {
      this.$emit('update:minimize', !this.minimize)
    },
  },
}
</script>
