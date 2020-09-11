import SbLoading from './index'

const LoadingTemplate = args => ({
  components: { SbLoading },
  props: Object.keys(args),
  template: `
    <SbLoading
      v-bind="{
        type,
        size,
        value,
        showPercentage
      }"
    />
  `
})

export default {
  title: 'SbLoading',
  component: SbLoading,
  parameters: {
    docs: {
      description: {
        component: 'Loading spinners are used when retrieving data or performing slow computations, and help to notify users that loading is underway.'
      }
    }
  },
  args: {
    type: 'spinner',
    size: 'normal',
    value: 0,
    showPercentage: false
  },
  argTypes: {
    type: {
      name: 'type',
      description: 'With the prop `type` you can choose which type of loading will be rendered.',
      control: {
        type: 'select',
        options: ['spinner', 'bar']
      }
    },
    size: {
      name: 'size',
      description: 'With the prop `size` you can define the sizes of the component loading.',
      control: {
        type: 'select',
        options: ['small', 'normal', 'large', 'x-large']
      }
    },
    value: {
      name: 'value',
      description: 'The prop `value` must be entered to change the loading status, it ranges from 0 to 100.',
      control: {
        type: 'range',
        options: [0, 100, 1] // [min, max, step]
      }
    },
    showPercentage: {
      name: 'show-percentage',
      description: 'With the prop `show-percentage` you can choose whether you want the loading percentage to appear or not.',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = LoadingTemplate.bind({})

export const ProgressBar = args => ({
  components: { SbLoading },
  props: Object.keys(args),
  template: `
    <div>
      <SbLoading
        v-bind="{
          type,
          size,
          value,
          showPercentage
        }"
      />
    </div>
  `
})

ProgressBar.args = {
  type: 'bar',
  value: 25,
  showPercentage: true
}

ProgressBar.parameters = {
  docs: {
    description: {
      story: 'When passing the prop `bar` the component starts to render a progress bar.'
    }
  }
}

export const SpinnerWithSizes = args => ({
  components: { SbLoading },
  props: Object.keys(args),
  template: `
    <div>
      <SbLoading
        v-bind="{
          type: 'spinner',
          size: 'small',
          value,
          showPercentage
        }"
      />
      <SbLoading
        v-bind="{
          type: 'spinner',
          size: 'normal',
          value,
          showPercentage
        }"
      />
      <SbLoading
        v-bind="{
          type: 'spinner',
          size: 'large',
          value,
          showPercentage
        }"
      />
      <SbLoading
        v-bind="{
          type: 'spinner',
          size: 'x-large',
          value,
          showPercentage
        }"
      />
    </div>
  `
})

SpinnerWithSizes.parameters = {
  docs: {
    description: {
      story: 'When passing the prop `spinner` the component starts to render an animated spinner'
    }
  }
}

export const SpinnerWithPercentage = args => ({
  components: { SbLoading },
  props: Object.keys(args),
  template: `
    <div>
      <SbLoading
        v-bind="{
          type: 'spinner',
          size: 'small',
          value: 25,
          showPercentage: true
        }"
      />
      <SbLoading
        v-bind="{
          type: 'spinner',
          size: 'normal',
          value: 25,
          showPercentage: true
        }"
      />
      <SbLoading
        v-bind="{
          type: 'spinner',
          size: 'large',
          value: 25,
          showPercentage: true
        }"
      />
      <SbLoading
        v-bind="{
          type: 'spinner',
          size: 'x-large',
          value: 25,
          showPercentage: true
        }"
      />
    </div>
  `
})

SpinnerWithPercentage.parameters = {
  docs: {
    description: {
      story: 'The spinners also show the percentage of the loanding, pass the `showPercentage` property so that the percentage is shown.'
    }
  }
}
