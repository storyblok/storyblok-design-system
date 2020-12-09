<template>
  <SbBlockUi>
    <div class="sb-upload-dialog">
      <SbIcon name="refresh" size="small" color="primary" />
      <span class="sb-upload-dialog__label"> {{ labelToUpload }} </span>
      <span class="sb-upload-dialog__time-left">
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
    actualFile: {
      type: Number,
      default: 0,
    },
    actualFileName: {
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
      return `Uploading ${this.actualFile}/${this.totalFiles} - ${this.actualFileName}`
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
