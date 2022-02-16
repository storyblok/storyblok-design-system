<template>
  <aside
    class="sb-sidebar"
    :class="{
      'sb-sidebar--minimize': minimize,
      'sb-sidebar--active': isMobileOpen,
    }"
  >
    <div class="sb-sidebar__mobile-header">
      <div class="sb-sidebar__mobile-header-menu-icon">
        <button @click="openSidebar">
          <SbIcon name="menu" />
        </button>
      </div>

      <div class="sb-sidebar__mobile-logo">
        <img v-if="logo" class="sb-custom-logo" :src="logo" />
        <SbSidebarLogo v-else variant="dark" />
      </div>

      <div v-if="isMobileOpen" class="sb-sidebar__mobile-header-close-icon">
        <button @click="closeSidebar">
          <SbIcon name="close" />
        </button>
      </div>
    </div>

    <div class="sb-sidebar__content">
      <div class="sb-sidebar__top">
        <img v-if="logo" class="sb-custom-logo" :src="logo" />
        <SbSidebarLogo v-else :minimize="minimize" />
      </div>

      <SbSidebarList>
        <SbSidebarListItem
          v-for="(listItem, index) in listItems"
          :key="index"
          v-bind="listItem"
        />

        <slot />
      </SbSidebarList>

      <div class="sb-sidebar__bottom">
        <slot name="bottom" />

        <SbSidebarToggle :minimize="minimize" @click="toggleMinimizedState" />
      </div>
    </div>
  </aside>
</template>

<script>
import SbIcon from '../Icon'
import {
  SbSidebarList,
  SbSidebarLogo,
  SbSidebarListItem,
  SbSidebarToggle,
} from './components'

export default {
  name: 'SbSidebar',

  components: {
    SbIcon,
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
    minimize: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    isMobileOpen: false,
  }),

  methods: {
    toggleMinimizedState() {
      this.$emit('update:minimize', !this.minimize)
    },

    openSidebar() {
      if (!this.isMobileOpen) {
        this.isMobileOpen = true
        this.$nextTick(() => {
          this.$emit('mobile-open')
        })
      }
    },

    closeSidebar() {
      if (this.isMobileOpen) {
        this.isMobileOpen = false
        this.$nextTick(() => {
          this.$emit('mobile-close')
        })
      }
    },
  },
}
</script>
