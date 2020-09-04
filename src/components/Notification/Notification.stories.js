import SbNotification from './index'

export default {
  title: 'SbNotification',
  component: SbNotification,
  parameters: {
    docs: {
      description: {
        component: 'Notification component sends various types of notification, with texts, descriptions and various links and diferent status.'
      }
    }
  },
  args: {
    status: 'general',
    title: 'Title',
    description: null,
    link: null,
    linkName: null,
    isBanner: false,
    isShort: false,
    isExpandable: false,
    isFull: false,
    notificationIcon: null
  },
  argTypes: {
    status: {
      name: 'status',
      description: 'Status color',
      control: {
        type: 'select',
        options: ['general', 'success', 'warning', 'info', 'error']
      }
    },
    title: {
      name: 'title',
      description: 'Title for notification',
      control: {
        type: 'text'
      }
    },
    description: {
      name: 'description',
      description: 'Notification description',
      control: {
        type: 'text'
      }
    },
    link: {
      name: 'link',
      description: 'The link URL',
      control: {
        type: 'text'
      }
    },
    linkName: {
      name: 'linkName',
      description: 'Name for the link URL',
      control: {
        type: 'text'
      }
    },
    notificationIcon: {
      name: 'notificationIcon',
      description: 'Change notification icon',
      control: {
        type: 'text'
      }
    },
    isBanner: {
      name: 'isBanner',
      description: 'Change notification format to Banner view',
      control: {
        type: 'boolean'
      }
    },
    isShort: {
      name: 'short',
      description: 'Change notification format to short view',
      control: {
        type: 'boolean'
      }
    },
    isExpandable: {
      name: 'isExpandable',
      description: 'Change notification to expadable and show content',
      control: {
        type: 'boolean'
      }
    },
    isFull: {
      name: 'isFull',
      description: 'Change notification format to full view',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = (args) => ({
  components: { SbNotification },
  props: Object.keys(args),
  template: `<SbNotification 
                :status="status"
                :title="title"
                :description="description "
                :link-name="linkName"
                :link="link"
                :is-banner="isBanner"
                :is-short="isShort"
                :is-expandable="isExpandable"
                :is-full="isFull"
                :notification-icon="notificationIcon">
             </SbNotification>`
})
