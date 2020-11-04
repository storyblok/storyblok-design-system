import SbDropArea from './index'
import SbUploadDialog from '../UploadDialog'

export default {
  title: 'SbDropArea',
  parameters: {
    docs: {
      description: {
        component:
          'The `SbDropArea` component serves as a container for uploading files, works with the drop file event, and issues a callback with the files, you must implement the upload function because the component does not have the same!',
      },
    },
  },
  args: {
    accept: '',
    maxFileSize: 0,
    maxFile: 0,
    title: 'Drop your asset in',
    subtitle:
      'You can drop in miltiple JPEGs, PNGs, SVGs, PDFs and all other files.',
  },
  argTypes: {
    accept: {
      name: 'accept',
      description:
        'Prop `accept` works as a filter, pass the files you want to be added, for example: `:accept="image/png, image/jpeg"`, so only `.png` and `.jpeg`images  will be accepted',
      control: {
        type: 'text',
      },
    },
    maxFileSize: {
      name: 'maxFileSize',
      description:
        'The `maxFileSize` prop defines the maximum size that each file can have, the prop receives the size in `KB` kylobytes.',
      control: {
        type: 'number',
      },
    },
    maxFile: {
      name: 'maxFile',
      description:
        'The `maxFile` prop defines the maximum number of files that can be sent at once, that is, at each drop event. Note if the number is greater, no files will be returned.',
      control: {
        type: 'number',
      },
    },
    subtitle: {
      name: 'subtitle',
      description:
        'The `subtitle` property defines the subtitle to add more informations about the upload data',
      control: {
        type: 'text',
      },
    },
    title: {
      name: 'title',
      description: 'The `title` property defines the title of component',
      control: {
        type: 'text',
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbDropArea },
  props: Object.keys(args),
  template: `
    <SbDropArea
      :accept="accept"
      :subtitle="subtitle"
      :title="title"
      :max-file="maxFile"
      :max-file-size="maxFileSize"
    />
  `,
})

export const DropAreaWithUploadModal = (args) => ({
  components: { SbDropArea, SbUploadDialog },
  props: Object.keys(args),
  data() {
    return {
      hasFiles: true,
    }
  },
  template: `
    <div>
      <SbDropArea
        :accept="accept"
        :max-file="maxFile"
        :max-file-size="maxFileSize"
        :subtitle="subtitle"
        :title="title"
      />

      <SbUploadDialog
        :total-files="5"
        :actual-file="1"
        actual-file-name="test.png"
        :percentage-value="45"
        :time-left="125"
        v-if="hasFiles"
      />
    </div>`,
})

DropAreaWithUploadModal.parameters = {
  docs: {
    description: {
      story:
        'In this story you can see how the SbUploadDialog component looks after dropping the files in the `SbDropArea` component, the use of this component is optional, the user can use or create new ones, as `SbDropArea` returns a callback with the dropped files.`',
    },
  },
}
