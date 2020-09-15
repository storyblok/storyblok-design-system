import { capitalize } from '../../utils'

import './tab.scss'

const SbTab = {
  name: 'SbTab',

  props: {
    label: {
      type: String,
      default: 'General'
    }
  },

  render (h) {
    const renderTab = () => {
      return h('span', {
        staticClass: 'sb-tab'
      },
      capitalize(this.label)
      )
    }

    return renderTab()
  }
}

export default SbTab
