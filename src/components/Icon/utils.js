import iconPaths from '../../lib/internal-icons'
import heroPaths from '../../lib/hero-icons'

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
  return heroPaths[name]
}

/**
 * @type {Array<String>}
 */
export const iconSizes = ['small', 'normal', 'large', 'x-large']
