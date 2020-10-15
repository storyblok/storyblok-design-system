import { acceptedFiles, uploadFilesToStoryblok } from './utils'
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
      isLoading: false
    }
  },

  methods: {
    dragOver (e) {
      e.preventDefault()
      this.isOver = true
    },
    dragLeave (e) {
      e.preventDefault()
      this.isOver = false
    },
    dropFile (e) {
      // e.stopPropagation();
      this.isLoading = true
      this.isOver = false
      e.preventDefault()
      uploadFilesToStoryblok(e.dataTransfer)
    }
  },

  render (h) {
    // const renderInputFile = () => {
    //   return h('input', {
    //     staticClass: '',
    //     attrs: {
    //       accept: this.accept,
    //       multiple: true,
    //       type: 'file',
    //       disabled: this.isLoading
    //     },
    //     on: {
    //       'input': (e) => { uploadFilesToStoryblok(e.target.files) }
    //     }
    //   },
    //   [

    //   ])
    // }

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
        h(SbIcon, { props: { name: 'chevron-right', size: 'small', color: 'primary' } }),
        h('span', { staticClass: 'sb-drop-area--upload-label' }, 'Uploading 1/2-IMG_name.png'),
        h(SbLoading, { props: { type: 'bar', value: '20' } })
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
          drop: this.dropFile
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
