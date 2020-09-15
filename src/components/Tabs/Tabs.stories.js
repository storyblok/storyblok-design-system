import SbTabs from '.'
import SbTab from '../Tab/index'

export default {
  title: 'SbTabs',
  component: SbTabs,
  args: {
    showAddButton: false
  },
  argTypes: {
    showAddButton: {
      name: 'showAddButton',
      description: 'Prop to show the button for adding new tabs.',
      control: {
        type: 'boolean'
      }
    }
  }
}

export const Default = args => ({
  components: { SbTabs, SbTab },
  props: Object.keys(args),
  template: `
    <SbTabs v-bind="{ showAddButton }">
      <SbTab label="First" />
      <SbTab label="Secondary" />
      <SbTab label="Third" />
    </SbTabs>
  `
})
