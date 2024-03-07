<template>
  <nav class="sb-stepper">
    <ol ref="stepperList" class="sb-stepper-list">
      <SbStep
        v-for="(step, index) in steps"
        :key="step._uid"
        :step="step"
        :step-index="index"
        :is-active="isCurrentStep(index)"
        :is-completed="isCompletedStep(index)"
        @step-click="navigateToStep"
        @step-key-press="handleStepKeyPress"
      />
    </ol>
  </nav>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import type { Step } from './types'
export default {
  name: 'SbStepper',
  props: {
    steps: {
      type: Array as PropType<Step[]>,
      required: true,
      default: () => [],
    },
    stepIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ['step-index-change'],
  data() {
    return {
      currentStepIndex: this.stepIndex,
    }
  },
  watch: {
    currentStepIndex(index: number): void {
      this.$emit('step-index-change', index)
    },
    stepIndex(index: number): void {
      this.currentStepIndex = index
    },
  },
  methods: {
    handleStepKeyPress(event: KeyboardEvent, step: Step) {
      switch (event.code) {
        case 'ArrowRight':
          this.navigateToNextStep(event)
          break
        case 'ArrowLeft':
          this.navigateToPreviousStep(event)
          break
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          this.navigateToStep(step)
          break
        case 'Tab':
        default:
          break
      }
    },
    navigateToNextStep(event: KeyboardEvent) {
      const stepElement = event.target as HTMLElement
      const nextStepIndex = +stepElement.getAttribute('data-step-id')! + 1
      const nextStepElement = stepElement.nextElementSibling as HTMLElement

      if (
        nextStepElement &&
        (this.isCompletedStep(nextStepIndex) ||
          this.isCurrentStep(nextStepIndex))
      ) {
        this.setFocusOnStep(stepElement, nextStepElement)
      }
    },
    navigateToPreviousStep(event: KeyboardEvent) {
      const stepElement = event.target as HTMLElement
      const previousStepIndex = +stepElement.getAttribute('data-step-id')! - 1
      const previousStepTarget =
        stepElement.previousElementSibling as HTMLElement

      if (
        previousStepTarget &&
        (this.isCompletedStep(previousStepIndex) ||
          this.isCurrentStep(previousStepIndex))
      ) {
        this.setFocusOnStep(stepElement, previousStepTarget)
      }
    },
    isStepFocusable(
      focusableTarget: HTMLElement | null,
      stepIndex: number,
    ): boolean {
      return (
        !!focusableTarget &&
        (this.isCompletedStep(stepIndex) || this.isCurrentStep(stepIndex))
      )
    },
    setFocusOnStep(currentTarget: HTMLElement, focusableTarget: HTMLElement) {
      currentTarget.tabIndex = -1
      focusableTarget.tabIndex = 0
      focusableTarget.focus()
    },
    navigateToStep(step: Step): void {
      const stepIndex = this.getStepIndex(step)

      if (stepIndex < this.currentStepIndex) {
        this.currentStepIndex = stepIndex
      }
    },
    getStepIndex(step: Step): number {
      return this.steps.findIndex((s: Step) => s._uid === step._uid)
    },
    isCurrentStep(stepIndex: number): boolean {
      return this.getStepIndex(this.steps[stepIndex]) === this.currentStepIndex
    },
    isCompletedStep(stepIndex: number): boolean {
      const step = this.steps[stepIndex]
      return step.completed || this.getStepIndex(step) < this.currentStepIndex
    },
  },
}
</script>
<style lang="scss">
@import 'stepper';
</style>
