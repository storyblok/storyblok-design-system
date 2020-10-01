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
        isLoading,
        options,
        isFullWidth
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
    linkLabel: 'Card Title Footer Action',
    url: 'https://storyblok.com',
    isLoading: false,
    options: [],
    isFullWidth: false
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
        type: 'array'
      }
    },
    isFullWidth: {
      name: 'isFullWidth',
      description: 'This `isFullWidth` prop changes the type of visualization, to full width view.',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = CardTemplate.bind({})

export const CardWithoutTitleAndLink = CardTemplate.bind({})

CardWithoutTitleAndLink.args = {
  title: '',
  url: ''
}

CardWithoutTitleAndLink.parameters = {
  docs: {
    description: {
      story: 'Cards without the header and footer are for showing only the content, but continue to divide the content while maintaining the style of cards.'
    }
  }
}

export const CardLoading = CardTemplate.bind({})

CardLoading.args = {
  title: 'Card Title',
  url: 'https://storyblok.com',
  isLoading: true
}

CardLoading.parameters = {
  docs: {
    description: {
      story: 'The card loading was done thinking about when the content of the card is dynamic, while the content is not loaded, pass the prop `isLoading` and the card will assume the loading behavior.'
    }
  }
}

export const CardInFullWidth = CardTemplate.bind({})

CardInFullWidth.args = {
  title: 'Card Title',
  url: 'https://storyblok.com',
  isFullWidth: true
}

CardInFullWidth.parameters = {
  docs: {
    description: {
      story: 'The full width card was designed for content with a large area, for example a Data table.'
    }
  }
}
