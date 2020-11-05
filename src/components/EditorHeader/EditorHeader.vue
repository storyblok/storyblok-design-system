<template>
  <div class="sb-editor__container">
    <HeaderTitle
      :title="headerTitle"
      :sub-title="headerSubTitle"
      :format="returnViewFormat"
    />

    <div
      class="sb-editor-header"
      :class="{ 'sb-editor-header__mobile': returnViewFormat === 'mobile' }"
    >
      <DesktopAndTabletViwer
        v-if="returnViewFormat !== 'mobile'"
        v-bind="{
          languages,
          users,
          actions,
          format: returnViewFormat,
        }"
      />
      <MobileViwer
        v-if="returnViewFormat === 'mobile'"
        v-bind="{
          languages,
          users,
          actions,
        }"
      />
      <div
        class="sb-editor-header__content"
        :class="{
          'sb-editor-header__content--mobile': returnViewFormat === 'mobile',
        }"
      >
        <SbHeaderItem v-if="hasSaveButton" with-separator>
          <button class="sb-editor-header__save-button">Save</button>
        </SbHeaderItem>

        <SbHeaderItem v-if="isPublished" with-separator>
          <SbIcon name="status-circle" size="large" color="primary" />
        </SbHeaderItem>

        <SbHeaderItem v-if="hasSaveButton">
          <SbButton size="small" label="Publish" type="primary" />
        </SbHeaderItem>

        <SbHeaderItem v-if="options">
          <SbMenu>
            <SbMenuButton has-icon-only />
            <SbMenuList placement="bottom-start">
              <SbMenuItem
                v-for="option in options"
                :key="option.id"
                :type="option.type"
              >
                {{ option.name }}
              </SbMenuItem>
            </SbMenuList>
          </SbMenu>
        </SbHeaderItem>
      </div>
    </div>
  </div>
</template>

<script>
import DesktopAndTabletViwer from './components/DesktopAndTabletViwer'
import MobileViwer from './components/MobileViwer'
import HeaderTitle from './components/HeaderTitle'

import SbHeaderItem from './components/HeaderItem'
import SbIcon from '../Icon'

import SbButton from '../Button'

import {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  SbMenuItem,
  // SbMenuGroup,
} from '../Menu'

import { sharedProps } from './lib'

export default {
  name: 'SbEditorHeader',

  components: {
    DesktopAndTabletViwer,
    HeaderTitle,
    MobileViwer,
    SbButton,
    SbHeaderItem,
    SbIcon,
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    // SbMenuGroup,
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
