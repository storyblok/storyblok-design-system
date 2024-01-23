import { SbLoading } from './index'
import { availableColors } from '../../utils'
import { loadingTypes, loadingSizes } from './utils'

const LoadingBlockTemplate = (args, storyContext) => ({
  components: { SbLoading },
  setup() {
    return { args }
  },
  computed: {
    styleForDocs() {
      if (storyContext.viewMode === 'docs') return 'position: inherit'
    },
  },
  template: `
    <SbLoading
      :style="styleForDocs"
      v-bind="args"
    />
  `,
})

export default {
  title: 'Interface/SbLoading',
  component: SbLoading,
  parameters: {
    docs: {
      inlineStories: false,
      description: {
        component:
          'Loading spinners are used when retrieving data or performing slow computations, and help to notify users that loading is underway.',
      },
    },
    layout: 'fullscreen',
  },
  args: {
    type: 'spinner',
    size: 'normal',
    modelValue: 0,
    showPercentage: false,
    color: 'primary',
    uiBlock: false,
  },
  argTypes: {
    type: {
      name: 'type',
      description:
        'With the prop `type` you can choose which type of loading will be rendered.',
      options: [...loadingTypes],
      control: {
        type: 'select',
      },
    },
    size: {
      name: 'size',
      description:
        'With the prop `size` you can define the sizes of the component loading.',
      options: [...loadingSizes],
      control: {
        type: 'select',
      },
    },
    modelValue: {
      name: 'value',
      description:
        'The prop `value` must be entered to change the loading status, it ranges from 0 to 100.',
      control: {
        type: 'range',
        options: [0, 100, 1], // [min, max, step]
      },
    },
    showPercentage: {
      name: 'show-percentage',
      description:
        'With the prop `show-percentage` you can choose whether you want the loading percentage to appear or not.',
      control: {
        type: 'boolean',
      },
    },
    color: {
      name: 'color',
      description:
        'Select the color of the loading spinner with the colors available in our Desing system.',
      options: availableColors,
      control: {
        type: 'select',
      },
    },
    uiBlock: {
      name: 'uiBlock',
      description:
        'With this property the user`s ui will be locked when starting loading.',
      control: {
        type: 'boolean',
      },
    },
  },
}

export const BlockingUiLoadingSpinner = LoadingBlockTemplate.bind({})

BlockingUiLoadingSpinner.args = {
  uiBlock: true,
  size: 'x-large',
}

BlockingUiLoadingSpinner.parameters = {
  docs: {
    description: {
      story:
        'The `uiBlock` feature causes the user`s screen to be blocked during loading.',
    },
  },
}

export const BlockingUiLoadingProgressBar = LoadingBlockTemplate.bind({})

BlockingUiLoadingProgressBar.args = {
  uiBlock: true,
  type: 'bar',
  modelValue: 30,
}
