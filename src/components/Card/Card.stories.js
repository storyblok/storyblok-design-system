import {
  SbCard,
  SbCardHeader,
  SbCardContent,
  SbCardFooter
} from '.'

import SbLink from '../Link'
import SbLoading from '../Loading'

import {
  SbMenu,
  SbMenuButton,
  SbMenuItem,
  SbMenuList
} from '../Menu'

const CardTemplate = args => ({
  components: {
    SbLink,
    SbCard,
    SbCardHeader,
    SbCardContent,
    SbCardFooter
  },
  props: Object.keys(args),
  template: `
    <SbCard>
      <SbCardHeader :as="as" :title="title" />

      <SbCardContent>
        <div
          style="background-color: #f5f5f5;
          width: 100%;
          height: 300px;"
        />
      </SbCardContent>

      <SbCardFooter>
        <SbLink
          href="https://storyblok.com"
          label="Storyblok Website"
          icon-right="chevron-right"
        />
      </SbCardFooter>
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
    as: 'span',
    title: 'Card Title'
  },
  argTypes: {
    as: {
      name: 'as',
      description: 'Define which tag element will be used to title text.',
      control: {
        type: 'text'
      }
    },
    title: {
      name: 'title',
      description: 'Title for the card.',
      control: {
        type: 'text'
      }
    }
  }
}

export const Default = CardTemplate.bind({})

export const WithoutHeaderAndFooter = args => ({
  components: {
    SbCard,
    SbCardContent
  },

  props: Object.keys(args),

  template: `
    <SbCard>
      <SbCardContent>
        <div
          style="background-color: #f5f5f5;
          width: 100%;
          height: 50px;"
        />
      </SbCardContent>
    </SbCard >
  `
})

WithoutHeaderAndFooter.parameters = {
  docs: {
    description: {
      story: 'Cards without the header and footer are for showing only the content, but continue to divide the content while maintaining the style of cards.'
    }
  }
}

export const WithLoadingComponent = args => ({
  components: {
    SbLoading,
    SbCard,
    SbCardHeader,
    SbCardContent,
    SbCardFooter
  },

  props: Object.keys(args),

  template: `
    <SbCard>
      <SbCardHeader :title="title" />

      <SbCardContent>
        <div
          style="
            background-color: #f5f5f5;
            width: 100%;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <SbLoading type="spinner" size="large" color="primary" />
        </div>
      </SbCardContent>

      <SbCardFooter>
        <SbLink
          href="https://storyblok.com"
          label="Storyblok Website"
          icon-right="chevron-right"
        />
      </SbCardFooter>
  </SbCard >
  `
})

WithLoadingComponent.parameters = {
  docs: {
    description: {
      story: 'You can use the `SbLoading` component inside the `SbCardContent` to perform a loading state to card'
    }
  }
}

export const WithMenuComponent = args => ({
  components: {
    SbLoading,
    SbCard,
    SbCardHeader,
    SbCardContent,
    SbCardFooter,
    SbMenu,
    SbMenuButton,
    SbMenuItem,
    SbMenuList
  },

  data: () => ({
    options: [
      {
        icon: 'plus',
        label: 'Option 1'
      },
      {
        icon: 'calendar',
        label: 'Option 2',
        isDisabled: true
      },
      {
        separator: true
      },
      {
        icon: 'close',
        label: 'Delete',
        type: 'negative'
      },
      {
        group: {
          title: 'Group title',
          items: [
            {
              icon: 'close',
              label: 'Group Item 1'
            },
            {
              icon: 'close',
              label: 'Group Item 2',
              type: 'negative'
            }
          ]
        }
      }
    ]
  }),

  props: Object.keys(args),

  template: `
    <SbCard>
      <SbCardHeader :title="title" :options="options" />

      <SbCardContent>
        <div
          style="
            background-color: #f5f5f5;
            width: 100%;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <SbLoading type="spinner" size="large" color="primary" />
        </div>
      </SbCardContent>

      <SbCardFooter>
        <SbLink
          href="https://storyblok.com"
          label="Storyblok Website"
          icon-right="chevron-right"
        />
      </SbCardFooter>
  </SbCard >
  `
})

WithMenuComponent.parameters = {
  docs: {
    description: {
      story: 'You can use the `SbLoading` component inside the `SbCardContent` to perform a loading state to card'
    }
  }
}
