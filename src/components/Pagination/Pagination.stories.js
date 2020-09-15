import SbPagination from '.'

export default {
  title: 'SbPagination',
  component: SbPagination,
  args: {
    page: 1
  },
  argTypes: {}
}

export const Default = args => ({
  components: { SbPagination },
  // props: Object.keys(args),
  data: () => ({
    page: 1
  }),
  watch: {
    page (oldVal, newVal) {
      console.log(oldVal, newVal)
    }
  },
  template: `
    <SbPagination v-model="page" />
  `
})
