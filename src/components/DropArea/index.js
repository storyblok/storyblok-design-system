import { acceptedFiles } from './lib'
import { capitalize } from '../../utils'

// other components
import SbIcon from '../Icon'
import SbLoading from '../Loading'

// styles
import './drop-area.scss'

// @vue/component
const SbDropUploadLabel = {
  name: 'SbDropUploadLabel',

  props: {
    totalFiles: {
      type: Number,
      default: 0
    },
    actualFile: {
      type: Number,
      default: 0
    },
    fileName: {
      type: String,
      default: null
    },
    percentageValue: {
      type: Number,
      default: 0
    },
    timeLeft: {
      type: Number,
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
      return h('div', {
        staticClass: 'sb-drop-area--upload'
      },
      [
        renderIcon(),
        renderlabel(),
        renderTimeLeft(),
        renderLoading()
      ]
      )
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
      validator: acceptedFiles,
      default: null
    },
    maxFileSize: {
      type: [String, Number],
      default: null // Find out maximum size of files in the storyblok
    },
    maxFile: {
      type: [String, Number],
      default: null
    },
    maxTotalSize: {
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
      isLoading: false,
      uploadLabel: ''
    }
  },

  methods: {
    dragOver (e) {
      e.preventDefault()
      this.isOver = true
    },

    dragLeave (e) {
      this.isOver = false
    },

    async dropFile (e) {
      e.preventDefault()
      e.stopPropagation()
      this.isLoading = true
      this.isOver = false

      const data = e.dataTransfer
      const files = []

      if (data.items) {
        if (data.items.length > this.maxFile) { // check if the number of files to be sent is greater than the restriction
          // this.isLoading = false
          // triggers notification that the maximum number of files has been reached
          return
        }
        for (const item of Object.entries(data.items)) {
          if (item.kind === 'file') {
            files.push(item.getAsFile())

            if (item.size > this.maxFileSize) { // check if the size of each file sent is smaller than the restriction
              return
            }

            // this.uploadLabel = this.changeUploadLabel(key, data.items.length, file.name)
          }
        }
      } else {
        for (const item of Object.entries(data.files)) {
          // this.uploadLabel = this.changeUploadLabel(key, data.files.length, value.name)
          files.push(item)
        }
      }

      // this.isLoading = false
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

    const renderUploadNotification = () => {
      return h(SbDropUploadLabel, {
        props: {
          totalFiles: 2,
          actualFile: 1,
          fileName: 'test.png',
          percentageValue: 33,
          timeLeft: 25
        }
      })
    }

    const renderDropContainer = () => {
      return h('div', {
        staticClass: 'sb-drop-area',
        class: {
          'sb-drop-area--over': this.isOver && !this.isLoading
        },
        on: {
          dragover: this.dragOver,
          dragleave: this.dragLeave,
          drop: (e) => this.dropFile(e)
        }
      },
      [
        !this.isLoading ? renderContent() : renderUploadNotification()
      ])
    }

    return renderDropContainer()
  }
}

export {
  SbDropArea,
  SbDropUploadLabel
}
