import { SbLoading, SbLoadingPlaceholder } from './index'
import { availableColors } from '../../utils'
import { loadingTypes, loadingSizes } from './utils'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbLoading>

const meta: Meta<typeof SbLoading> = {
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
      name: 'modelValue',
      description:
        'The prop `modelValue` must be entered to change the loading status, it ranges from 0 to 100.',
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
  render: (args: Args) => ({
    components: { SbLoading },
    setup() {
      return { args }
    },
    template: `
      <SbLoading
        v-bind="args"
      />
    `,
  }),
}

export default meta

export const Default: Story = {}

export const ProgressBar: Story = {
  render: (args: Args) => ({
    components: { SbLoading },
    setup() {
      return { args }
    },
    template: `
      <SbLoading
        v-bind="args"
      />
  `,
  }),

  args: {
    type: 'bar',
    modelValue: 25,
    showPercentage: true,
  },

  parameters: {
    docs: {
      description: {
        story:
          'When passing the prop `bar` the component starts to render a progress bar.',
      },
    },
  },
}

export const SpinnerWithSizes: Story = {
  render: (args: Args) => ({
    components: { SbLoading },
    setup() {
      return { args }
    },
    template: `
    <div>
      <SbLoading
        v-bind="args"
        type="spinner"
        size="small"
      />
      <SbLoading
        v-bind="args"
        type="spinner"
        size="normal"
      />
      <SbLoading
        v-bind="args"
        type="spinner"
        size="large"
      />
      <SbLoading
        v-bind="args"
        type="spinner"
        size="x-large"
      />
    </div>
  `,
  }),

  parameters: {
    docs: {
      iframeHeight: 200,
      description: {
        story:
          'When passing the prop `spinner` the component starts to render an animated spinner',
      },
    },
  },
}

export const SpinnerWithPercentage: Story = {
  render: (args: Args) => ({
    components: { SbLoading },
    setup() {
      return { args }
    },
    template: `
    <div>
      <div style="margin-bottom: 15px">
        <SbLoading
          v-bind="args"
          type='spinner'
          size='small'
          modelValue="25"
          showPercentage="true"
        />
      </div>
      <div style="margin-bottom: 15px">
        <SbLoading
          v-bind="args"
          type='spinner'
          size='normal'
          modelValue="25"
          showPercentage="true"
        />
      </div>
      <div style="margin-bottom: 15px">
        <SbLoading
          v-bind="args"
          type='spinner'
          size='large'
          modelValue="25"
          showPercentage="true"
        />
      </div>
      <div style="margin-bottom: 15px">
        <SbLoading
          v-bind="args"
          type='spinner'
          size='x-large'
          modelValue="25"
          showPercentage="true"
        />
      </div>
    </div>
  `,
  }),

  parameters: {
    docs: {
      iframeHeight: 300,
      description: {
        story:
          'The spinners also show the percentage of the loanding, pass the `showPercentage` property so that the percentage is shown.',
      },
    },
  },
}

export const LoadingWithPlaceholder: Story = {
  render: (args: Args) => ({
    components: { SbLoading, SbLoadingPlaceholder },
    setup: () => ({ args }),
    template: `
    <SbLoading v-bind="args">
      <SbLoadingPlaceholder v-bind="args" style="margin-bottom: 10px"/>
      <SbLoadingPlaceholder v-bind="args" style="margin-bottom: 10px"/>
    </SbLoading>
  `,
  }),

  args: {
    type: 'placeholder',
    width: '50%',
    height: '25px',
  },

  parameters: {
    docs: {
      description: {
        story:
          'When passing `placeholder` as prop to SbLoading it enables the rendering of the SbLoadingPlaceholder component, this component can receive width and height as props',
      },
    },
  },
}
