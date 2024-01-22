import LIB_ICONS from './internal-icons'
import * as lucideIcons from 'lucide-vue-next'
const availableIcons = Object.keys(LIB_ICONS)
const lucideIconsKeys = Object.keys(lucideIcons).map((key) => {
  return key
    .replace(/\.?([A-Z])/g, function (x, y) {
      return '-' + y.toLowerCase()
    })
    .replace(/^-/, '')
})
export default [...availableIcons, ...lucideIconsKeys].sort()
