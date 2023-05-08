<template>
  <Icon v-if="iconName" class="sb-icon" :class="classes" :icon="iconName" />
  <svg
    v-else
    class="sb-icon"
    :class="classes"
    :role="role ? role : 'presentation'"
    :viewBox="iconDeff.viewBox"
    v-bind="$attrs"
    v-html="iconDeff.path"
  ></svg>
</template>

<script>
import { getSvgIcon, iconSizes, getHeroIcon } from './utils'
import { availableColors } from '../../utils'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

export default {
  name: 'SbIcon',
  components: {
    Icon,
  },
  props: {
    color: {
      type: String,
      default: null,
      validator: (color) => availableColors.indexOf(color) !== -1,
    },
    backgroundColor: {
      type: String,
      default: null,
      validator: (color) => availableColors.indexOf(color) !== -1,
    },
    name: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: 'presentation',
    },
    size: {
      type: String,
      default: null,
      validator: (size) => iconSizes.indexOf(size) !== -1,
    },
  },
  setup(props) {
    // const currentIconSet = localStorage.getItem('icon-collection')
    // const availableIcons = localStorage.getItem('available-icons')
    const classes = computed(() => {
      return {
        'sb-icon': true,
        'sb-icon--no-fill': !props.iconDeff?.fill,
        [`sb-icon--${props.size}`]: props.size,
        [`sb-icon--color-${props.color}`]: props.color,
        [`sb-icon--bg-${props.backgroundColor}`]: props.backgroundColor,
      }
    })

    const iconName = computed(() => {
      const isAvailableIcon = getHeroIcon(props.name)
      if (isAvailableIcon) return isAvailableIcon
      return null
    })

    const iconDeff = computed(() => {
      return getSvgIcon(props.name)
    })
    return { classes, iconName, iconDeff }
  },
}
</script>
