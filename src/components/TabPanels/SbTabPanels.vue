<script>
export default {
  name: 'SbTabPanels',
  functional: true,
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  render(h, { slots, props, data }) {
    const children = slots().default.filter((e) => e.tag) || []
    const processChildren = () => {
      return children.map((child) => {
        const { name } = child.componentOptions.propsData
        child.componentOptions.propsData = {
          ...child.componentOptions.propsData,
          activate: name === props.value,
        }
        return child
      })
    }

    return h(
      'div',
      {
        staticClass: 'sb-tab-panels',
        attrs: {
          ...data.$attrs,
        },
      },
      processChildren()
    )
  },
}
</script>
