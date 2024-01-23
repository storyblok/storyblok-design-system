<template>
  <div
    class="sb-drop-area"
    :class="{ 'sb-drop-area__over': isOver || forceOver }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDropFile"
  >
    <div class="sb-drop-area__content">
      <div class="sb-drop-area__icon">
        <SbIllustration
          v-if="illustrationLink.length"
          :src="illustrationLink"
        />
      </div>
      <p class="sb-drop-area__title">
        {{ title }}
      </p>
      <p class="sb-drop-area__subtitle">
        {{ subtitle }}
        <span v-if="dropAreaButton" @click="$emit('pick-files')">{{
          dropAreaButton
        }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import SbIllustration from '../Illustration'

export default {
  name: 'SbDropArea',

  components: {
    SbIllustration,
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
        'You can drop in multiple JPEGs, PNGs, SVGs, PDFs and all other files.',
    },
    title: {
      type: String,
      default: 'Drop your asset in',
    },
    dropAreaButton: {
      type: String,
      default: null,
    },
    forceOver: {
      type: Boolean,
      default: false,
    },
    illustrationLink: {
      type: String,
      default:
        'https://a.storyblok.com/f/136045/726x811/c4e9e2a9cf/add-files.svg',
    },
  },

  emits: ['close-drop-area', 'pick-files', 'upload-files'],

  data() {
    return {
      isOver: false,
    }
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
      if ((e.target && !this.$el.contains(e.target)) || e.target === this.$el) {
        this.isOver = false
        this.$emit('close-drop-area')
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
    $_fileFilter([...fileArray]) {
      const files = []

      if (this.maxFile && this.$_checkMaximumNumberOfFiles(fileArray.length)) {
        return
      }

      fileArray.forEach((item) => {
        const file = item

        if (this.accept && !this.$_checkAcceptedFiles(file.type)) {
          return
        }

        if (this.maxFileSize && this.$_checkMaximumFileSize(file.size)) {
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

      const files = this.$_fileFilter(e.dataTransfer.files)

      this.$emit('upload-files', files)
      this.$emit('close-drop-area')
    },
  },
}
</script>
