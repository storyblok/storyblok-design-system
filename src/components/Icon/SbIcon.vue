<template>
  <Icon :icon="iconName" :class="classes" />
</template>

<script>
import { iconSizes, getHeroIcon } from './utils'
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
    const classes = {
      'sb-icon': true,
      'sb-icon--no-fill': !props.iconDeff?.fill,
      [`sb-icon--${props.size}`]: props.size,
      [`sb-icon--color-${props.color}`]: props.color,
      [`sb-icon--bg-${props.backgroundColor}`]: props.backgroundColor,
    }

    const iconName = computed(() => {
      return getHeroIcon(props.name) + '-20-solid'
    })
    return { classes, iconName }
  },
}
</script>
