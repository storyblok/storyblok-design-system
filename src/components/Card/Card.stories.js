import { SbCard, SbCardHeader, SbCardContent, SbCardFooter } from '.'

import SbLink from '../Link'

import { SbMenu, SbMenuButton, SbMenuItem, SbMenuList } from '../Menu'

export default {
  title: 'Design System/Components/SbCard',
  component: SbCard,
  parameters: {
    docs: {
      description: {
        component:
          'Cards or simple content box, used to divide content elements on page.',
      },
    },
  },
  args: {
    as: 'span',
    title: 'Card Title',
    isLoading: false,
  },
  argTypes: {
    as: {
      name: 'as',
      description: 'Define which tag element will be used to title text.',
      control: {
        type: 'text',
      },
    },
    isLoading: {
      name: 'isLoading',
      description: 'Define if the card has a loading state',
      control: {
        type: 'boolean',
      },
    },
    title: {
      name: 'title',
      description: 'Title for the card.',
      control: {
        type: 'text',
      },
    },
  },
}

export const Default = (args) => ({
  components: {
    SbLink,
    SbCard,
    SbCardHeader,
    SbCardContent,
    SbCardFooter,
  },
  props: Object.keys(args),
  template: `
    <SbCard :isLoading="isLoading">
      <SbCardHeader :as="as" :title="title" />

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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, dui accumsan feugiat scelerisque, odio felis auctor lorem, nec dignissim nisi felis a lectus</p>
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
  `,
})

export const WithoutHeaderAndFooter = (args) => ({
  components: {
    SbCard,
    SbCardContent,
  },

  props: Object.keys(args),

  template: `
    <SbCard :isLoading="isLoading">
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, dui accumsan feugiat scelerisque, odio felis auctor lorem, nec dignissim nisi felis a lectus</p>
        </div>
      </SbCardContent>
    </SbCard >
  `,
})

WithoutHeaderAndFooter.parameters = {
  docs: {
    description: {
      story:
        'Cards without the header and footer are for showing only the content, but continue to divide the content while maintaining the style of cards.',
    },
  },
}

export const Loading = (args) => ({
  components: {
    SbLink,
    SbCard,
    SbCardHeader,
    SbCardContent,
    SbCardFooter,
  },

  props: Object.keys(args),

  template: `
    <SbCard :isLoading="isLoading">
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, dui accumsan feugiat scelerisque, odio felis auctor lorem, nec dignissim nisi felis a lectus</p>
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
  `,
})

Loading.args = {
  isLoading: true,
}

Loading.parameters = {
  docs: {
    description: {
      story:
        'You can set the `isLoading` property that shows a `SbLoading` component on the top of content',
    },
  },
}

export const WithMenuComponent = (args) => ({
  components: {
    SbCard,
    SbLink,
    SbCardHeader,
    SbCardContent,
    SbCardFooter,
    SbMenu,
    SbMenuButton,
    SbMenuItem,
    SbMenuList,
  },

  data: () => ({
    options: [
      {
        icon: 'plus',
        label: 'Option 1',
      },
      {
        icon: 'calendar',
        label: 'Option 2',
        isDisabled: true,
      },
      {
        separator: true,
      },
      {
        icon: 'close',
        label: 'Delete',
        type: 'negative',
      },
      {
        group: {
          title: 'Group title',
          items: [
            {
              icon: 'close',
              label: 'Group Item 1',
            },
            {
              icon: 'close',
              label: 'Group Item 2',
              type: 'negative',
            },
          ],
        },
      },
    ],
  }),

  props: Object.keys(args),

  template: `
    <SbCard :isLoading="isLoading">
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis, dui accumsan feugiat scelerisque, odio felis auctor lorem, nec dignissim nisi felis a lectus</p>
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
  `,
})

WithMenuComponent.parameters = {
  docs: {
    description: {
      story:
        'You can use the `SbLoading` component inside the `SbCardContent` to perform a loading state to card',
    },
  },
}
