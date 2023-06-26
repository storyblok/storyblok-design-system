<template>
  <div class="sb-editor-header__actions">
    <SbHeaderItem v-if="users" class="header-item--avatar">
      <SbAvatarGroup :max-elements="returnNumberOfAvatars">
        <SbAvatar
          v-for="user in users"
          :key="user.id"
          :src="user.src"
          :name="user.name"
        />
      </SbAvatarGroup>
    </SbHeaderItem>

    <SbHeaderItem v-if="languages">
      <SbMenu>
        <SbMenuButton
          :label="menuButtonLabel"
          is-borderless
          variant="tertiary"
        />
        <SbMenuList placement="bottom-start">
          <SbMenuGroup title="Languages">
            <SbMenuItem
              v-for="lang in languages"
              :key="lang.code"
              @click="handleSetNewLanguage(lang)"
            >
              {{ lang.name }}
            </SbMenuItem>
          </SbMenuGroup>
        </SbMenuList>
      </SbMenu>
    </SbHeaderItem>

    <div v-if="actions" class="sb-editor-header__menu">
      <SbHeaderItem v-for="act in actions" v-show="isOnDesktop" :key="act.id">
        <button class="action__button" @click="handleSelectNewAction(act.name)">
          <SbTooltip position="bottom" :label="act.name">
            <SbIcon :name="act.name.toLowerCase()" size="large" />
          </SbTooltip>
        </button>
      </SbHeaderItem>
      <SbHeaderItem>
        <SbMenu>
          <SbMenuButton
            has-icon-only
            is-borderless
            size="small"
            variant="tertiary"
          />
          <SbMenuList placement="bottom-end">
            <SbMenuItem
              v-for="act in actions"
              :key="act.id"
              :type="act.type"
              @click="handleSelectNewAction(act.name)"
            >
              <SbIcon :name="act.name.toLowerCase()" size="large" />
              {{ act.name }}
            </SbMenuItem>
          </SbMenuList>
        </SbMenu>
      </SbHeaderItem>

      <SbHeaderItem v-if="hasSaveButton">
        <SbButton :label="saveButtonLabel" variant="secondary" />
      </SbHeaderItem>
    </div>
  </div>
</template>

<script>
import SbAvatar from '../../Avatar'
import SbButton from '../../Button'
import SbAvatarGroup from '../../AvatarGroup'
import SbHeaderItem from './HeaderItem'
import SbIcon from '../../Icon'
import SbTooltip from '../../Tooltip'

import {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  SbMenuItem,
  SbMenuGroup,
} from '../../Menu'

import { sharedProps } from '../sharedProps'

export default {
  name: 'SbHeaderActions',

  components: {
    SbHeaderItem,
    SbAvatarGroup,
    SbAvatar,
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
    SbIcon,
    SbTooltip,
    SbButton,
  },

  props: {
    ...sharedProps,
    format: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 1015,
    },
    isOnDesktop: Boolean,
    isOnTablet: Boolean,
    isOnMobile: Boolean,
    isOnMobileOrTablet: Boolean,
  },

  emits: ['language-change', 'changes'],

  data: () => ({
    selectedLanguage: null,
  }),

  computed: {
    returnNumberOfAvatars() {
      return (this.size < 1015 && this.format !== 'tablet') ||
        (this.size < 625 && this.format === 'tablet')
        ? 1
        : 5
    },

    isDesktopFormat() {
      return this.format === 'desktop'
    },

    menuButtonLabel() {
      return this.selectedLanguage || this.languages[0].name
    },

    isLessThanTablet() {
      return this.size < 700
    },
  },

  methods: {
    /**
     * method to emit new language
     */
    handleSetNewLanguage({ code, name }) {
      this.selectedLanguage = name
      this.$emit('language-change', { type: 'lang', language: code })
    },

    /**
     * method to emit new action
     */
    handleSelectNewAction(act) {
      this.$emit('changes', { type: 'act', action: act })
    },
  },
}
</script>
../sharedProps
