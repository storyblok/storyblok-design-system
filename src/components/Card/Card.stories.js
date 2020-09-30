import SbCard from '.'

const CardTemplate = args => ({
  components: { SbCard },
  props: Object.keys(args),
  template: `
    <SbCard 
      v-bind="{
        title,
        linkLabel,
        url,
        isBorderless,
        isLoading,
        options
      }"/>`
})

export default {
  title: 'SbCard',
  component: SbCard,
  parameters: {
    docs: {
      description: {
        component: 'Cards or simple content box, used to divide content elements on page.'
      }
    }
  },
  args: {
    title: 'Title',
    linkLabel: null,
    url: null,
    isBorderless: false,
    isLoading: false,
    options: false
  },
  argTypes: {
    title: {
      name: 'title',
      description: 'Title for the card.',
      control: {
        type: 'text'
      }
    },
    linkLabel: {
      name: 'linkLabel',
      description: 'Name that will appear for the links, it will be converted to the `title` of the `a` tag.',
      control: {
        type: 'text'
      }
    },
    url: {
      name: 'url',
      description: 'Link address.',
      control: {
        type: 'text'
      }
    },
    isBorderless: {
      name: 'isBorderless',
      description: 'This `isBorderless` prop changes the type of visualization, leaving the card without or with borders.',
      control: {
        type: 'boolean'
      }
    },
    isLoading: {
      name: 'isLoading',
      description: 'When the card content is dynamic you can use the `isLoading` props to wait for the card content to render.',
      control: {
        type: 'boolean'
      }
    },
    options: {
      name: 'options',
      description: 'Props `options` are used to pass options for the content to be rendered.',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = CardTemplate.bind({})
