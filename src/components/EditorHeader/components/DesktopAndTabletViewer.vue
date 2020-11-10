<template>
  <div class="sb-editor-header__desktop">
    <div v-if="isDesktopFormat" class="header__desktop">
      <span class="desktop__title">{{ headerTitle }}</span>
      <span class="desktop__sub-title">{{ headerSubTitle }}</span>
    </div>
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

    <SbHeaderItem v-if="languages" with-separator>
      <SbMenu>
        <SbMenuButton :label="menuButtonLabel" is-borderless />
        <SbMenuList placement="bottom-start">
          <SbMenuGroup title="Languages">
            <SbMenuItem
              v-for="lang in languages"
              :key="lang.id"
              @click="handleSetNewLanguage(lang)"
            >
              {{ lang }}
            </SbMenuItem>
          </SbMenuGroup>
        </SbMenuList>
      </SbMenu>
    </SbHeaderItem>

    <div class="sb-editor-header__actions">
      <SbHeaderItem
        v-for="act in actions"
        v-show="isOnDesktop"
        :key="act.id"
        with-separator
      >
        <button class="action__button" @click="handleSelectNewAction(act.name)">
          <SbTooltip position="bottom" :label="act.name">
            <SbIcon :name="act.name.toLowerCase()" size="large" />
          </SbTooltip>
        </button>
      </SbHeaderItem>
      <SbHeaderItem v-if="isOnMobileOrTablet" with-separator>
        <SbMenu>
          <SbMenuButton
            v-if="isLessThanTablet"
            icon-name="chevron-down"
            has-icon-only
            is-borderless
          />
          <SbMenuButton v-else label="More" is-borderless />

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
    </div>
  </div>
</template>

<script>
import SbTooltip from '../../Tooltip'
import SbHeaderItem from './HeaderItem'
import SbAvatarGroup from '../../AvatarGroup'
import SbAvatar from '../../Avatar'
import {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  SbMenuItem,
  SbMenuGroup,
} from '../../Menu'
import SbIcon from '../../Icon'
import { sharedProps } from '../lib'

export default {
  name: 'SbDesktopAndTabletViwer',

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
  },

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
      return this.selectedLanguage || this.languages[0]
    },

    isOnMobileOrTablet() {
      return this.isOnMobile || this.isOnTablet
    },

    isLessThanTablet() {
      return this.size < 700
    },
  },

  methods: {
    /**
     * method to emit new language
     */
    handleSetNewLanguage(lang) {
      this.$emit('changes', { type: 'lang', language: lang })
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
