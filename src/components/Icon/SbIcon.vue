<template>
  <svg :class="classes" :role="role" :viewBox="viewBox" v-html="iconPath"></svg>
</template>

<script>
import { getSvgIcon, iconSizes } from './utils'
import { availableColors } from '../../utils'

export default {
  name: 'SbIcon',
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
      required: true,
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
    const icon = getSvgIcon(props.name)
    const sizeClass = props.size ? `sb-icon--${props.size}` : null
    const colorClass = props.color ? `sb-icon--color-${props.color}` : null
    const bgClass = props.backgroundColor
      ? `sb-icon--bg-${props.backgroundColor}`
      : null

    const classes = ['sb-icon', sizeClass, colorClass, bgClass]

    const role = props.role || 'presentation'
    const viewBox = icon.viewBox

    return {
      classes,
      iconPath: icon.path,
      role,
      viewBox,
    }
  },
}
</script>
