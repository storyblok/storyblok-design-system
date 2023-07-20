<template>
  <div
    v-tooltip="avatarTooltipAttrs"
    :class="avatarClass"
    :style="avatarStyle"
    v-bind="$attrs"
  >
    <template v-if="showImage">
      <slot>
        <div class="sb-avatar__image">
          <img
            v-show="isImageLoaded"
            :src="src"
            :alt="friendlyName || name"
            @load="handleImageLoad"
            @error="handleImageError"
          />
          <SbIcon
            v-show="!isImageLoaded"
            name="avatar-fallback"
            size="large"
            :color="fallbackAvatarColor"
          />
        </div>
        <SbBadge v-if="!!status" v-bind="badgeAttrs" />
      </slot>
    </template>
    <template v-else-if="name || friendlyName">
      <div :class="avatarInitialsClass">
        <span>{{ initials }}</span>
        <SbBadge v-if="!!status" v-bind="badgeAttrs" />
      </div>
    </template>
    <div v-if="showTextContainer" class="sb-avatar__text-container">
      <span v-if="isDescriptionTop" :class="descriptionClass">
        {{ description }}
      </span>
      <span class="sb-avatar__text">
        {{ friendlyName || name }}
      </span>
      <span v-if="isDescriptionBottom" :class="descriptionClass">
        {{ description }}
      </span>
    </div>
  </div>
</template>

<script>
import { includes } from '../../utils'

import {
  isSizeValid,
  getInitials,
  generateRandomBgColor,
  generateRandomColor,
} from './utils.js'

import SbBadge from '../Badge'
import SbIcon from '../Icon'
import { Tooltip } from '../../directives'

const POSITION_TYPES = ['top', 'bottom']

export default {
  name: 'SbAvatar',

  components: {
    SbBadge,
    SbIcon,
  },

  directives: {
    tooltip: Tooltip,
  },

  props: {
    bgColor: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    descriptionPosition: {
      type: String,
      default: 'top',
      validator: (position) => includes(POSITION_TYPES, position),
    },
    name: {
      type: String,
      default: null,
    },
    friendlyName: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
      validator: isSizeValid,
    },
    showName: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    useTooltip: {
      type: Boolean,
      default: false,
    },
    tooltipVariant: {
      type: String,
      default: 'dark',
    },
    tooltipFullLength: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isImageLoaded: false,
    }
  },

  computed: {
    avatarClass() {
      const avatarSizeClass =
        this.size && this.size !== 'normal' && `sb-avatar--${this.size}`
      return ['sb-avatar', avatarSizeClass]
    },

    avatarStyle() {
      const isBgColorValid = this.bgColor && this.bgColor.startsWith('#')
      const isColorValid = this.color && this.color.startsWith('#')

      return {
        borderColor: isColorValid && this.color,
        borderWidth: isColorValid && '2px',
        backgroundColor: isBgColorValid && this.bgColor,
      }
    },

    avatarInitialsClass() {
      const color =
        this.bgColor || generateRandomBgColor(this.friendlyName || this.name)
      if (color.startsWith('#')) return ['sb-avatar__initials']
      const bgColorClass = this.bgColor ? `bg-${color}` : color

      return ['sb-avatar__initials', bgColorClass]
    },

    descriptionClass() {
      return [
        'sb-avatar__description',
        `sb-avatar__description--${this.descriptionPosition}`,
      ]
    },

    avatarTooltipAttrs() {
      return (
        this.useTooltip && {
          label: this.friendlyName ? this.friendlyName : this.name,
          position: 'bottom',
          variant: this.tooltipVariant,
          isFullLength: this.tooltipFullLength,
        }
      )
    },

    avatarImageAttrs() {
      return this.useTooltip && { tabindex: 0 }
    },

    fallbackAvatarColor() {
      return this.bgColor || generateRandomColor()
    },

    badgeAttrs() {
      return {
        type: this.status,
        contract: true,
      }
    },

    initials() {
      return getInitials(this.friendlyName || this.name)
    },

    showImage() {
      return this.src || (this.$slots?.default && this.$slots.default())
    },

    showDescription() {
      return this.showName && this.description
    },

    showTextContainer() {
      return (
        this.showName && (this.name || this.friendlyName) && !this.useTooltip
      )
    },

    isDescriptionTop() {
      return this.showDescription && this.descriptionPosition === 'top'
    },

    isDescriptionBottom() {
      return this.showDescription && this.descriptionPosition === 'bottom'
    },
  },

  methods: {
    handleImageLoad() {
      this.isImageLoaded = true
    },

    handleImageError() {
      this.isImageLoaded = false
    },
  },
}
</script>
