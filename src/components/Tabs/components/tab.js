import SbIcon from '../../Icon'
import SbTooltip from '../../Tooltip'
import { capitalize } from '../../../utils'

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
      showEditButton: false,
      internalEditable: this.edited
    }
  },

  computed: {
    allowShowEditInput () {
      return this.showEditInput || this.internalEditable
    }
  },

  methods: {
    onKeyDownEditInput (e) {
      if (e.key === 'Enter') {
        this.internalEditable = false
        this.emitActivateTab(e.target.value.toLowerCase())
        this.$emit('edit-tab', {
          label: capitalize(e.target.value) || this.label,
          name: this.name
        })
      }

      if (e.key === 'Escape') {
        this.internalEditable = false

        this.$emit('cancel-edit-tab')
      }
    },
    emitActivateTab (value) {
      this.$emit('activate-tab', value)
    },
    handleClick () {
      this.$emit('activate-tab', this.name)
    },
    handleKeyDown (event) {
      this.$emit('change-tab', event)
    },
    setEditable () {
      this.internalEditable = true
    }
  },

  render (h) {
    const renderEditedTab = () => {
      return h(SbEditableInput, {
        props: {
          value: this.label
        },
        on: {
          keydown: this.onKeyDownEditInput
        }
      })
    }

    const renderEditButton = () => {
      return h(SbEditButton, {
        on: {
          click: this.setEditable
        }
      })
    }

    const renderLabel = () => h('span', capitalize(this.label))

    return h('li', {
      staticClass: 'sb-tab',
      attrs: {
        role: 'tab',
        tabindex: this.activate ? 0 : -1,
        'aria-selected': this.activate + '',
        ...this.$attrs
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
