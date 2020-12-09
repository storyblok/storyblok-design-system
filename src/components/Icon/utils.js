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
      path: iconPaths['avatar-fallback'].path,
      viewBox: iconPaths['avatar-fallback'].viewBox,
    }
  }

  return {
    path: iconDeff.path,
    viewBox: iconDeff.viewBox || '0 0 20 20',
  }
}

/**
 * @type {Array<String>}
 */
export const iconSizes = ['x-small', 'small', 'normal', 'large', 'x-large']
