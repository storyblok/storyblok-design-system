import SbIcon from '../../Icon'
import SbTooltip from '../../Tooltip'
import { capitalize } from '../../../utils'

// @vue/component
export const SbTabAdd = {
  name: 'SbTabAdd',

  functional: true,

  render (h, { listeners }) {
    return h('li', {
      staticClass: 'sb-tab-add',
      attrs: {
        'data-testid': 'new-tab-container'
      }
    }, [
      h(SbTooltip, {
        props: {
          label: 'New Tab',
          position: 'bottom'
        }
      },
      [
        h('button', {
          attrs: {
            class: 'sb-tabs__add-button'
          },
          on: {
            ...listeners
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
    ])
  }
}

// @vue/component
const SbEditableInput = {
  name: 'SbEditableInput',

  props: {
    value: String
  },

  mounted () {
    this.$refs.editInput.focus()
  },

  render (h) {
    return h('input', {
      attrs: {
        value: this.value
      },
      ref: 'editInput',
      on: {
        ...this.$listeners
      }
    })
  }
}

// @vue/component
const SbEditButton = {
  name: 'SbEditButton',

  functional: true,

  render (h, { listeners }) {
    return h(SbTooltip, {
      props: {
        label: 'Edit',
        position: 'bottom'
      }
    },
    [
      h('button', {
        staticClass: 'sb-tab-edit-button',
        on: {
          ...listeners
        }
      },
      [
        h(SbIcon, {
          props: {
            name: 'edit',
            size: 'small',
            color: 'primary-dark'
          }
        })
      ])
    ])
  }
}

/**
 * @vue/component
 *
 * SbTab component
 *
 * SbTab is a tab component to perform a tab visualization.
 */
export const SbTab = {
  name: 'SbTab',

  props: {
    activate: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    name: {
      type: [String, Number]
    },
    showEditInput: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      internalEditable: this.edited,
      showEditButton: false
    }
  },

  computed: {
    allowShowEditInput () {
      return this.showEditInput || this.internalEditable
    }
  },

  methods: {
    /**
     * triggers the active-tab event
     * @param {Event} value
     */
    $_triggerActivateTab (value) {
      this.$emit('activate-tab', value)
    },

    /**
     * handles with click on li element and triggers the active-tab event
     */
    handleClick () {
      this.$_triggerActivateTab(this.name)
    },

    /**
     * forwards the keydown event
     * @param {Event} event
     */
    handleKeyDown (event) {
      this.$emit('keydown', event)
    },

    /**
     * enable internal edit state when clicks in the edit button
     */
    handleClickEditButton () {
      this.internalEditable = true
    },

    /**
     * handles with keydown event emitted by edit input
     * @param {Event} event
     */
    handleKeyDownEditInput (event) {
      if (event.key === 'Enter') {
        this.internalEditable = false
        this.$_triggerActivateTab(event.target.value.toLowerCase())
        this.$emit('edit-tab', {
          label: capitalize(event.target.value) || this.label,
          name: this.name
        })
      }

      if (event.key === 'Escape') {
        this.internalEditable = false

        this.$emit('cancel-edit-tab')
      }
    }
  },

  render (h) {
    const renderEditedTab = () => {
      return h(SbEditableInput, {
        props: {
          value: this.label
        },
        on: {
          keydown: this.handleKeyDownEditInput
        }
      })
    }

    const renderEditButton = () => {
      return h(SbEditButton, {
        on: {
          click: this.handleClickEditButton
        }
      })
    }

    const renderLabel = () => h('span', capitalize(this.label))

    return h('li', {
      staticClass: 'sb-tab',
      attrs: {
        ...this.$attrs,
        role: 'tab',
        tabindex: this.activate ? 0 : -1,
        'aria-selected': this.activate + ''
      },
      class: {
        'sb-tab--editable': this.editable,
        'sb-tab--is-active': this.activate
      },
      on: {
        click: this.handleClick,
        keydown: this.handleKeyDown
      }
    },
    [
      this.allowShowEditInput && renderEditedTab(),
      !this.allowShowEditInput && renderLabel(),
      this.editable && renderEditButton()
    ])
  }
}
