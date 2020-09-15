import SbIcon from '../Icon'

import './tabs.scss'

const SbTabs = {
  name: 'SbTabs',
  functional: true,
  props: {
    showAddButton: {
      type: Boolean,
      default: false
    }
    // ...sharedProps
  },

  render (h, context) {
    const { props, slots } = context
    const children = slots().default.filter(e => e.tag)

    const tabsData = children.map(element => {
      element.componentOptions.propsData = {
        ...element.componentOptions.propsData,
        ...props
      }

      return element
    })

    const renderTabs = () => {
      return h('div', {
        staticClass: 'sb-tabs'
      }, [
        tabsData,
        props.showAddButton ? renderAddButton() : null
      ])
    }

    const renderAddButton = () => {
      return h('button', {
        class: 'sb-tabs--add-button'
      }, [
        h(SbIcon, {
          props: {
            name: 'plus',
            size: 'small'
          }
        })
      ]
      )
    }

    return renderTabs()
  }
}

export default SbTabs
