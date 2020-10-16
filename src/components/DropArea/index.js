import { acceptedFiles, uploadFilesToStoryblok } from './lib'
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
      default: null
    },
    maxFile: {
      type: [String, Number],
      default: null
    },
    maxTotalSize: {
      type: [String, Number],
      default: null
    },
    url: {
      type: String,
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
      this.uploadLabel = `Uploading ${index + 1}/${size} - ${name}`
    },

    async dropFile (e) {
      e.preventDefault()
      e.stopPropagation()
      this.isLoading = true
      this.isOver = false

      const data = e.dataTransfer

      if (data.items) {
        for (let i = 0; i < data.items.length; i++) {
          if (data.items[i].kind === 'file') {
            const file = data.items[i].getAsFile()
            this.changeUploadLabel(i, data.items.length, file.name)
            await uploadFilesToStoryblok(file)
          }
        }
        // this.isLoading = false
      } else {
        for (let i = 0; i < data.files.length; i++) {
          this.changeUploadLabel(i, data.files.length, data.files[i].name)
          await uploadFilesToStoryblok(data.files[i])
        }
        // this.isLoading = false
      }
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
