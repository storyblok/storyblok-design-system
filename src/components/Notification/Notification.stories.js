import SbNotification from './index'

const NotificationTemplate = (args) => ({
  components: { SbNotification },
  props: Object.keys(args),
  template: `
    <SbNotification
      v-bind="{
        status,
        title,
        description ,
        linkName,
        link,
        isExpandable,
        isFull,
      }"/>`,
})

export default {
  title: 'Design System/Components/SbNotification',
  component: SbNotification,
  parameters: {
    docs: {
      description: {
        component:
          'Notification component sends various types of notification, with texts, descriptions and various links and diferent status.',
      },
    },
  },
  args: {
    status: 'general',
    title: 'Title',
    description: null,
    link: null,
    linkName: null,
    isExpandable: false,
    isFull: false,
  },
  argTypes: {
    status: {
      name: 'status',
      description: 'Status color',
      control: {
        type: 'select',
        options: ['general', 'positive', 'warning', 'info', 'negative'],
      },
    },
    title: {
      name: 'title',
      description: 'Title for notification',
      control: {
        type: 'text',
      },
    },
    description: {
      name: 'description',
      description: 'Notification description',
      control: {
        type: 'text',
      },
    },
    link: {
      name: 'link',
      description: 'The link URL',
      control: {
        type: 'text',
      },
    },
    linkName: {
      name: 'linkName',
      description: 'Name for the link URL',
      control: {
        type: 'text',
      },
    },
    isExpandable: {
      name: 'isExpandable',
      description: 'Change notification to expadable and show content',
      control: {
        type: 'boolean',
      },
    },
    isFull: {
      name: 'isFull',
      description: 'Change notification format to full view',
      control: {
        type: 'boolean',
      },
    },
  },
}

export const Default = NotificationTemplate.bind({})

export const AllStatus = (args) => ({
  components: { SbNotification },
  props: Object.keys(args),
  template: `<div>
    <SbNotification
      v-bind="{
        status: 'positive',
        title,
        description ,
        linkName,
        link,
        isExpandable,
        isFull
      }"/>
    <SbNotification
      v-bind="{
        status: 'general',
        title,
        description ,
        linkName,
        link,
        isExpandable,
        isFull
      }"/>
    <SbNotification
      v-bind="{
        status: 'warning',
        title,
        description ,
        linkName,
        link,
        isExpandable,
        isFull
      }"/>
    <SbNotification
      v-bind="{
        status: 'info',
        title,
        description ,
        linkName,
        link,
        isExpandable,
        isFull
    }"/>
    <SbNotification
      v-bind="{
        status: 'negative',
        title,
        description ,
        linkName,
        link,
        isExpandable,
        isFull
      }"/>
  </div>`,
})

AllStatus.parameters = {
  docs: {
    description: {
      story:
        'You can set the `status` property to change the type of the `SbNotification`',
    },
  },
}

export const AllSizes = (args) => ({
  components: { SbNotification },
  props: Object.keys(args),
  template: `<div>
    <SbNotification
        v-bind="{
          status: 'positive',
          title,
          description ,
          linkName,
          link,
          isExpandable,
          isFull
    }"/>
    <SbNotification
      v-bind="{
        status: 'positive',
        title,
        description: 'This is a awesome component from Storyblok DS.',
        linkName,
        link: 'http://#',
        isExpandable,
        isFull
    }"/>
    <SbNotification
      v-bind="{
        status: 'negative',
        title,
        description,
        linkName,
        link,
        isExpandable,
        isFull: true
    }"/>
    <SbNotification
        v-bind="{
          status: 'negative',
          title,
          description: 'This is a awesome component from Storyblok Desing Sistem',
          linkName,
          link: 'http://#',
          isExpandable,
          isFull: true
    }"/>
  </div>`,
})

AllSizes.parameters = {
  docs: {
    description: {
      story:
        'You can create notifications of standard size or full size, with or without content',
    },
  },
}

export const ExpandableNotification = (args) => ({
  components: { SbNotification },
  props: Object.keys(args),
  template: `<div>
    <SbNotification
        v-bind="{
          status: 'info',
          title,
          description: 'This is a awesome component from Storyblok Desing Sistem',
          linkName,
          link: 'http://#',
          isExpandable: true,
          isFull
    }"/>

    <br />

    <SbNotification
        v-bind="{
          status: 'info',
          title,
          description: 'This is a awesome component from Storyblok Desing Sistem',
          linkName,
          link: 'http://#',
          isExpandable: true,
          isFull: true
    }"/>
  </div>`,
})

ExpandableNotification.parameters = {
  docs: {
    description: {
      story:
        'You can create expansive notifications, to hide part of the content, for this pass the `isExpandable` prop',
    },
  },
}
