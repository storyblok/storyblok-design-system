<template>
  <div class="sb-editor-header__title">
    <SbButton
      has-icon-only
      icon="arrow-left"
      variant="tertiary"
      size="small"
      @click="$emit('go-back')"
    />
    <div class="sb-editor-header__title-text">
      <p>{{ headerTitle }}</p>
      <p class="sb-editor-header__subtitle">{{ headerSubtitle }}</p>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import SbButton from '../../Button'
import { sharedProps } from '../sharedProps'

export default {
  name: 'SbHeaderTitle',

  components: {
    SbButton,
  },

  props: {
    ...sharedProps,
  },

  emits: ['go-back'],
}
</script>
