<template>
  <div class="sb-header" :class="computedClass">
    <div class="sb-header__text-container">
      <h1 class="sb-header__title">{{ title }}</h1>
      <slot name="subtitle">
        <p v-if="subtitleText" class="sb-header__subtitle">
          {{ subtitleText }}
        </p>
      </slot>
    </div>

    <div class="sb-header__buttons-container">
      <slot name="button">
        <SbButton
          v-if="hasButton"
          v-tooltip="buttonTooltip"
          :label="buttonLabel"
          :has-icon-only="isMobileWidth"
          :icon="buttonIcon"
          :is-loading="isLoading"
          :variant="buttonVariant"
          :is-disabled="isLoading || buttonDisabled"
          size="small"
          @click="handleClick"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import SbButton from '../Button'
import { isMobileWidth } from '@/utils/isMobileWidth'

export default {
  name: 'SbHeader',

  components: {
    SbButton,
  },

  props: {
    hasButton: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    subtitleText: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    buttonLabel: {
      type: String,
      default: '',
    },
    buttonIcon: {
      type: String,
      default: 'plus',
    },
    buttonVariant: {
      type: String,
      default: 'primary',
    },
    buttonDisabled: {
      type: Boolean,
      default: false,
    },
    buttonTooltip: {
      type: [Object, String],
      default: '',
    },
  },

  emits: ['button-click'],

  computed: {
    computedClass() {
      return {
        'sb-header--has-button': this.hasButton,
      }
    },
    isMobileWidth,
  },

  methods: {
    handleClick() {
      this.$emit('button-click')
    },
  },
}
</script>
