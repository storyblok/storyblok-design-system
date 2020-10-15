import SbDropArea from './index'

const DropTemplate = args => ({
  components: { SbDropArea },
  props: Object.keys(args),
  template: `
    <SbDropArea 
      v-bind="{
        accept,
        maxFileSize,
        maxFile,
        maxTotalSize
      }"/>`
})

export default {
  title: 'SbDropArea',
  args: {
    accept: null,
    maxFileSize: null,
    maxFile: null,
    maxTotalSize: null
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
    },
    maxTotalSize: {
      name: 'maxTotalSize',
      description: '',
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = DropTemplate.bind({})
