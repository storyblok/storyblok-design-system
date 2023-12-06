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

export default {
  title: 'Interface/SbEditorHeader',
  component: SbEditorHeader,
  parameters: {
    docs: {
      description: {
        component: 'Header component for various editors',
      },
    },
  },
  args: {
    languages: [...languages],
    users: [...usersList],
    actions: [...actionsList],
    hasSaveButton: true,
    headerTitle: 'Headless CMS',
    headerSubtitle: 'Updated 15m ago',
    mode: 'light',
  },
  argTypes: {
    mode: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
}

export const Default = {
  name: 'Default',
  render: (args) => ({
    components: { SbEditorHeader },
    setup() {
      return { args }
    },
    template: `
        <SbEditorHeader v-bind="args"  />
      `,
  }),
}

export const WithSlots = () => ({
  components: { SbEditorHeader },
  template: `
      <SbEditorHeader>
        <template #left>
          <p>Custom left slot</p>
        </template>

        <template #middle>
          <p>Custom center slot</p>
        </template>

        <template #right>
        <p>Custom right slot</p>
        </template>
      </SbEditorHeader>
  `,
})

export const DarkMode = () => ({
  components: { SbEditorHeader },
  template: `
    <SbEditorHeader
      header-title="My title"
      mode="dark"
    />
  `,
})
