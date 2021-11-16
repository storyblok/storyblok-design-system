<template>
  <SbBlockUi>
    <div class="sb-upload-dialog">
      <SbIcon name="refreshing" size="small" color="primary" />
      <span class="sb-upload-dialog__label"> {{ labelToUpload }} </span>
      <span v-if="timeLeft" class="sb-upload-dialog__time-left">
        {{ timeLeftLabel }}
      </span>
      <SbLoading type="bar" :value="percentageValue" />
    </div>
  </SbBlockUi>
</template>

<script>
import SbIcon from '../Icon'
import SbLoading from '../Loading'
import SbBlockUi from '../BlockUI'

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
  },

  computed: {
    labelToUpload() {
      if (this.currentFileName) {
        return `${this.uploadingLabel} - ${this.currentFileName}`
      }
      return this.uploadingLabel
    },

    uploadingLabel() {
      if (this.totalFiles === 1) {
        return `Uploading ${this.currentFile} of ${this.totalFiles} file`
      }
      return `Uploading ${this.currentFile} of ${this.totalFiles} files`
    },

    timeLeftLabel() {
      const time = parseInt(this.timeLeft)

      if (time > 59) {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        return `${minutes} min and ${seconds} sec left`
      }

      return `${this.timeLeft} sec left`
    },
  },
}
</script>
