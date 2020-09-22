import {
  SbTabs,
  SbTab,
  SbTabPanels,
  SbTabPanel,
  SbTabList
} from '.'

export default {
  title: 'SbTabs',
  component: SbTabs,
  args: {
    showAddButton: false,
    type: null
  },
  argTypes: {
    showAddButton: {
      name: 'showAddButton',
      description: 'Prop to show the button for adding new tabs.',
      control: {
        type: 'boolean'
      }
    },
    type: {
      name: 'type',
      description: 'With prop `type` you can change the type of tab view',
      control: {
        type: 'select',
        options: ['default', 'container', 'vertical']
      }
    }
  }
}

export const Default = args => ({
  components: { SbTabs, SbTab, SbTabList },
  props: Object.keys(args),
  methods: {
    onUpdate (val) {
      this.content.push(val)
    }
  },
  data () {
    return {
      content: []
    }
  },
  template: `
    <SbTabs v-bind="{ showAddButton, type }" @changeModel="onUpdate">
      <SbTabList>
        <SbTab label="First" name="first" is-active />
        <SbTab label="Secondary" name="secondary" />
        <SbTab label="Third" name="third" />
        <SbTab v-for="item in content" :key="item.name" :label="item.value" :name="item.name" />
      </SbTabList>
    </SbTabs>
  `
})

export const TabsWithTabPanels = args => ({
  components: { SbTabs, SbTab, SbTabPanels, SbTabPanel, SbTabList },
  props: Object.keys(args),
  template: `
    <SbTabs v-bind="{ showAddButton, type }">
      <SbTabList>
        <SbTab label="First" name="first" is-active />
        <SbTab label="Secondary" name="secondary" />
        <SbTab label="Third" name="third" />
      </SbTabList>
      
      <SbTabPanels>
        <SbTabPanel name="first">
          Panel first
        </SbTabPanel>

        <SbTabPanel name="secondary">
          Panel secondary
        </SbTabPanel>

        <SbTabPanel name="third">
         Panel third
        </SbTabPanel>
        
      </SbTabPanels>
    </SbTabs>
  `
})
