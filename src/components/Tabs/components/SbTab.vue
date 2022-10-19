<template>
  <button
    class="sb-tab"
    :class="computedClasses"
    :tabindex="computedTabIndex"
    :aria-selected="activate + ''"
    role="tab"
    type="button"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <SbIcon v-if="icon" :name="icon" size="normal" />
    <SbEditableInput
      v-if="allowShowEditInput"
      :model-value="label"
      @keydown="handleKeyDownEditInput"
    />
    <span v-else-if="label" class="sb-tab__label">
      {{ capitalize(label) }}
    </span>
    <SbEditButton
      v-if="editable && !isDisabled"
      @click="handleClickEditButton"
    />
  </button>
</template>

<script>
import SbIcon from '../../Icon'
import SbEditableInput from './SbEditableInput'
import SbEditButton from './SbEditButton'

import { Tooltip } from '../../../directives'
import { capitalize } from '../../../utils'

export default {
  name: 'SbTab',

  components: {
    SbIcon,
    SbEditableInput,
    SbEditButton,
  },

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
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['activate-tab', 'cancel-edit-tab', 'edit-tab', 'keydown'],

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
    computedClasses() {
      return {
        'sb-tab--disabled': this.isDisabled,
        'sb-tab--has-icon': this.icon,
        'sb-tab--editable': this.editable,
        'sb-tab--is-active': this.activate,
      }
    },
    computedTabIndex() {
      return this.activate ? null : -1
    },
  },

  methods: {
    capitalize,
    triggerActivateTab(value) {
      this.$emit('activate-tab', value)
    },

    handleClick() {
      if (!this.isDisabled) {
        this.triggerActivateTab(this.name)
      }
    },

    handleKeyDown(event) {
      this.$emit('keydown', event)
    },

    handleClickEditButton() {
      this.internalEditable = true
    },

    handleKeyDownEditInput(event) {
      if (event.key === 'Enter') {
        event.stopPropagation()
        event.preventDefault()
        this.internalEditable = false
        this.triggerActivateTab(this.name)
        this.$emit('edit-tab', {
          label: this.capitalize(event.target.value) || this.label,
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
}
</script>
