<template>
  <li
    class="sb-sidebar-item"
    :class="computedClasses"
    :aria-label="ariaLabelText"
    :aria-current="active && active + ''"
  >
    <router-link
      v-if="isRouterLink"
      class="sb-sidebar-link"
      :class="computedLinkClasses"
      v-bind="$attrs"
      :to="to"
      v-on="$listeners"
    >
      <ListItemInner
        :avatar="avatar"
        :icon-size="iconSize"
        :icon="icon"
        :icon-right="iconRight"
        :icon-right-size="iconRightSize"
        :icon-tooltip="iconTooltip"
        :icon-tooltip-size="iconTooltipSize"
        :icon-tooltip-label="iconTooltipLabel"
        :has-separator="hasSeparator"
        :label="label"
      />
    </router-link>
    <component
      :is="as"
      v-else
      class="sb-sidebar-link"
      :class="computedLinkClasses"
      v-bind="$attrs"
      :href="href"
      v-on="$listeners"
    >
      <ListItemInner
        :avatar="avatar"
        :icon-size="iconSize"
        :icon="icon"
        :icon-right="iconRight"
        :icon-right-size="iconRightSize"
        :icon-tooltip="iconTooltip"
        :icon-tooltip-size="iconTooltipSize"
        :icon-tooltip-label="iconTooltipLabel"
        :has-separator="hasSeparator"
        :label="label"
      />
    </component>
    <slot />
  </li>
</template>

<script>
import ListItemInner from './ListItemInner.vue'

export default {
  name: 'SbSidebarListItem',

  components: {
    ListItemInner,
  },

  inheritAttrs: false,

  props: {
    active: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      default: null,
    },
    as: {
      type: String,
      default: 'a',
    },
    href: {
      type: String,
      default: null,
    },
    avatar: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    iconSize: {
      type: String,
      default: 'normal',
    },
    iconRight: {
      type: String,
      default: null,
    },
    iconRightSize: {
      type: String,
      default: 'normal',
    },
    iconTooltip: {
      type: String,
      default: null,
    },
    iconTooltipSize: {
      type: String,
      default: 'normal',
    },
    iconTooltipLabel: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object],
      default: null,
    },
    hasSeparator: {
      type: Boolean,
      default: false,
    },
    hasChildren: {
      type: Boolean,
      default: false,
    },
    isChild: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    computedClasses() {
      return {
        'sb-sidebar-item--active': this.active,
        'sb-sidebar-item--parent': this.hasChildren,
        'sb-sidebar-item--child': this.isChild,
      }
    },
    computedLinkClasses() {
      return {
        'sb-sidebar-link--active': this.active,
        'sb-sidebar-link--use-avatar': this.hasAvatar,
      }
    },
    isRouterLink() {
      return this.as === 'router-link'
    },
    ariaLabelText() {
      if (this.ariaLabel) {
        return this.active ? this.ariaLabel + ', Current Page' : this.ariaLabel
      }
      return this.label
    },
  },
}
</script>
