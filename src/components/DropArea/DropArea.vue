<template>
  <div
    class="sb-drop-area"
    :class="{ 'sb-drop-area__over': isOver }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDropFile"
  >
    <div class="sb-drop-area__content">
      <div class="sb-drop-area__icon">
        <SbIcon size="x-large" color="primary-dark" :name="iconName" />
      </div>
      <p class="sb-drop-area__title">
        {{ title }}
      </p>
      <p class="sb-drop-area__subtitle">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script>
import SbIcon from '../Icon'

export default {
  name: 'SbDropArea',

  components: {
    SbIcon,
  },

  props: {
    accept: {
      type: String,
      default: null,
    },
    maxFile: {
      type: Number,
      default: null,
    },
    maxFileSize: {
      type: Number,
      default: null,
    },
    subtitle: {
      type: String,
      default:
        'You can drop in miltiple JPEGs, PNGs, SVGs, PDFs and all other files.',
    },
    title: {
      type: String,
      default: 'Drop your asset in',
    },
  },

  data() {
    return {
      isOver: false,
    }
  },

  computed: {
    iconName() {
      return this.isOver ? 'chevron-down' : 'img-icon'
    },
  },

  methods: {
    /**
     * handles DragOver the event triggers the dragover action to change the layout
     * @param {Event} e
     */
    handleDragOver(e) {
      e.preventDefault()
      this.isOver = true
    },

    /**
     * handles DragLeave the event removes the change from the dragover event
     * @param {Event} e
     */
    handleDragLeave(e) {
      if (!this.$el.contains(e.target) || e.target === this.$el) {
        this.isOver = false
      }
    },

    /**
     * checkMaximumFileSize checks if the size of each file is larger than the
     * one passed by the maxFileSize prop
     * @param {Size} size
     */
    $_checkMaximumFileSize(size) {
      return Math.ceil(size / 1000) > parseInt(this.maxFileSize)
    },

    /**
     * checkMaximumNumberOfFiles checks if the user sent more files than set by prop
     * maxFile
     * @param {Files} files
     */
    $_checkMaximumNumberOfFiles(files) {
      return files > parseInt(this.maxFile)
    },

    /**
     * checkAcceptedFiles checks if the files the user is sending are valid files
     * @param {Ext} ext
     */
    $_checkAcceptedFiles(ext) {
      const accepted = this.accept.split(',')

      return accepted.indexOf(ext) !== -1
    },

    /**
     * fileFilter filters the files, 'and where files with an extension not accepted,
     * maximum size exceeded and number of files are filtered.
     */
    $_fileFilter(fileArray, from = 'files') {
      const files = []

      if (this.maxFile && this.$_checkMaximumNumberOfFiles(fileArray.length)) {
        return
      }

      fileArray.forEach((item) => {
        let file = []

        if (from === 'items' && item.kind === 'file') {
          file = item.getAsFile()
        }

        if (this.accept && !this.$_checkAcceptedFiles(file.type || item.type)) {
          return
        }

        if (
          this.maxFileSize &&
          this.$_checkMaximumFileSize(file.size || item.size)
        ) {
          return
        }

        files.push(file)
      })

      return files
    },

    /**
     * handles DropFile function triggered when the user drops a file over the accepted area
     * @param {Event} e
     */
    handleDropFile(e) {
      e.preventDefault()
      e.stopPropagation()
      this.isOver = false

      const data = e.dataTransfer

      const files = data.items
        ? this.$_fileFilter(data.items, 'items')
        : this.$_fileFilter(data.files)

      this.$emit('upload-file', files)
    },
  },
}
</script>
