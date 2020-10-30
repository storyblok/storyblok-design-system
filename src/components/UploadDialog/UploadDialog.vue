<template>
  <SbBlockUi>
    <div class="sb-upload-dialog">
      <SbIcon
        name="refresh"
        size="small"
        color="primary"
      />
      <span class="sb-upload-dialog__label">
        {{ returnLabelToUpload }}
      </span>
      <span class="sb-upload-dialog__time-left">
        {{ returnTimeLeft }}
      </span>
      <SbLoading
        type="bar"
        :value="percentageValue"
      />
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
    SbBlockUi
  },

  props: {
    actualFile: {
      type: [String, Number],
      default: 0
    },
    actualFileName: {
      type: String,
      default: null
    },
    percentageValue: {
      type: [String, Number],
      default: 0
    },
    timeLeft: {
      type: [String, Number],
      default: 0
    },
    totalFiles: {
      type: [String, Number],
      default: 0
    }
  },

  computed: {
    returnLabelToUpload () {
      return `Uploading ${this.actualFile}/${this.totalFiles} - ${this.actualFileName}`
    },

    returnTimeLeft () {
      const time = parseInt(this.timeLeft)

      if (time > 59) {
        const minutes = Math.floor(time / 60)
        const seconds = (time % 60)

        return `${minutes} min and ${seconds} sec left`
      }

      return `${this.timeLeft} sec left`
    }
  }
}
</script>

<style lang="scss">
  @import './upload-dialog.scss';
</style>
