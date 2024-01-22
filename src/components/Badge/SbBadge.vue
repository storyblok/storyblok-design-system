<template>
  <div :class="activeClasses">
    <SbIcon
      v-if="isRenderIcon"
      :name="iconName"
      :data-testid="`${dataTestid}-icon`"
    />
    <span
      v-if="hasLabelToRender"
      class="sb-badge__label"
      :data-testid="`${dataTestid}-active-label`"
    >
      <slot>{{ activeLabel }}</slot>
    </span>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import SbIcon from '../Icon'

import { computed } from 'vue'
import { badgeTypes, mapIconByTypes } from './lib'
import { isValidNumber } from '../../utils'

export default {
  name: 'SbBadge',

  components: {
    SbIcon,
  },

  props: {
    inlineLabel: {
      type: Boolean,
      default: false,
    },
    contract: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    number: {
      type: Number,
      default: null,
    },
    onlyIcon: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      validator: (type) => badgeTypes.indexOf(type) !== -1,
    },
  },

  setup(props, { slots, attrs }) {
    const isRenderIcon = !props.contract && !isValidNumber(props.number)
    const activeLabel = isValidNumber(props.number) ? props.number : props.label
    const isLabelAllowed = !props.contract && !props.onlyIcon
    const hasLabelToRender =
      isLabelAllowed &&
      (props.label || slots.default || isValidNumber(props.number))
    const activeClasses = computed(() => [
      `sb-badge`,
      `sb-badge--${props.type}`,
      {
        'sb-badge--contract': props.contract,
        'sb-badge--only-icon': props.onlyIcon,
        'sb-badge--inline-label': props.inlineLabel,
      },
    ])
    const iconName = computed(() => mapIconByTypes[props.type])
    const dataTestid = computed(() => attrs['data-testid'] || 'sb-badge')

    return {
      isRenderIcon,
      hasLabelToRender,
      activeClasses,
      activeLabel,
      iconName,
      dataTestid,
    }
  },
}
</script>
