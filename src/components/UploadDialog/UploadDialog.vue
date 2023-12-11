<template>
  <SbBlockUi>
    <div class="sb-upload-dialog">
      <div class="sb-upload-dialog__content">
        <SbIcon name="refreshing" size="small" color="primary" />
        <span class="sb-upload-dialog__label"> {{ labelToUpload }} </span>
        <span v-if="timeLeft" class="sb-upload-dialog__time-left">
          {{ timeLeftLabel }}
        </span>
      </div>
      <SbLoading type="bar" :model-value="percentageValue" />
    </div>
  </SbBlockUi>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SbIcon from '../Icon'
import SbLoading from '../Loading'
import SbBlockUi from '../BlockUI'
import i18n from '../../i18n/index'

defineOptions({
  name: 'SbUploadDialog',
})

const props = withDefaults(
  defineProps<{
    currentFile?: number
    currentFileName?: string
    percentageValue?: number
    timeLeft?: number
    totalFiles?: number
    locale?: string
  }>(),
  {
    currentFile: 0,
    percentageValue: 0,
    timeLeft: 0,
    totalFiles: 0,
    locale: 'en',
  },
)

const labelToUpload = computed(() => {
  if (props.currentFileName) {
    return `${uploadingLabel.value} - ${props.currentFileName}`
  }
  return uploadingLabel
})

const uploadingLabel = computed(() => {
  const ofTranslated = i18n(props.locale, 'of')
  const fileTranslated = i18n(props.locale, 'file')
  const filesTranslated = i18n(props.locale, 'files')
  const uploadingTranslated = i18n(props.locale, 'uploading')

  if (props.totalFiles === 1) {
    return `${uploadingTranslated} ${props.currentFile} ${ofTranslated} ${props.totalFiles} ${fileTranslated}`
  }
  return `${uploadingTranslated} ${props.currentFile} ${ofTranslated} ${props.totalFiles} ${filesTranslated}`
})

const timeLeftLabel = computed(() => {
  const time = props.timeLeft
  const minAndTranslated = i18n(props.locale, 'minAnd')
  const secLeftTranslated = i18n(props.locale, 'secLeft')

  if (time > 59) {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return `${minutes} ${minAndTranslated} ${seconds} ${secLeftTranslated}`
  }

  return `${props.timeLeft} ${secLeftTranslated}`
})
</script>
