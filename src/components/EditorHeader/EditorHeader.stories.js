import { SbEditorHeader } from './index'
// import SbEditorHeader from './EditorHeader.vue'

const languagesItems = ['English', 'German']

const usersList = [
  {
    src:
      'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'John Doe',
  },
  {
    src:
      'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'Kobe Bryant',
  },
  {
    src:
      'https://avatars0.githubusercontent.com/u/20342656?s=460&u=1f62c95c10543861ad74b58a3c03cd774e7a4fa4&v=4',
    name: 'Elvis Presley',
  },
]

const optionsList = [
  {
    name: 'Open Draft',
    link: '',
  },
  {
    name: 'Open Published',
    link: '',
  },
  {
    name: 'Draft json',
    link: '',
  },
  {
    name: 'Published json',
    link: '',
  },
  {
    name: 'Unpublish',
    link: '',
    type: 'negative',
  },
]

const actionsList = [
  {
    preview: '',
  },
]

const EditorTemplate = (args) => ({
  components: { SbEditorHeader },
  props: Object.keys(args),
  template: `
    <SbEditorHeader
      v-bind="{
        languages,
        users,
        actions,
        options,
        isPublished,
        hasSaveButton,
        showPublishedIcon,
      }"
    />
  `,
})

export default {
  title: 'SbEditorHeader',
  component: SbEditorHeader,
  parameters: {
    docs: {
      description: {
        component: 'SbEditorHeader',
      },
    },
  },
  args: {
    languages: [...languagesItems],
    users: [...usersList],
    actions: [...actionsList],
    options: [...optionsList],
    isPublished: true,
    hasSaveButton: true,
    showPublishedIcon: true,
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
        type: 'array',
      },
    },
    actions: {
      name: 'actions',
      description: 'Available actions array',
      control: {
        type: 'array',
      },
    },
    options: {
      name: 'options',
      description: 'Available options array',
      control: {
        type: 'array',
      },
    },
    isPublished: {
      name: 'isPublished',
      description:
        'Change the icon to inform whether the space is published or not',
      control: {
        type: 'boolean',
      },
    },
    hasSaveButton: {
      name: 'hasSaveButton',
      description: 'Props to show the save icon',
      control: {
        type: 'boolean',
      },
    },
    showPublishedIcon: {
      name: 'showPublishedIcon',
      description: 'Props to show or not the published icon',
      control: {
        type: 'boolean',
      },
    },
  },
}

export const Default = EditorTemplate.bind({})
