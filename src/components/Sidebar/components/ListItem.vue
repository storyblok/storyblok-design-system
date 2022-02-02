<template>
  <li
    class="sb-sidebar-item"
    :class="{
      'sb-sidebar-item--active': active,
    }"
  >
    <component
      :is="as"
      class="sb-sidebar-link"
      :class="{
        'sb-sidebar-link--active': active,
        'sb-sidebar-link--use-avatar': hasAvatar,
      }"
      v-bind="$attrs"
      :href="href"
      :to="to"
      :aria-label="ariaLabelText"
      :aria-current="active && active + ''"
      v-on="$listeners"
    >
      <SbAvatar v-if="hasAvatar" v-bind="avatar" />

      <SbIcon v-else-if="hasIcon" :size="iconSize" :name="icon" />

      <span class="sb-sidebar-link__label">
        {{ label }}
      </span>

      <SbIcon
        v-if="hasIconBefore"
        :size="iconBeforeSize"
        :name="iconBefore"
        class="sb-icon__before"
      />
    </component>

    <slot />
  </li>
</template>

<script>
import SbAvatar from '../../Avatar'
import SbIcon from '../../Icon'

export default {
  name: 'SbSidebarListItem',

  components: { SbAvatar, SbIcon },

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
    avatar: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    href: {
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
    iconBefore: {
      type: String,
      default: null,
    },
    iconBeforeSize: {
      type: String,
      default: 'normal',
    },
    to: {
      type: [String, Object],
      default: null,
    },
  },

  computed: {
    ariaLabelText() {
      return this.active ? this.ariaLabel + ', Current Page' : this.ariaLabel
    },

    hasAvatar() {
      return this.avatar !== null
    },

    hasIconBefore() {
      return this.iconBefore !== null
    },

    hasIcon() {
      return this.icon
    },
  },
}
</script>
