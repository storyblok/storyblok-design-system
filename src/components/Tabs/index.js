import SbIcon from '../Icon'
import { capitalize } from '../../utils'

import './tabs.scss'
import './tab.scss'

export const SbTabPanel = {
  name: 'SbTabPanel',
  props: {

  },
  render (h) {

  }
}

export const SbTab = {
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
    }
  },

  methods: {
    editLabel () {
      const editedLabel = prompt('Set new label for this tab: ', this.label)

      if (editedLabel === '') {
        return
      }

      this.newLabel = editedLabel
    },
    onKeyDown (e) {
      if (e.key === 'Enter') {
        this.$emit('edited-tab', { value: capitalize(e.target.value) || this.label, name: this.name })
      }
    }
  },

  data () {
    return {
      newLabel: null
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

    return h('span', {
      staticClass: 'sb-tab',
      attrs: {
        name: this.label.toLowerCase()
      },
      on: {
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
    }
  },

  data () {
    return {
      tabsStories: []
    }
  },

  render (h) {
    const renderTabs = () => {
      return h('div', {
        staticClass: 'sb-tabs',
        class: [
          `sb-tabs--${(this.type ? this.type : 'default')}`
        ]
      },
      [
        ...this.$slots.default,
        ...this.tabsStories,
        this.showAddButton ? renderAddButton() : null
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

export default SbTabs
