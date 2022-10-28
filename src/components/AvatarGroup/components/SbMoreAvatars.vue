<template>
  <span>
    <button
      data-testid="sb-more-avatars-btn"
      class="sb-avatar-group__more"
      :aria-expanded="expanded"
      @click="handleClick"
      v-on="$listeners"
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
        :is="element.componentOptions.tag"
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
      const name = truncate(
        MAX_NAME_LENGTH,
        element.componentOptions.propsData.name || ''
      )

      const friendlyName = truncate(
        MAX_NAME_LENGTH,
        element.componentOptions.propsData.friendlyName || ''
      )

      return {
        ...element.componentOptions.propsData,
        title:
          element.componentOptions.propsData.name ||
          element.componentOptions.propsData.friendlyName,
        name,
        friendlyName,
        showName: true,
      }
    },

    handleClick() {
      this.toggleExpanded()
    },

    toggleExpanded() {
      this.expanded = !this.expanded
      this.$emit('toggle-avatars-dropdown', {
        isExpanded: this.expanded,
      })
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
