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
      description: 'Prop `accept` works as a filter, pass the files you want to be added, for example: `:accept="image/png, image/jpeg"`, so only `.png` and `.jpeg`images  will be accepted',
      control: {
        type: 'text'
      }
    },
    maxFileSize: {
      name: 'maxFileSize',
      description: 'The `maxFileSize` prop defines the maximum size that each file can have, the prop receives the size in `KB` kylobytes.',
      control: {
        type: 'text'
      }
    },
    maxFile: {
      name: 'maxFile',
      description: 'The `maxFile` prop defines the maximum number of files that can be sent at once, that is, at each drop event. Note if the number is greater, no files will be returned.',
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = DropTemplate.bind({})
