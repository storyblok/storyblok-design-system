import SbIcon from '../../Icon'

import { Tooltip } from '../../../directives'
import { capitalize } from '../../../utils'

// @vue/component
export const SbTabAdd = {
  name: 'SbTabAdd',

  functional: true,

  directives: {
    tooltip: Tooltip,
  },

  render(h, { listeners, props }) {
    return h(
      'li',
      {
        staticClass: 'sb-tab-add',
        attrs: {
          'data-testid': 'new-tab-container',
        },
      },
      [
        h(
          'button',
          {
            attrs: {
              class: 'sb-tabs__add-button',
              'aria-label': 'New tab',
            },
            on: {
              ...listeners,
            },
            directives: [
              {
                name: 'tooltip',
                value: {
                  label: props.newTabLabel,
                  position: 'bottom',
                },
              },
            ],
          },
          [
            h(SbIcon, {
              props: {
                name: 'plus',
                size: 'normal',
                color: 'light-gray',
              },
            }),
          ]
        ),
      ]
    )
  },
}

// @vue/component
const SbEditableInput = {
  name: 'SbEditableInput',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  mounted() {
    this.$refs.editInput.focus()
  },

  render(h) {
    return h('input', {
      attrs: {
        value: this.value,
        placeholder: 'Type a label to new tab',
      },
      ref: 'editInput',
      on: {
        ...this.$listeners,
      },
    })
  },
}

// @vue/component
const SbEditButton = {
  name: 'SbEditButton',

  functional: true,

  directives: {
    tooltip: Tooltip,
  },

  render(h, { listeners }) {
    return h(
      'button',
      {
        staticClass: 'sb-tab-edit-button',
        on: {
          ...listeners,
        },
        directives: [
          {
            name: 'tooltip',
            value: {
              label: 'New Tab',
              position: 'bottom',
            },
          },
        ],
      },
      [
        h(SbIcon, {
          props: {
            name: 'edit',
            size: 'normal',
            color: 'light-gray',
          },
        }),
      ]
    )
  },
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

  directives: {
    tooltip: Tooltip,
  },

  props: {
    activate: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: [String, Number],
      default: '',
    },
    showEditInput: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      internalEditable: this.edited,
      showEditButton: false,
    }
  },

  computed: {
    allowShowEditInput() {
      return this.showEditInput || this.internalEditable
    },
  },

  methods: {
    /**
     * triggers the active-tab event
     * @param {Event} value
     */
    $_triggerActivateTab(value) {
      this.$emit('activate-tab', value)
    },

    /**
     * handles with click on li element and triggers the active-tab event
     */
    handleClick() {
      this.$_triggerActivateTab(this.name)
    },

    /**
     * forwards the keydown event
     * @param {Event} event
     */
    handleKeyDown(event) {
      this.$emit('keydown', event)
    },

    /**
     * enable internal edit state when clicks in the edit button
     */
    handleClickEditButton() {
      this.internalEditable = true
    },

    /**
     * handles with keydown event emitted by edit input
     * @param {Event} event
     */
    handleKeyDownEditInput(event) {
      if (event.key === 'Enter') {
        event.stopPropagation()
        event.preventDefault()
        this.internalEditable = false
        this.$_triggerActivateTab(this.name)
        this.$emit('edit-tab', {
          label: capitalize(event.target.value) || this.label,
          name: this.name,
        })
      }

      if (event.key === 'Escape') {
        event.stopPropagation()
        event.preventDefault()
        this.internalEditable = false

        this.$emit('cancel-edit-tab')
      }
    },
  },

  render(h) {
    const renderIcon = (icon) => {
      return h(SbIcon, {
        props: {
          size: 'normal',
          name: icon,
        },
      })
    }

    const renderEditedTab = () => {
      return h(SbEditableInput, {
        props: {
          value: this.label,
        },
        on: {
          keydown: this.handleKeyDownEditInput,
        },
      })
    }

    const renderEditButton = () => {
      return h(SbEditButton, {
        on: {
          click: this.handleClickEditButton,
        },
      })
    }

    const renderLabel = () => h('span', capitalize(this.label))

    return h(
      'li',
      {
        staticClass: 'sb-tab',
        attrs: {
          ...this.$attrs,
          role: 'tab',
          tabindex: this.activate ? 0 : -1,
          'aria-selected': this.activate + '',
        },
        class: {
          'sb-tab--has-icon': this.icon,
          'sb-tab--editable': this.editable,
          'sb-tab--is-active': this.activate,
        },
        on: {
          ...this.$listeners,
          click: this.handleClick,
          keydown: this.handleKeyDown,
        },
      },
      [
        this.icon && renderIcon(this.icon),
        this.allowShowEditInput && renderEditedTab(),
        !this.allowShowEditInput && renderLabel(),
        this.editable && renderEditButton(),
      ]
    )
  },
}
