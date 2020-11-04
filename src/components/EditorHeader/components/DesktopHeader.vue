<template>
  <div class="sb-editor-header__desktop">
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

    <SbHeaderSeparator v-if="users" />

    <SbHeaderItem v-if="languages">
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

    <!-- actions -->

    <!-- save button -->

    <!-- status published -->

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
</template>

<script>
import SbHeaderItem from './HeaderItem'
import SbHeaderSeparator from './HeaderSeparator'
import SbButton from '../../Button'
import SbAvatarGroup from '../../AvatarGroup'
import SbAvatar from '../../Avatar'
import {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  SbMenuItem,
  SbMenuGroup,
} from '../../Menu'

import { sharedProps } from '../lib'

export default {
  name: 'SbDesktopHeader',

  components: {
    SbHeaderItem,
    SbHeaderSeparator,
    SbButton,
    SbAvatarGroup,
    SbAvatar,
    SbMenu,
    SbMenuButton,
    SbMenuList,
    SbMenuItem,
    SbMenuGroup,
  },

  props: {
    ...sharedProps,
  },

  data: () => ({
    selectedLanguage: null,
  }),

  methods: {
    handleSetNewLanguage(lang) {
      this.selectedLanguage = lang
      this.$emit('change-language', { language: lang })
    },
  },
}
</script>

<style></style>
