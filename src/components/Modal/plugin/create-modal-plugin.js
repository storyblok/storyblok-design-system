// import SbModal from './index'
import ModalPlugin from './ModalPlugin'
import SbModalType from '../SbModalType'

/**
  * @type {
          modalTarget: string,
          title: string,
          icon: string,
          align: string,
          content: string,
          footerContent: string
    } ModalOptions
  *
  * @method  createModalPlugin
  * @param   {ModalOptions} options
  * @returns {Function}
  */
const createModalPlugin = (VueInstance) => (props, type) => {
  const node = document.createElement('div')
  document.body.appendChild(node)

  let vm

  const on = {
    hide: () => {
      vm.$destroy()
      vm.$el.remove()
      vm = null
    },
  }

  vm = new VueInstance({
    el: node,

    mounted() {
      this.$refs.modal.show()
    },

    render(h) {
      if (type && (type === 'confirmation' || type === 'delete')) {
        props.type = type
        return h(SbModalType, {
          ref: 'modal',
          props,
          on,
        })
      }

      return h(ModalPlugin, {
        ref: 'modal',
        props,
        on,
      })
    },
  })
}

export default createModalPlugin
