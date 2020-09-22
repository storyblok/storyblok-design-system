import SbIcon from '../Icon'
import SbTooltip from '../Tooltip'
import { capitalize } from '../../utils'

import './tabs.scss'

const SbTabPanels = {
  name: 'SbTabPanel',

  render (h) {
    return h('div', {
      staticClass: 'sb-tab-panels'
    },
    [...this.$slots.default])
  }
}

const SbTabPanel = {
  name: 'SbTabPanel',
  props: {
    name: {
      type: String,
      default: null
    }
  },
  render (h) {
    return h('section', {
      staticClass: 'sb-tab-panel'
    },
    [...this.$slots.default])
  }
}

const SbTabList = {
  name: 'SbTabList',
  render (h) {
    const renderTabList = () => {
      return h('ul', {
        staticClass: 'sb-tab-list'
      },
      [
        ...this.$slots.default
      ])
    }

    return renderTabList()
  }
}

const SbTab = {
  name: 'SbTab',
  props: {
    label: {
      type: String,
      default: 'Tab'
    },
    name: {
      type: [String, Number]
    },
    edited: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onKeyDown (e) {
      if (e.key === 'Enter') {
        this.isEditable = false
        this.setActiveTab(e.target.value.toLowerCase())
        this.$emit('edited-tab', { value: capitalize(e.target.value) || this.label, name: e.target.value.toLowerCase() })
      }
    },
    setActiveTab (name) {
      if (name) {
        const tabs = document.getElementsByClassName('sb-tab')

        for (const tab of tabs) {
          if (tab !== tabs[name]) {
            tab.classList.value = tab.classList.value.split(' ').filter(e => e !== 'sb-tab--is-active')
          } else {
            tab.classList.value += ' sb-tab--is-active'
          }
        }

        this.active = name

        this.$emit('active-tab', name)
      }
    }
  },

  data () {
    return {
      active: '',
      showEditButton: false,
      isEditable: this.edited
    }
  },

  render (h) {
    const renderEditedTab = () => {
      return h('input', {
        staticClass: '',
        attrs: {
          autofocus: true
        },
        on: {
          keydown: this.onKeyDown
        }
      })
    }

    const renderEditButton = () => {
      return h(SbTooltip, {
        props: {
          id: 'add-button',
          label: 'Edit',
          position: 'top'
        }
      },
      [
        h('button', {
          staticClass: 'sb-tabs--edit-button',
          on: {
            click: () => { this.isEditable = true }
          }
        },
        [
          h(SbIcon, {
            props: {
              name: 'plus', // change to pencil when available
              size: 'small',
              color: 'primary-dark'
            }
          })
        ])
      ])
    }

    return h('li', {
      staticClass: 'sb-tab',
      class: {
        'sb-tab--is-active': this.name === this.active
      },
      attrs: {
        name: this.label.toLowerCase()
      },
      on: {
        click: () => { this.setActiveTab(this.name) },
        mouseenter: () => { this.showEditButton = true },
        mouseleave: () => { this.showEditButton = false }
      }
    },
    [
      this.isEditable ? [renderEditedTab()] : capitalize(this.label),
      this.showEditButton ? [renderEditButton()] : null
    ])
  }
}

const SbTabs = {
  name: 'SbTabs',
  props: {
    showAddButton: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    }
  },

  methods: {
    addNewTab (h) {
      this.tabsStories.push(h(SbTab, {
        props: {
          label: 'Tab',
          name: 'tab',
          edited: true
        },
        on: {
          'edited-tab': this.onEditedTab
        }
      }))
    },
    onEditedTab (content) {
      this.tabsStories = []
      this.$emit('changeModel', content)
    },
    setNewActiveTab (name) {
      this.activeTab = name
    }
  },

  data () {
    return {
      tabsStories: [],
      activeTab: null
    }
  },

  render (h) {
    const renderTabs = () => {
      return h('ul', {
        staticClass: 'sb-tabs',
        class: [
          `sb-tabs--${(this.type ? this.type : 'default')}`
        ],
        on: {
          'active-tab': () => this.setNewActiveTab
        }
      },
      [
        ...this.$slots.default,
        ...this.tabsStories,
        this.showAddButton ? renderAddButton() : null
        // this.activeTab ? [renderPanel()] : null
      ])
    }

    const renderAddButton = () => {
      return h(SbTooltip, {
        props: {
          id: 'add-button',
          label: 'New Label',
          position: 'top'
        }
      },
      [
        h('button', {
          attrs: {
            class: 'sb-tabs--add-button'
          },
          on: {
            click: () => this.addNewTab(h)
          }
        },
        [
          h(SbIcon, {
            props: {
              name: 'plus',
              size: 'small'
            }
          })
        ]
        )
      ])
    }

    return renderTabs()
  }
}

export {
  SbTabs,
  SbTab,
  SbTabPanels,
  SbTabPanel,
  SbTabList
}
