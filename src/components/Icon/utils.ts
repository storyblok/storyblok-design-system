import iconPaths from '../../lib/internal-icons'

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

/**
 * @type {Array<String>}
 */
export const iconSizes = ['small', 'normal', 'large', 'x-large']

export const customIconNames = Object.keys(iconPaths)
