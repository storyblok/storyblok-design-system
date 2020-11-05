<template>
  <div class="sb-editor-header__desktop">
    <div v-if="format === 'desktop'" class="header__desktop">
      <span class="desktop__title">{{ headerTitle }}</span>
      <span class="desktop__sub-title">{{ headerSubTitle }}</span>
    </div>
    <SbHeaderItem v-if="users">
      <SbAvatarGroup>
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
        <SbMenuButton :label="selectedLanguage || languages[0]" />
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
      <SbHeaderItem v-for="act in actions" :key="act.id" with-separator>
        <button class="action__button">
          <SbIcon :name="act.name" size="large" />
        </button>
      </SbHeaderItem>
    </div>
  </div>
</template>

<script>
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
  name: 'DesktopAndTabletViwer',

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
  },

  props: {
    ...sharedProps,
    format: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    selectedLanguage: null,
  }),

  methods: {
    handleSetNewLanguage(lang) {
      this.selectedLanguage = lang
      this.$emit('change-language', { language: lang })
    },

    handleSaveChanges() {
      this.$emit('save')
    },
  },
}
</script>

<style></style>
