<template>
  <div
    class="sb-drop-area"
    :class="{ 'sb-drop-area__over': isOver }"
    @dragover="dragOver"
    @dragleave="dragLeave"
    @drop="dropFile"
  >
    <div class="sb-drop-area__content">
      <div class="sb-drop-area__icon">
        <SbIcon
          size="x-large"
          color="primary-dark"
          :name="iconName"
        />
      </div>
      <p class="sb-drop-area__title">
        {{ returnTitle }}
      </p>
      <p class="sb-drop-area__label">
        {{ returnLabel }}
      </p>
    </div>
  </div>
</template>

<script>
import SbIcon from '../Icon'

export default {
  name: 'SbDropArea',

  components: {
    SbIcon
  },

  props: {
    accept: {
      type: String,
      default: null
    },
    maxFileSize: {
      type: [String, Number],
      default: null
    },
    maxFile: {
      type: [String, Number],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      isOver: false,
      iconName: 'img-icon'
    }
  },

  computed: {
    returnTitle () {
      return this.title || 'Drop your asset in'
    },

    returnLabel () {
      return this.label || 'You can drop in miltiple JPEGs, PNGs, SVGs, PDFs and all other files.'
    }
  },

  watch: {
    isOver: function () {
      this.iconName = this.isOver ? 'chevron-down' : 'img-icon'
    }
  },

  methods: {
    dragOver (e) {
      e.preventDefault()
      this.isOver = true
    },

    dragLeave (e) {
      if (!this.$el.contains(e.target) || e.target === this.$el) {
        this.isOver = false
      }
    },

    checkMaximumFileSize (size) {
      return (Math.ceil(size / 1000)) > parseInt(this.maxFileSize)
    },

    checkMaximumNumberOfFiles (files) {
      return files > parseInt(this.maxFile)
    },

    checkAcceptedFiles (ext) {
      const accepted = this.accept.split(',')

      return accepted.indexOf(ext) !== -1
    },

    fileFilter (fileArray, from = 'files') {
      const files = []

      if (this.maxFile && this.checkMaximumNumberOfFiles(fileArray.length)) {
        return
      }

      fileArray.forEach(item => {
        let file = []

        if (from === 'items' && item.kind === 'file') {
          file = item.getAsFile()
        }

        if (this.accept && !this.checkAcceptedFiles(file.type || item.type)) {
          return
        }

        if (this.maxFileSize && this.checkMaximumFileSize(file.size || item.size)) {
          return
        }

        files.push(file)
      })

      return files
    },

    dropFile (e) {
      e.preventDefault()
      e.stopPropagation()
      this.isOver = false

      const data = e.dataTransfer

      const files = data.items ? this.fileFilter(data.items, 'items') : this.fileFilter(data.files)

      this.$emit('upload-file', files)
    }
  }
}
</script>

<style lang="scss">
.sb-drop-area {
  width: 100%;
  background-color: $white;

  &__over {
    cursor: copy;
    background-color: $light-gray;

    .sb-drop-area__content {
      border-radius: 50%;
    }

    .sb-drop-area__icon {
      background-color: $sb-green-25;

      svg {
        padding-top: 25px;
        width: 48px;
        height: 48px;
      }
    }

  }

  &__content {
    margin: 0 auto;
    height: 500px;
    width: 500px;
    border: 1px solid transparent;
    background-color: $white;
    transition: all .05s ease;
  }

  &__title {
    text-align: center;
    vertical-align: middle;
    color: $primary-text-color;
    font-size: 21px; // change this
    font-weight: $font-weight-medium;
  }

  &__label {
    text-align: center;
    vertical-align: middle;
    color: $light-gray;
    font-size: $font-size-default;
    font-weight: $font-weight-regular;
    width: 70%;
    margin: 0 auto;
  }

  &__icon {
    margin: 0 auto;
    margin-top: 159px;
    background-color: $white;
    border-radius: 50%;
    height: 104px;
    width: 104px;
    transition: all .1s ease;

    svg {
      margin: 0 auto;
      display: block;
      width: 83px;
      height: 105px;
    }
  }
}
</style>
