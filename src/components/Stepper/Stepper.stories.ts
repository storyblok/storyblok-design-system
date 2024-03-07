import { SbStepper } from '.'
import { steps } from './constants'

export default {
  title: 'Basic/SbStepper',
  component: SbStepper,
  args: {
    steps,
    stepIndex: 1,
  },
  argTypes: {
    steps: {
      name: 'Steps',
      description: 'Steps list',
    },
    stepIndex: {
      name: 'Step index',
      description: 'Index of the current step',
      control: {
        type: 'number',
        min: 0,
        max: 3,
      },
      default: 0,
    },
  },
}

export const Default = (args) => ({
  components: { SbStepper },
  setup() {
    return { args }
  },
  template: '<SbStepper :steps="args.steps" :step-index="args.stepIndex" />',
})
