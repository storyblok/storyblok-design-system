<template>
  <div :class="avatarGroupClass">
    <component
      :is="element.type.name"
      v-for="(element, index) of visibleAvatars"
      :key="element.name"
      v-bind="getAvatarAttrs(element, index)"
    />
    <SbMoreAvatars
      v-if="totalHiddenAvatars"
      ref="moreAvatars"
      :avatars="hiddenAvatars"
      :label="moreAvatarsLabel"
      @toggle-avatars-dropdown="handleMoreAvatarsClick"
      @keydown="handleMoreAvatarsKeydown"
    />
  </div>
</template>

<script>
import { isSizeValid } from '../Avatar/utils'

import { availableColors } from '../../utils'

import SbAvatar from '../Avatar/SbAvatar'
import SbMoreAvatars from './components/SbMoreAvatars'

export default {
  name: 'SbAvatarGroup',

  components: {
    SbAvatar,
    SbMoreAvatars,
  },

  props: {
    darkBg: Boolean,
    maxElements: {
      type: Number,
      default: 5,
    },
    size: {
      type: String,
      default: null,
      validator: isSizeValid,
    },
  },

  emits: ['click', 'toggle-visible-dropdown'],

  data() {
    return {
      isVisibleDropdown: false,
    }
  },

  computed: {
    avatars() {
      const children = this.$slots.default && this.$slots.default()
      const useGrandchildren =
        children &&
        children.length === 1 &&
        children[0].children &&
        children[0].children[0].type.name === 'SbAvatar'
      const avatarChildren = useGrandchildren ? children[0].children : children
      return avatarChildren.filter(({ type }) => type.name === 'SbAvatar')
    },

    totalAvatars() {
      return this.avatars.length
    },

    visibleAvatars() {
      return this.avatars.slice(0, this.maxElements)
    },

    hiddenAvatars() {
      const hiddenAvatarsIndex = this.maxElements - this.totalAvatars

      return hiddenAvatarsIndex < 0
        ? this.avatars.slice(hiddenAvatarsIndex)
        : []
    },

    totalHiddenAvatars() {
      return this.hiddenAvatars.length
    },

    avatarGroupClass() {
      const sizeClass = this.size && `sb-avatar-group--${this.size}`
      const darkBgClass = this.darkBg && `sb-avatar-group--dark-bg`

      return ['sb-avatar-group', sizeClass, darkBgClass]
    },

    moreAvatarsLabel() {
      const { totalHiddenAvatars } = this
      return `+${totalHiddenAvatars}`
    },
  },

  methods: {
    getAvatarAttrs(element, index) {
      return {
        ...element.props,
        useTooltip: true,
        size: this.size,
        bgColor: availableColors[index],
      }
    },

    handleMoreAvatarsClick() {
      this.isVisibleDropdown = !this.isVisibleDropdown
      this.$emit('toggle-visible-dropdown', {
        isVisibleDropdown: this.isVisibleDropdown,
      })
    },

    handleMoreAvatarsKeydown(event) {
      if (event.key === 'Escape') {
        this.closeDropdown()
      }
    },
  },
}
</script>
