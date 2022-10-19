<template>
  <div class="sb-editor__container">
    <SbHeaderTitle :title="headerTitle" :format="returnViewFormat" />

    <div
      class="sb-editor-header"
      :class="{ 'sb-editor-header__mobile': isOnMobile }"
    >
      <SbDesktopAndTabletViewer
        v-if="isOnTabletOrDesktop"
        v-bind="{
          headerTitle,
          headerSubTitle,
          languages,
          users,
          actions,
          format: returnViewFormat,
          size: windowWidth,
          isOnMobile,
          isOnTablet,
          isOnDesktop,
          isOnMobileOrTablet,
        }"
        @changes="$_handleListenersOrchestrator"
      />
      <SbMobileViewer
        v-if="isOnMobile"
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
          'sb-editor-header__content--mobile': isOnMobile,
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
            variant="primary"
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
import SbDesktopAndTabletViewer from './components/DesktopAndTabletViewer'
import SbMobileViewer from './components/MobileViewer'
import SbHeaderTitle from './components/HeaderTitle'

import SbHeaderItem from './components/HeaderItem'
import SbIcon from '../Icon'

import SbButton from '../Button'

import { SbMenu, SbMenuButton, SbMenuList, SbMenuItem } from '../Menu'

import { sharedProps } from './lib'

import { WindowResizeObserverMixin } from '../../mixins'

export default {
  name: 'SbEditorHeader',

  components: {
    SbDesktopAndTabletViewer,
    SbHeaderTitle,
    SbMobileViewer,
    SbButton,
    SbHeaderItem,
    SbIcon,
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
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
    returnNameOfIconStatus() {
      return this.spaceStatus === 'published'
        ? 'published-circle'
        : 'status-circle'
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
      if (this.isOnDesktop) return 'desktop'

      return this.isOnTablet ? 'tablet' : 'mobile'
    },
  },

  methods: {
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
