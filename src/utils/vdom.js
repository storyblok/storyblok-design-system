/**
 * @method cleanChildren
 * @param  {Array} vnodes
 * @return {Array}
 */
export const cleanChildren = (vnodes = []) =>
  vnodes.filter((vnode) => vnode.tag)

export const isVueComponent = (value) => !!value && !!value.$el
