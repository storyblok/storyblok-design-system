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
import SbIcon from '../../Icon'
import SbLoading from '../../Loading'
import SbBlockUi from '../../BlockUI'

export default {
  name: 'SbDropAreaUpload',

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
    fileName: {
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
      return `Uploading ${this.actualFile}/${this.totalFiles} - ${this.fileName}`
    },
    returnTimeLeft () {
      return `${this.timeLeft} sec left`
    }
  }
}
</script>

<style lang="scss">
.sb-drop-area__upload {
    border-radius: 5px;
    background-color: $white;
    width: 100%;
    max-width: 602px;
    height: 49px;
    margin: 0 auto;
    position: relative;
    box-shadow: 0px 3px 44px 13px rgba(0, 0, 0, 0.08);

    svg {
      float: left;
      margin-top: 17px;
      margin-left: 20px;
      margin-right: 14px;
    }

    &-label {
      float: left;
      display: inline-block;
      font-size: 14px;
      margin-top: 17px;
    }

    .sb-loading--bar {
      overflow: auto;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      bottom: -8px;
      position: relative;
    }

  }

  .sb-drop-area__time-left {
    color: $sb-dark-blue-50;
    font-size: $font-size-md;
    font-weight: $font-weight-regular;
    float: right;
    margin-right: 19px;
    margin-top: 17px;
  }
</style>
