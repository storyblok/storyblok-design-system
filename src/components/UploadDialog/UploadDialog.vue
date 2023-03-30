<template>
  <SbBlockUi>
    <div class="sb-upload-dialog">
      <div class="sb-upload-dialog__content">
        <SbIcon name="refreshing"
size="small" color="primary" />
        <span class="sb-upload-dialog__label"> {{ labelToUpload }} </span>
        <span v-if="timeLeft"
class="sb-upload-dialog__time-left">
          {{ timeLeftLabel }}
        </span>
      </div>
      <SbLoading type="bar"
:model-value="percentageValue" />
    </div>
  </SbBlockUi>
</template>

<script>
import SbIcon from '../Icon'
import SbLoading from '../Loading'
import SbBlockUi from '../BlockUI'
import i18n from '../../i18n/index'

export default {
  name: 'SbUploadDialog',

  components: {
    SbIcon,
    SbLoading,
    SbBlockUi,
  },

  props: {
    currentFile: {
      type: Number,
      default: 0,
    },
    currentFileName: {
      type: String,
      default: null,
    },
    percentageValue: {
      type: Number,
      default: 0,
    },
    timeLeft: {
      type: Number,
      default: 0,
    },
    totalFiles: {
      type: Number,
      default: 0,
    },
    locale: {
      type: String,
      required: false,
      default: 'en',
    },
  },

  computed: {
    labelToUpload() {
      if (this.currentFileName) {
        return `${this.uploadingLabel} - ${this.currentFileName}`
      }
      return this.uploadingLabel
    },

    uploadingLabel() {
      const ofTranslated = i18n(this.locale, 'of')
      const fileTranslated = i18n(this.locale, 'file')
      const filesTranslated = i18n(this.locale, 'files')
      const uploadingTranslated = i18n(this.locale, 'uploading')

      if (this.totalFiles === 1) {
        return `${uploadingTranslated} ${this.currentFile} ${ofTranslated} ${this.totalFiles} ${fileTranslated}`
      }
      return `${uploadingTranslated} ${this.currentFile} ${ofTranslated} ${this.totalFiles} ${filesTranslated}`
    },

    timeLeftLabel() {
      const time = parseInt(this.timeLeft)
      const minAndTranslated = i18n(this.locale, 'minAnd')
      const secLeftTranslated = i18n(this.locale, 'secLeft')

      if (time > 59) {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        return `${minutes} ${minAndTranslated} ${seconds} ${secLeftTranslated}`
      }

      return `${this.timeLeft} ${secLeftTranslated}`
    },
  },
}
</script>
