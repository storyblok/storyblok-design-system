import SbUploadDialog from '.'

import type { Args, Meta, StoryObj } from '@storybook/vue3'

type Story = StoryObj<typeof SbUploadDialog>

const meta: Meta<typeof SbUploadDialog> = {
  title: 'Interface/SbUploadDialog',
  component: SbUploadDialog,
  parameters: {
    docs: { inlineStories: false, iframeHeight: 300 },
    layout: 'fullscreen',
  },
  args: {
    currentFile: 1,
    currentFileName: 'test.png',
    locale: 'en',
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
    locale: {
      name: 'locale',
      description: 'Allow to use the component in a different language',
      options: [
        'en',
        'de',
        'pt-br',
        'es',
        'fr',
        'it',
        'ja',
        'pl',
        'ru',
        'sk',
        'sv',
        'zh',
      ],
      control: {
        type: 'select',
      },
    },
    percentageValue: {
      name: 'percentageValue',
      description:
        'The `percentageValue` property defines the percentage of file that being uploaded',
      control: {
        type: 'number',
      },
    },
    totalFiles: {
      name: 'totalFiles',
      description:
        'The `totalFiles` property defines the total of files to upload',
      control: {
        type: 'number',
      },
    },
    timeLeft: {
      name: 'timeLeft',
      description:
        'The `timeLeft` property defines the time to left (in seconds) of actual file that being uploaded',
      control: {
        type: 'number',
      },
    },
  },
  render: (args: Args) => ({
    components: { SbUploadDialog },

    setup() {
      return { args }
    },

    template: `
      <SbUploadDialog
        v-bind="args"
      />
    `,
  }),
}

export default meta

export const Default: Story = {}
