import SbNotification from './index'
import { withKnobs, text, select } from '@storybook/addon-knobs'

export default {
  title: 'SbNotification',
  component: SbNotification,
  decorators: [withKnobs]
}

export const Default = () => ({
  components: { SbNotification },
  props: {
    title: {
      default: () => text('Title', 'A very interesting title')
    },
    description: {
      default: () => text('Description', 'Subtitle text goes here.')
    },
    link: {
      default: () => text('Link', 'Example link')
    },
    status: {
      default: () => select('Status', ['general', 'success', 'warning', 'info', 'error'])
    }
  },
  template: `<SbNotification 
                :status="status"
                :title="title"
                :description="description "
                :link-name="link"
                link="http://#">
             </SbNotification>`
})

export const NotificationWithoutLink = () => ({
  components: { SbNotification },
  template: `<SbNotification 
                status="success"
                title="Success"
                description="Subtitle text goes here.">
             </SbNotification>`
})

export const MultipleNotifications = () => ({
  components: { SbNotification },
  template: `<div>
    <SbNotification 
      status="success"
      title="Success"
      description="This component has been successfully rendered"
      link-name="Example link"
      link="http://#">
    </SbNotification>

    <SbNotification 
      status="warning"
      title="This component has 2 warnings"
      description="This component has been successfully rendered, but have 2 warnings"
      link-name="Example link"
      link="http://#">
    </SbNotification>

    <SbNotification 
      status="info"
      title="This component has an info"
      description="Subtitle text goes here. "
      link-name="Example link"
      link="http://#">
    </SbNotification>

    <SbNotification 
      status="error"
      title="This component has an error"
      description="Subtitle text goes here. "
      link-name="Example link"
      link="http://#">
    </SbNotification>

    <SbNotification 
      title="Notification title"
      description="Subtitle text goes here. "
      link-name="Example link"
      link="http://#">
    </SbNotification>
  </div>`
})

export const BannerNotification = () => ({
  components: { SbNotification },
  props: {
    title: {
      default: () => text('Title', 'A interesting banner title')
    },
    description: {
      default: () => text('Description', 'Subtitle text goes here.')
    },
    status: {
      default: () => select('Status', ['general', 'success', 'warning', 'info', 'error'])
    }
  },
  template: `
    <SbNotification
      :status="status" 
      :title="title"
      :description="description"
      link="http://#"
      format="banner">
    </SbNotification>
  `
})

export const AllBannersNotification = () => ({
  components: { SbNotification },
  template: `<div>
  <SbNotification 
      status="success"
      title="Success title"
      description="Subtitle text goes here"
      link="http://#"
      format="banner">
  </SbNotification>
  <SbNotification 
      status="info"
      title="Information title"
      description="Subtitle text goes here"
      link="http://#"
      format="banner">
  </SbNotification>
  <SbNotification 
      status="warning"
      title="Warning title"
      description="Subtitle text goes here"
      link="http://#"
      format="banner">
  </SbNotification>
  <SbNotification 
      status="error"
      title="Error title"
      description="Subtitle text goes here"
      link="http://#"
      format="banner">
  </SbNotification>
  <SbNotification 
      status="general"
      title="general title"
      description="Subtitle text goes here"
      link="http://#"
      format="banner">
  </SbNotification>
  </div>`
})

export const ShortBanner = () => ({
  components: { SbNotification },
  template: `
  <SbNotification 
      status="general"
      title="general title"
      link="http://#"
      link-name="To next"
      short>
  </SbNotification>`
})

export const ShortBanners = () => ({
  components: { SbNotification },
  template: `<div>
  <SbNotification 
      status="success"
      title="success title"
      link="http://#"
      link-name="To next"
      short>
  </SbNotification>
  <SbNotification 
      status="error"
      title="Error title"
      link="http://#"
      link-name="To next"
      short>
  </SbNotification>
  <SbNotification 
      status="warning"
      title="Warning title"
      link="http://#"
      link-name="To next"
      short>
  </SbNotification>
  <SbNotification 
      status="info"
      title="Info title"
      link="http://#"
      link-name="To next"
      short>
  </SbNotification>
  <SbNotification 
      status="general"
      title="General title"
      link="http://#"
      link-name="To next"
      short>
  </SbNotification>
  </div>`
})
