import {
  SbCard,
  SbCardHeader,
  SbCardContent,
  SbCardFooter,
  SbCardOptions
} from '.'

const CardTemplate = args => ({
  components: { SbCard, SbCardHeader, SbCardContent, SbCardFooter, SbCardOptions },
  props: Object.keys(args),
  template: `
    <SbCard :is-full-width="isFullWidth" :is-thin="isThin">
      <SbCardHeader>
        {{ title }}
      </SbCardHeader>
      <SbCardOptions v-if="options.lenght">
        
      </SbCardOptions>
      <SbCardContent :is-loading="isLoading">
        
      </SbCardContent>
      <SbCardFooter :url="url" :link-label="linkLabel"/>
  </SbCard >
  `
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
    isFullWidth: false,
    isThin: false
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
      description: 'This `isFullWidth` prop changes the type of visualization of the `SbCard`, to full width view.',
      control: {
        type: 'boolean'
      }
    },
    isThin: {
      name: 'isThin',
      description: 'The `isThin` prop belongs to the `SbCard` component, it reduces the size of the margin above, it is to be used when you don`t have the header and options.',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = CardTemplate.bind({})

export const CardWithoutHeaderAndFooter = CardTemplate.bind({})

CardWithoutHeaderAndFooter.args = {
  title: '',
  url: '',
  isThin: true
}

CardWithoutHeaderAndFooter.parameters = {
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
