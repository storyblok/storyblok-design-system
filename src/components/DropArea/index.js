import { capitalize } from '../../utils'

// other components
import SbIcon from '../Icon'
import SbLoading from '../Loading'
import SbBlockUi from '../BlockUI'

// styles
import './drop-area.scss'

// @vue/component
const SbDropUploadLabel = {
  name: 'SbDropUploadLabel',

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

  render (h) {
    const renderIcon = () => {
      return h(SbIcon, {
        props: {
          name: 'refresh',
          size: 'small',
          color: 'primary'
        }
      })
    }

    const renderLoading = () => {
      return h(SbLoading, {
        props: {
          type: 'bar',
          value: this.percentageValue
        }
      })
    }

    const renderTimeLeft = () => {
      if (this.timeLeft) {
        return h('span', {
          staticClass: 'sb-drop-area__time-left'
        },
          `${this.timeLeft} sec left`
        )
      }

      return null
    }

    const renderlabel = () => {
      return h('span', {
        staticClass: 'sb-drop-area--upload-label'
      },
        `Uploading ${this.actualFile}/${this.totalFiles} - ${this.fileName}`
      )
    }

    const renderUploadLabel = () => {
      return h(SbBlockUi, [
        h('div', {
          staticClass: 'sb-drop-area--upload'
        },
        [
          renderIcon(),
          renderlabel(),
          renderTimeLeft(),
          renderLoading()
        ]
        )
      ])
    }

    return renderUploadLabel()
  }
}

/**
 * @vue/component
 *
 * SbDropArea component
 *
 * SbDropArea is a component used for upload files.
 */
const SbDropArea = {
  name: 'SbDropArea',

  props: {
    accept: {
      type: String, // separeted by ',' example: :accept="image/jpeg,.pdf"
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
      isOver: false
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
  },

  render (h) {
    const renderIcon = () => {
      return h('div', {
        staticClass: 'sb-drop-area--icon'
      },
      [
        h(SbIcon, {
          props: {
            size: 'x-large',
            color: 'primary-dark',
            name: this.isOver ? 'chevron-down' : 'img-icon'
          }
        })
      ])
    }

    const renderTitle = () => {
      return h('p', {
        staticClass: 'sb-drop-area--title'
      },
      capitalize(this.title || 'Drop your asset in')
      )
    }
    const renderLabel = () => {
      return h('p', {
        staticClass: 'sb-drop-area--label'
      },
      capitalize(this.label || 'You can drop in miltiple JPEGs, PNGs, SVGs, PDFs and all other files.')
      )
    }

    const renderContent = () => {
      return h('div', {
        staticClass: 'sb-drop-area--content'
      },
      [
        renderIcon(),
        renderTitle(),
        renderLabel()
      ])
    }

    const renderDropContainer = () => {
      return h('div', {
        staticClass: 'sb-drop-area',
        class: {
          'sb-drop-area--over': this.isOver
        },
        on: {
          dragover: this.dragOver,
          dragleave: this.dragLeave,
          drop: (e) => this.dropFile(e)
        }
      },
      [
        renderContent()
      ])
    }

    return renderDropContainer()
  }
}

export {
  SbDropArea,
  SbDropUploadLabel
}
