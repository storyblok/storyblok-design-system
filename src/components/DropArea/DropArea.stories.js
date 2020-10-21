import { SbDropArea } from './index'

const DropTemplate = args => ({
  components: { SbDropArea },
  props: Object.keys(args),
  template: `
    <SbDropArea
      v-bind="{
        accept,
        maxFileSize,
        maxFile,
      }"/>`
})

export default {
  title: 'SbDropArea',
  args: {
    accept: null,
    maxFileSize: null,
    maxFile: null
  },
  argTypes: {
    accept: {
      name: 'accept',
      description: '',
      control: {
        type: 'text'
      }
    },
    maxFileSize: {
      name: 'maxFileSize',
      description: '',
      control: {
        type: 'text'
      }
    },
    maxFile: {
      name: 'maxFile',
      description: '',
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = DropTemplate.bind({})
