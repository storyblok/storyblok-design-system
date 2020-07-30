import SbNotification from './index'

export default {
  title: 'SbNotification',
  component: SbNotification
}

export const Default = () => ({
  components: { SbNotification },
  template: `<SbNotification 
                status="success"
                title="Notification title"
                description="Subtitle text goes here. "
                link-name="Example link"
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
  template: `
    <SbNotification 
      title="Notification title"
      description="Subtitle text goes here"
      link="http://#"
      format="banner">
    </SbNotification>
  `
})
