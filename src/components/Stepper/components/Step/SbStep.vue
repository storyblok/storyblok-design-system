<template>
  <li
    role="step"
    class="sb-step"
    tabindex="-1"
    :class="computedClass"
    :aria-current="isActive && 'step'"
    :data-step-id="stepIndex"
    @click="handleClick"
    @keydown="handleKeyPress"
  >
    <p class="sb-step__label">{{ step.label }}</p>
    <div class="sb-step__marker">
      <SbIcon
        v-if="isCompleted"
        name="check"
        color="primary"
        data-testid="completed"
      />
    </div>
  </li>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import type { Step } from '@/store/modules/App/content'

export default {
  name: 'SbStep',
  props: {
    step: {
      type: Object as PropType<Step>,
      required: true,
    },
    stepIndex: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['step-click', 'step-key-press'],
  computed: {
    computedClass(): Record<string, boolean> {
      return {
        'sb-step--active': this.isActive,
        'sb-step--completed': this.isCompleted,
      }
    },
  },
  methods: {
    handleClick(): void {
      this.$emit('step-click', this.step)
    },
    handleKeyPress(event: KeyboardEvent): void {
      this.$emit('step-key-press', event, this.step)
    },
  },
}
</script>
<style lang="scss">
@import 'step';
</style>
