import ColorPallette from './components/ColorPallette.vue'
import ColorGrid from './components/ColorGrid.vue'
import { SbSelect } from '../../../src/components'
import { colors } from './constants'

export default {
  title: 'Design/Colors',
  component: ColorPallette,
}

export const AllColors = () => ({
  components: { ColorPallette },
  data: () => ({
    colors,
  }),
  template: `
  <section style="padding: 20px;">
    <h1 class="sb-mb-4 font-20">Primary palette</h1>
    <ColorPallette :palette="value" :color-name="key" v-for="(value, key) in colors" :key="key" />
  </section>
  `,
})

export const ColorContrastGrid = () => ({
  components: { ColorGrid, SbSelect },
  data: () => ({
    sample: 'teal',
  }),
  computed: {
    selectOptions() {
      return Object.keys(colors).map((name) => {
        return {
          label: name,
          value: name,
        }
      })
    },
    colorsArray() {
      return Object.entries(colors[this.sample]).reduce((acc, [name, hex]) => {
        const colorObject = {
          name,
          hex,
          parentColor: this.sample,
        }
        return [...acc, colorObject]
      }, [])
    },
  },
  template: `
    <SbSelect :options="selectOptions" v-model="sample" />
    <ColorGrid
      :colors-arr="colorsArray"
      :sample="sample">
    </ColorGrid>
  `,
})
