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

      <div class="sb-sidebar__mobile-logo" @click="closeSidebar">
        <img
          v-if="logo"
          class="sb-custom-logo"
          :src="logo"
          alt="Custom Sidebar Logo"
        />
        <SbSidebarLogo v-else variant="dark" />
      </div>
    </div>

    <div v-click-outside="$_sidebarClose" class="sb-sidebar__content">
      <div class="sb-sidebar__top">
        <img
          v-if="logo"
          class="sb-custom-logo"
          :src="logo"
          alt="Custom Sidebar Logo"
        />
        <SbSidebarLogo v-else :minimize="minimize" />
      </div>

      <SbSidebarList>
        <div class="sb-sidebar-list__container transparent-scroll">
          <SbSidebarListItem
            v-for="(listItem, index) in listItems"
            :key="index"
            v-bind="listItem"
          />

          <slot />
          <span v-if="hasScrollbar" class="sb-sidebar-list__fade"></span>
        </div>
      </SbSidebarList>

      <div class="sb-sidebar__bottom">
        <slot name="bottom" />

        <SbSidebarToggle :minimize="minimize" @click="toggleMinimizedState" />
      </div>
    </div>
  </aside>
</template>

<script>
import { ClickOutside } from '../../directives'

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

  directives: {
    ClickOutside,
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
    maxWidth: {
      type: String,
      default: '1000px',
      required: false,
    },
  },

  emits: ['mobile-close', 'mobile-open', 'update:minimize'],

  data: () => ({
    isMobileOpen: false,
    hasScrollbar: false,
    sizeObserver: null,
  }),

  mounted() {
    this.toggleSidebar()
    this.$nextTick(this.createObserver)
  },

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

    createObserver() {
      if (window.ResizeObserver) {
        this.sizeObserver = new ResizeObserver(() => {
          this.checkScrollbar()
        })

        this.sizeObserver.observe(
          document.getElementsByClassName('sb-sidebar-list__container')[0]
        )
      }

      // Used onresize here because if we observe a certain element with Resize Observer when manually expanding/collapsing the sidebar, it has no effect
      window.onresize = () => this.toggleSidebar()
    },

    checkScrollbar() {
      const list = document.getElementsByClassName(
        'sb-sidebar-list__container'
      )[0]
      if (list) {
        this.hasScrollbar = list.scrollHeight > list.clientHeight
      }
    },

    toggleSidebar() {
      if (window.matchMedia) {
        const maxWidth = `(max-width: ${this.maxWidth})`
        this.$emit('update:minimize', window.matchMedia(maxWidth).matches)
      }
    },

    $_sidebarClose(e) {
      if (!this.$el.contains(e.target) && this.isMobileOpen) {
        this.closeSidebar()
      }
    },
  },
}
</script>
