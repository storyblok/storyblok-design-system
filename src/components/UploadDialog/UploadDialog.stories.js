import SbUploadDialog from '.'

export default {
  title: 'Design System/Components/SbUploadDialog',
  component: SbUploadDialog,
  args: {
    currentFile: 1,
    currentFileName: 'test.png',
    percentageValue: 45,
    totalFiles: 5,
    timeLeft: 125,
  },
  argTypes: {
    currentFile: {
      name: 'currentFile',
      description: 'The `currentFile` property defines the current upload step',
      control: {
        type: 'number',
      },
    },
    currentFileName: {
      name: 'currentFileName',
      description:
        'The `currentFileName` property defines the name of the current file being uploaded',
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

  parameters: {
    docs: {
      inlineStories: false,
    },
  },
}

export const Default = (args) => ({
  components: { SbUploadDialog },

  props: Object.keys(args),

  template: `
    <SbUploadDialog
      :current-file="currentFile"
      :current-file-name="currentFileName"
      :percentage-value="percentageValue"
      :total-files="totalFiles"
      :time-left="timeLeft"
    />
  `,
})
