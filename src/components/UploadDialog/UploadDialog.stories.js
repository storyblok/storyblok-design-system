import SbUploadDialog from '.'

export default {
  title: 'SbUploadDialog',
  component: SbUploadDialog,
  args: {
    actualFile: 1,
    actualFileName: 'test.png',
    percentageValue: 45,
    totalFiles: 5,
    timeLeft: 125,
  },
  argTypes: {
    actualFile: {
      name: 'actualFile',
      description: 'The `actualFile` property defines the current upload step',
      control: {
        type: 'number',
      },
    },
    actualFileName: {
      name: 'actualFileName',
      description:
        'The `actualFileName` property defines the name of the current file being uploaded',
      control: {
        type: 'text',
      },
    },
    percentageValue: {
      name: 'percentageValue',
      description:
        'The `percentageValue` property defines the percentage of file that being uploaded',
      control: {
        type: 'text',
      },
    },
    totalFiles: {
      name: 'totalFiles',
      description:
        'The `totalFiles` property defines the total of files to upload',
      control: {
        type: 'text',
      },
    },
    timeLeft: {
      name: 'timeLeft',
      description:
        'The `timeLeft` property defines the time to left (in seconds) of actual file that being uploaded',
      control: {
        type: 'text',
      },
    },
  },
}

export const Default = (args) => ({
  components: { SbUploadDialog },

  props: Object.keys(args),

  template: `
    <SbUploadDialog
      :actual-file="actualFile"
      :actual-file-name="actualFileName"
      :percentage-value="percentageValue"
      :total-files="totalFiles"
      :time-left="timeLeft"
    />
  `,
})
