<template>
  <div class="sb-editor-header__mobile--more">
    <SbHeaderItem>
      <SbMenu>
        <SbMenuButton label="More" />

        <SbMenuList placement="bottom-start">
          <!-- <SbMenuItem
            v-for="option in options"
            :key="option.id"
            :type="option.type"
          >
            {{ option.name }}
          </SbMenuItem> -->
        </SbMenuList>
      </SbMenu>
    </SbHeaderItem>
  </div>
</template>

<script>
import SbHeaderItem from './HeaderItem'
// import SbAvatar from '../../Avatar'
import {
  SbMenu,
  SbMenuButton,
  SbMenuList,
  // SbMenuItem,
  // SbMenuGroup,
} from '../../Menu'
// import SbIcon from '../../Icon'

import { sharedProps } from '../lib'
export default {
  name: 'SbMobileViwer',

  components: {
    SbHeaderItem,
    // SbAvatar,
    SbMenu,
    SbMenuButton,
    SbMenuList,
    // SbMenuItem,
    // SbMenuGroup,
    // SbIcon,
  },

  props: {
    ...sharedProps,
  },
}
</script>
