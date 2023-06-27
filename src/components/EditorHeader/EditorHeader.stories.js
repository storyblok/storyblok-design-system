import { SbEditorHeader } from './index'

const languages = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Portuguese',
    code: 'pt',
  },
]

const usersList = [
  {
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'John Doe',
  },
  {
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'Kobe Bryant',
  },
  {
    src: 'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'Elvis Presley',
  },
]

const actionsList = [
  {
    name: 'Open Draft',
  },
  {
    name: 'Open Published',
  },
  {
    name: 'Draft json',
  },
  {
    name: 'Published json',
  },
  {
    name: 'Unpublish',
    type: 'negative',
  },
]

const EditorTemplate = (args) => ({
  components: { SbEditorHeader },
  setup() {
    return { args }
  },
  template: `
    <SbEditorHeader
      v-bind="args"
    />
  `,
})

export default {
  title: 'Interface/SbEditorHeader',
  component: SbEditorHeader,
  parameters: {
    docs: {
      description: {
        component: 'SbEditorHeader',
      },
    },
  },
  args: {
    languages: [...languages],
    users: [...usersList],
    actions: [...actionsList],
    hasSaveButton: true,
    headerTitle: 'API-based & Headless CMS as a Service',
    headerSubTitle: 'Updated 15m ago',
  },
  argTypes: {
    languages: {
      name: 'languages',
      description: 'Available languages array',
      control: {
        type: 'array',
      },
    },
    users: {
      name: 'users',
      description: 'User information array',
      control: {
        type: 'object',
      },
    },
    actions: {
      name: 'actions',
      description: 'Available actions array',
      control: {
        type: 'object',
      },
    },
    hasSaveButton: {
      name: 'hasSaveButton',
      description: 'Props to show the save icon',
      control: {
        type: 'boolean',
      },
    },
    headerTitle: {
      name: 'headerTitle',
      description: '',
      control: {
        type: 'text',
      },
    },
    headerSubTitle: {
      name: 'headerSubTitle',
      description: '',
      control: {
        type: 'text',
      },
    },
  },
}

export const Default = EditorTemplate.bind({})
