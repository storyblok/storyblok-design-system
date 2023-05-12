<template>
  <div class="sb-sidebar-link-inner">
    <SbAvatar v-if="hasAvatar" v-bind="avatar" />
    <img
      v-else-if="image"
      :src="image"
      width="22"
      height="22"
      alt="sidebar-icon"
      class="sb-sidebar-sidebar-icon"
    />

    <SbIcon v-else-if="icon" :size="iconSize" :name="icon" />

    <div v-if="hasSeparator" class="sb-separator"></div>

    <span class="sb-sidebar-link__label">
      {{ label }}
      <SbIcon
        v-if="iconTooltip"
        v-tooltip="{
          label: iconTooltipLabel,
          position: 'top',
          variant: 'light',
        }"
        :size="iconTooltipSize"
        :name="iconTooltip"
      />
    </span>

    <SbIcon
      v-if="iconRight"
      :size="iconRightSize"
      :name="iconRight"
      class="sb-icon__right"
    />
  </div>
</template>

<script>
import SbAvatar from '../../Avatar'
import SbIcon from '../../Icon'
import { Tooltip } from '../../../directives'

export default {
  components: { SbAvatar, SbIcon },

  directives: {
    tooltip: Tooltip,
  },

  props: {
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
    hasSeparator: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: null,
    },
  },

  computed: {
    hasAvatar() {
      return this.avatar !== null
    },
  },
}
</script>
