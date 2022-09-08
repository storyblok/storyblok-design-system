/**
 * @method cleanChildren
 * @param  {Array} vnodes
 * @return {Array}
 */
export const cleanChildren = (vnodes = [], label = '') => {
  if (label.length) {
    return vnodes.filter((vnode) => vnode.tag?.includes(label))
  }
  return vnodes.filter((vnode) => vnode.tag)
}

export const isVueComponent = (value) => !!value && !!value.$el
