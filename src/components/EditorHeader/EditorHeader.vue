<template>
  <div class="sb-editor-header" :class="computedClasses">
    <slot name="left" />
    <SbHeaderTitle :title="headerTitle" />
    <slot />

    <slot name="middle" />
    <slot />

    <slot name="right" />
    <HeaderActions v-bind="$props" has-save-button />
    <slot />
  </div>
</template>

<script>
import SbHeaderTitle from './components/HeaderTitle'
import HeaderActions from './components/HeaderActions'

import { sharedProps } from './sharedProps'

import { WindowResizeObserverMixin } from '../../mixins'

export default {
  name: 'SbEditorHeader',

  components: {
    SbHeaderTitle,
    HeaderActions,
  },

  mixins: [WindowResizeObserverMixin()],

  props: {
    ...sharedProps,
    visual: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'change-language',
    'publish',
    'save',
    'select-action',
    'select-options',
  ],

  data: () => ({
    window: {
      width: 0,
    },
  }),

  computed: {
    computedClasses() {
      return {
        'sb-editor-header--dark': this.mode === 'dark',
      }
    },
  },

  methods: {
    handleSelectOptions(opt) {
      this.$emit('select-options', opt.toLowerCase().replace(' ', '-'))
    },

    handleSaveChanges() {
      this.$emit('save')
    },

    handlePublishSpace() {
      this.$emit('publish')
    },
  },
}
</script>
