import SbIcon from '../Icon'
import { capitalize } from '../../utils'

import './tabs.scss'
import './tab.scss'

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
    editLabel (e) {
      const editedLabel = prompt('Set new label for this tab: ', this.label)

      if (editedLabel) {
        e.target.innerText = capitalize(editedLabel)
      }
    },
    onKeyDown (e) {
      if (e.key === 'Enter') {
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
      active: ''
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

    return h('li', {
      staticClass: 'sb-tab',
      class: {
        'sb-tab--is-active': this.name === this.active
      },
      attrs: {
        name: this.label.toLowerCase()
      },
      on: {
        click: () => this.setActiveTab(this.name),
        dblclick: this.editLabel
      }
    },
    this.edited ? [renderEditedTab()] : capitalize(this.label))
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
      return h('button', {
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
    }

    return renderTabs()
  }
}

export {
  SbTabs,
  SbTab,
  SbTabPanels,
  SbTabPanel
}
