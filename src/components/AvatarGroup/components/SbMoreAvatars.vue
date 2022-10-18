<template>
  <span>
    <button
      data-testid="sb-more-avatars-btn"
      class="sb-avatar-group__more"
      :aria-expanded="expanded"
      v-bind="$attrs"
      @click="handleClick"
    >
      {{ label }}
    </button>

    <div
      v-show="expanded"
      v-click-outside="handleClickOutside"
      class="sb-avatar-group__avatars"
      :aria-hidden="!expanded"
    >
      <component
        :is="element.type.name"
        v-for="(element, index) of avatars"
        :key="index"
        v-bind="getAvatarAttrs(element)"
      />
    </div>
  </span>
</template>

<script>
import { truncate } from '../../../utils'
import { ClickOutside } from '../../../directives'

const MAX_NAME_LENGTH = 18

export default {
  name: 'SbMoreAvatars',

  directives: {
    ClickOutside,
  },

  props: {
    avatars: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
  },

  emits: ['click'],

  data() {
    return {
      expanded: false,
    }
  },

  methods: {
    getAvatarAttrs(element) {
      const name = truncate(MAX_NAME_LENGTH, element.props.name || '')

      const friendlyName = truncate(
        MAX_NAME_LENGTH,
        element.props.friendlyName || ''
      )

      return {
        ...element.props,
        title: element.props.name || element.props.friendlyName,
        name,
        friendlyName,
        showName: true,
      }
    },

    handleClick(event) {
      this.toggleExpanded()
      this.$emit('click', event)
    },

    toggleExpanded() {
      this.expanded = !this.expanded
    },

    handleClickOutside(event) {
      if (event.target.closest('.sb-avatar-group__more')) {
        return
      }

      this.expanded = false
    },
  },
}
</script>
