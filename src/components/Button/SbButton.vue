<template>
  <button
    v-tooltip="useTooltipDirective"
    :class="activeClasses"
    :disabled="isDisabled || isLoading"
    :ariaDisabled="isDisabled || isLoading"
    :type="type"
    v-on="$listeners"
    @click="handleClick"
  >
    <SbLoading
      v-if="isLoading"
      type="spinner"
      size="small"
      :color="loadingColor"
    />
    <template v-else>
      <SbIcon v-if="icon" :size="iconSize" :name="icon" :color="iconColor" />
      <span v-if="!hasIconOnly" class="sb-button__label"
        ><slot>{{ label }}</slot></span
      >
      <SbIcon
        v-if="iconRight"
        :size="iconSize"
        :name="iconRight"
        :color="iconColor"
      />
    </template>
  </button>
</template>

<script>
import { Tooltip } from '../../directives'
import { sharedProps } from './lib'
import SbIcon from '../Icon'
import SbLoading from '../Loading'

export default {
  components: {
    SbIcon,
    SbLoading,
  },
  directives: {
    tooltip: Tooltip,
  },
  props: {
    hasIconOnly: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    iconColor: {
      type: String,
      default: null,
    },
    iconSize: {
      type: String,
      default: 'normal',
    },
    iconRight: {
      type: String,
      default: null,
    },
    iconDescription: {
      type: String,
      default: null,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isFullWidth: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isRounded: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    tooltipPosition: {
      type: String,
      default: 'bottom',
    },
    ...sharedProps,
  },

  emits: ['click'],

  computed: {
    activeClasses() {
      return [
        'sb-button',
        `sb-button--${this.variant}`,
        {
          'sb-button--disabled': this.isDisabled,
          'sb-button--small': this.size === 'small',
          'sb-button--large': this.size === 'large',
          'sb-button--full': this.isFullWidth,
          'sb-button--rounded': this.isRounded,
          'sb-button--has-icon-only': this.hasIconOnly,
          'sb-button--has-icon': this.icon,
          'sb-button--has-icon-right': this.iconRight,
          'sb-button--loading': this.isLoading,
        },
      ]
    },
    useTooltipDirective() {
      if (this.hasIconOnly && this.iconDescription) {
        return {
          label: this.iconDescription,
          position: this.tooltipPosition,
        }
      }
      return false
    },
    loadingColor() {
      const whiteLoading = [
        'primary',
        'secondary',
        'danger',
        'caution',
        'inverted-link',
        'primary-link',
      ]
      return whiteLoading.indexOf(this.variant) < 4 ? 'white' : 'primary-dark'
    },
  },
  methods: {
    handleClick($event) {
      if (!this.isDisabled || !this.isLoading) {
        this.$emit('click', $event)
      }
    },
  },
}
</script>
