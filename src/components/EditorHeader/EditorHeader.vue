<template>
  <div class="sb-editor__container">
    <SbHeaderTitle :title="headerTitle" :format="returnViewFormat" />

    <div
      class="sb-editor-header"
      :class="{ 'sb-editor-header__mobile': returnViewFormat === 'mobile' }"
    >
      <SbDesktopAndTabletViwer
        v-if="returnViewFormat !== 'mobile'"
        v-bind="{
          languages,
          users,
          actions,
          format: returnViewFormat,
          size: window.width,
        }"
        @changes="$_handleListenersOrchestrator"
      />
      <SbMobileViwer
        v-if="returnViewFormat === 'mobile'"
        v-bind="{
          languages,
          users,
          actions,
        }"
        @changes="$_handleListenersOrchestrator"
      />
      <div
        class="sb-editor-header__content"
        :class="{
          'sb-editor-header__content--mobile': returnViewFormat === 'mobile',
        }"
      >
        <SbHeaderItem v-if="hasSaveButton" with-separator>
          <button
            class="sb-editor-header__save-button"
            @click="handleSaveChanges"
          >
            Save
          </button>
        </SbHeaderItem>

        <SbHeaderItem
          v-if="spaceStatus"
          with-separator
          class="sb-editor-header__status"
        >
          <SbIcon
            :name="returnNameOfIconStatus"
            size="large"
            :color="returnColorOfStatus"
          />
        </SbHeaderItem>

        <SbHeaderItem>
          <SbButton
            size="small"
            label="Publish"
            type="primary"
            @click="handlePublishSpace"
          />
        </SbHeaderItem>

        <SbHeaderItem v-if="options">
          <SbMenu>
            <SbMenuButton has-icon-only />
            <SbMenuList placement="bottom-end">
              <SbMenuItem
                v-for="option in options"
                :key="option.id"
                :type="option.type"
                @click="handleSelectOptions(option.name)"
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
import SbDesktopAndTabletViwer from './components/DesktopAndTabletViwer'
import SbMobileViwer from './components/MobileViwer'
import SbHeaderTitle from './components/HeaderTitle'

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
    SbDesktopAndTabletViwer,
    SbHeaderTitle,
    SbMobileViwer,
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
    window: {
      width: 0,
    },
  }),

  computed: {
    returnNameOfIconStatus() {
      return 'status-circle'
    },

    returnColorOfStatus() {
      return this.spaceStatus === 'unpublished'
        ? 'light'
        : this.spaceStatus === 'published'
        ? 'primary'
        : this.spaceStatus === 'published-and-changes'
        ? 'light-gray'
        : 'light'
    },

    returnViewFormat() {
      return this.window.width > 880
        ? 'desktop'
        : this.window.width > 600 && this.window.width < 880
        ? 'tablet'
        : 'mobile'
    },
  },

  created() {
    window.addEventListener('resize', this.$_handleResize)
    this.$_handleResize()
  },

  destroyed() {
    window.removeEventListener('resize', this.$_handleResize)
  },

  methods: {
    /**
     * method to listen and chenge the window.width
     */
    $_handleResize() {
      this.window.width = window.innerWidth
    },
    /**
     * this method is triggered when an action is taken on the
     * desktop and mobile components, it works as an orchestrator,
     * to distribute the emits.
     */
    $_handleListenersOrchestrator(action) {
      if (action.type === 'lang') {
        this.handleSetNewLanguage(action.language)
      }
      if (action.type === 'act') {
        this.handleSelectAction(action.action)
      }
    },
    /**
     * method to emit the selection of new option
     */
    handleSelectOptions(opt) {
      this.$emit('select-options', opt.toLowerCase().replace(' ', '-'))
    },
    /**
     * method to emit save changes on space
     */
    handleSaveChanges() {
      this.$emit('save')
    },
    /**
     * method to emit the publish event
     */
    handlePublishSpace() {
      this.$emit('publish')
    },
    /**
     * method to emit the new action
     */
    handleSelectAction(act) {
      this.$emit('select-action', act.toLowerCase().replace(' ', '-'))
    },
    /**
     * method to emit the selection of a language
     */
    handleSetNewLanguage(lang) {
      this.$emit('change-language', { language: lang })
    },
  },
}
</script>

<style lang="scss">
@import './editor-header.scss';
</style>
