import iconPaths from '../../lib/internal-icons'
import heroPaths from '../../lib/lucide-icons'

/**
 * @typedef {{path: string, viewBox: string}} IconDeff
 *
 * @method   getSvgIcon
 * @param   {string} name name of the icon
 * @returns {IconDeff}
 */
export const getSvgIcon = (name) => {
  const iconDeff = iconPaths[name]

  if (!iconDeff) {
    console.warn(`[SbIcon] - this ${name} icon does not exists`)

    return {
      path: '',
      viewBox: '',
    }
  }

  const icon = {
    path: iconDeff.path,
    viewBox: iconDeff.viewBox || '0 0 24 24',
  }

  if (iconDeff.fill) {
    icon.fill = iconDeff.fill
  }

  return icon
}

export const getHeroIcon = (name) => {
  const hasKey = name in heroPaths
  const hasValue = hasKey && heroPaths[name] !== ''
  const showHeroIcon = hasKey && hasValue
  return showHeroIcon ? heroPaths[name] : null
}

/**
 * @type {Array<String>}
 */
export const iconSizes = ['small', 'normal', 'large', 'x-large']
