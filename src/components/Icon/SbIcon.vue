<template>
  <Icon v-if="iconName" :icon="iconName" :class="classes" />
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
      const isHeroIcon = getHeroIcon(props.name)
      if (isHeroIcon) return getHeroIcon(props.name) + '-20-solid'
      return null
    })

    const iconDeff = computed(() => {
      return getSvgIcon(props.name)
    })
    return { classes, iconName, iconDeff }
  },
}
</script>
