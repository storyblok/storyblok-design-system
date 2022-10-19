<template>
  <div :class="avatarGroupClass">
    <component
      :is="element.componentOptions.tag"
      v-for="(element, index) of visibleAvatars"
      :key="element.name"
      v-bind="getAvatarAttrs(element, index)"
    />
    <SbMoreAvatars
      v-if="totalHiddenAvatars"
      ref="moreAvatars"
      :avatars="hiddenAvatars"
      :label="moreAvatarsLabel"
      @click="handleMoreAvatarsClick"
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

  emits: ['click'],

  data() {
    return {
      isVisibleDropdown: false,
    }
  },

  computed: {
    avatars() {
      return this.$slots.default.filter(({ tag }) => tag)
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
        ...element.componentOptions.propsData,
        useTooltip: true,
        size: this.size,
        bgColor: availableColors[index],
      }
    },

    handleMoreAvatarsClick(event) {
      this.$emit('click', event)
    },

    handleMoreAvatarsKeydown(event) {
      if (event.key === 'Escape') {
        this.closeDropdown()
      }
    },
  },
}
</script>
