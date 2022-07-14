<template>
  <div :class="returnLoadingClasses">
    <div v-if="type !== 'placeholder'">
      <progress
        v-if="type === 'bar'"
        id="progress-bar-loading"
        class="sb-loading__bar"
        :value="value"
        min="0"
        max="100"
      />
      <SbIcon
        v-if="type === 'spinner'"
        :size="size"
        name="loading"
        :color="color"
      />
      <label
        v-if="showPercentage"
        :class="returnLabelFor"
        :for="returnLabelFor"
      >
        {{ valueLabel }}
      </label>
    </div>
    <slot v-else />
  </div>
</template>
<script>
import SbIcon from '../../Icon'
import { sharedProps } from '../utils'

export default {
  name: 'LoadingElement',

  components: {
    SbIcon,
  },

  props: {
    ...sharedProps,
  },

  computed: {
    returnLoadingClasses() {
      return [
        'sb-loading',
        this.uiBlock && 'sb-loading__block',
        this.returnIsBar && 'sb-loading__progress-bar',
        this.returnIsSpinner && 'sb-loading__spinner',
        this.returnSizeOfSpinner,
      ]
    },

    returnIsBar() {
      return this.type === 'bar'
    },

    returnIsSpinner() {
      return this.type === 'spinner'
    },

    valueLabel() {
      return `${parseInt(this.value)}%`
    },

    returnLabelFor() {
      return this.returnIsBar
        ? 'sb-loading__bar-label'
        : 'sb-loading__spinner-label'
    },

    returnSizeOfSpinner() {
      if (this.returnIsSpinner) {
        return `sb-loading__spinner--${this.size || 'large'}`
      }
      return ''
    },
  },
}
</script>
