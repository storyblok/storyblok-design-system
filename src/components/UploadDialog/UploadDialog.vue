<template>
  <SbBlockUi>
    <div class="sb-drop-area__upload">
      <SbIcon
        name="refresh"
        size="small"
        color="primary"
      />
      <span class="sb-drop-area__upload-label">
        {{ returnLabelToUpload }}
      </span>
      <span class="sb-drop-area__time-left">
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
    totalFiles: {
      type: [String, Number],
      default: 0
    },
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
    }
  },

  computed: {
    returnLabelToUpload () {
      return `Uploading ${this.actualFile}/${this.totalFiles} - ${this.actualFileName}`
    },

    returnTimeLeft () {
      return `${this.timeLeft} sec left`
    }
  }
}
</script>

<style lang="scss">
  @import './upload-dialog.scss';
</style>
