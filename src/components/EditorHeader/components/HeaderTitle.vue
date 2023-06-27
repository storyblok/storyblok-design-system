<template>
  <div class="sb-editor-header__title">
    <SbButton
      icon="chevron-left"
      variant="tertiary"
      size="small"
      @click="$emit('go-back')"
    />
    <div class="sb-editor-header__title-text">
      <p>{{ headerTitle }}</p>
      <p class="sb-editor-header__subtitle">{{ headerSubtitle }}</p>
    </div>
  </div>
</template>

<script>
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
