import SbNotification from './index'

const NotificationTemplate = (args) => ({
  components: { SbNotification },
  setup() {
    return { args }
  },
  template: `
    <SbNotification
      v-bind="args"
    />`,
})

export default {
  title: 'Data/SbNotification',
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
      options: ['general', 'positive', 'warning', 'info', 'negative'],
      control: {
        type: 'select',
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
  setup() {
    return { args }
  },
  template: `<div>
    <SbNotification
    v-bind="args"
      status="positive"
    />
    <SbNotification
    v-bind="args"
      status="general"
    />
    <SbNotification
    v-bind="args"
      status="warning"
    />
    <SbNotification
    v-bind="args"
     status="info"
      />
    <SbNotification
    v-bind="args"
      status="negativ"
      />
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
  setup() {
    return { args }
  },
  template: `<div>
    <SbNotification
      v-bind="args"
        status="positive"
      />
    <SbNotification
      v-bind="args"
      status="positive"
      description="This is a awesome component from Storyblok DS."
      link="http://#"
      />
    <SbNotification
      v-bind="args"
      status="negative"
      isFull="true"
      />
    <SbNotification
      v-bind="args"
      status="negative"
      description="This is a awesome component from Storyblok Desing Sistem"
      link="http://#"
      isFull="true"
      />
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
  setup() {
    return { args }
  },
  template: `<div>
    <SbNotification
        v-bind="args"
        status="info"
        description="This is a awesome component from Storyblok Desing Sistem"
        link="http://#"
        isExpandable="true"
        />

    <br />

    <SbNotification
      v-bind="args"
      status="info"
      description="This is a awesome component from Storyblok Desing Sistem"
      isExpandable="true"
      link="http://#"
      isFull="true"
    />
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
