<template>
  <Loading
    v-if="!uiBlock"
    v-bind="{
      type,
      size,
      modelValue,
      showPercentage,
      color,
      uiBlock,
    }"
  >
    <slot />
  </Loading>
  <SbBlockUI v-else>
    <Loading
      v-bind="{
        type,
        size,
        modelValue,
        showPercentage,
        color,
        uiBlock,
      }"
    >
      <slot />
    </Loading>
  </SbBlockUI>
</template>
<script lang="ts">
import SbBlockUI from '../BlockUI'
import Loading from './components/Loading'
import { sharedProps } from './utils'

export default {
  name: 'SbLoading',

  components: {
    Loading,
    SbBlockUI,
  },

  props: {
    ...sharedProps,
  },
}
</script>
<style lang="scss">
@import './loading';
</style>
