export const VNodes = {
  functional: true,
  props: ['vnodes'],
  render: (h, ctx) => ctx.props.vnodes,
}
