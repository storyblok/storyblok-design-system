import { acceptedFiles } from './lib'
import { capitalize } from '../../utils'

// other components
import SbIcon from '../Icon'
import SbLoading from '../Loading'

// styles
import './drop-area.scss'

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

    changeUploadLabel (index, size, name) {
      return `Uploading ${parseInt(index) + 1}/${size} - ${name}`
    },

    async dropFile (e) {
      e.preventDefault()
      e.stopPropagation()
      this.isLoading = true
      this.isOver = false

      const data = e.dataTransfer

      if (data.items) {
        if (data.items.length > this.maxFile) { // check if the number of files to be sent is greater than the restriction
          this.isLoading = false
          // triggers notification that the maximum number of files has been reached
          return
        }
        for (const [key, value] of Object.entries(data.items)) {
          if (value.kind === 'file') {
            const file = value.getAsFile()

            if (file.size > this.maxFileSize) { // check if the size of each file sent is smaller than the restriction
              return
            }

            this.uploadLabel = this.changeUploadLabel(key, data.items.length, file.name)
            this.$emit('upload-file', file)
          }
        }
      } else {
        for (const [key, value] of Object.entries(data.files)) {
          this.uploadLabel = this.changeUploadLabel(key, data.files.length, value.name)
          this.$emit('upload-file', value)
        }
      }

      this.isLoading = false
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
      return h('div', {
        staticClass: 'sb-drop-area--upload'
      },
      [
        h(SbIcon, { props: { name: 'refresh', size: 'small', color: 'primary' } }),
        h('span', { staticClass: 'sb-drop-area--upload-label' }, this.uploadLabel),
        h(SbLoading, { props: { type: 'bar', value: '20' } })
      ])
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

export default SbDropArea
