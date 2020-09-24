import {
  SbTabs,
  SbTab,
  SbTabPanels,
  SbTabPanel
} from '.'

const TabsTemplate = template => args => ({
  components: { SbTabs, SbTab, SbTabPanel, SbTabPanels },
  props: Object.keys(args),
  data () {
    return {
      tabs: [
        {
          label: 'First',
          name: 'first'
        },
        {
          label: 'Secondary',
          name: 'secondary'
        },
        {
          label: 'Third',
          name: 'third'
        }
      ],
      currentTab: 'first'
    }
  },
  methods: {
    onNewTab (val) {
      this.tabs.push(val)
    },
    onEditTab (val) {
      const index = this.tabs.findIndex(tab => tab.name === val.name)
      this.tabs[index] = {
        ...val
      }
    }
  },
  template
})

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
        options: ['container', 'vertical']
      }
    }
  }
}

export const Default = TabsTemplate(`
  <div>
    <SbTabs
      v-model="currentTab"
      :show-add-button="showAddButton"
      :type="type"
      @new-tab="onNewTab"
    >
      <SbTab
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
        editable
        @edit-tab="onEditTab"
      />
    </SbTabs>
  </div>
  `
).bind({})

export const TabsWithTabPanels = TabsTemplate(`
  <div>
    <SbTabs
      v-model="currentTab"
      :show-add-button="showAddButton"
      :type="type"
      @new-tab="onNewTab"
    >
      <SbTab
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
        editable
        @edit-tab="onEditTab"
      />
    </SbTabs>

    <SbTabPanels v-model="currentTab">
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
  </div>
  `
).bind({})
