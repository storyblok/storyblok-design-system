<template>
  <div class="sb-editor__container">
    <div v-if="returnViewFormat !== 'desktop'" class="sb-editor--title">
      <SbButton icon="plus" type="secondary" size="small" />
      <span>{{ sharedProps.titleLabel }}</span>
    </div>
    <div class="sb-editor-header">
      <SbDesktopHeader
        v-if="returnViewFormat === 'desktop'"
        v-bind="{
          languages,
          users,
          actions,
          options,
          isPublished,
          hasSaveButton,
          showPublishedIcon,
        }"
      />
      <SbTabletHeader v-if="returnViewFormat === 'tablet'" />
      <SbMobileHeader v-if="returnViewFormat === 'mobile'" />
    </div>
  </div>
</template>

<script>
import SbDesktopHeader from './components/DesktopHeader'
import SbTabletHeader from './components/TabletHeader'
import SbMobileHeader from './components/MobileHeader'
import SbButton from '../Button'

import { sharedProps } from './lib'

export default {
  name: 'SbEditorHeader',

  components: {
    SbDesktopHeader,
    SbTabletHeader,
    SbMobileHeader,
    SbButton,
  },

  props: {
    ...sharedProps,
  },

  data: () => ({
    selectedLanguage: null,
    window: {
      width: 0,
    },
  }),

  computed: {
    returnViewFormat() {
      return this.window.width > 850
        ? 'desktop'
        : this.window.width > 600 && this.window.width < 850
        ? 'tablet'
        : 'mobile'
    },
  },

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.window.width = window.innerWidth
    },
    handleSetNewLanguage(lang) {
      this.selectedLanguage = lang
      this.$emit('change-language', { language: lang })
    },
  },
}
</script>

<style lang="scss">
@import './editor-header.scss';
</style>
