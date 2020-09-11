import SbLoading from './index'

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
    type: null,
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

export const Default = args => ({
  components: { SbLoading },
  props: Object.keys(args),
  template: `
    <SbLoading
      :type="type"
      :size="size"
      :value="value"
      :show-percentage="showPercentage"
    />
  `
})
