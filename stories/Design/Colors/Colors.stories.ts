import ColorPallette from './components/ColorPallette.vue'
import ColorGrid from './components/ColorGrid.vue'
import ContrastResult from './components/ContrastResult.vue'

import { SbSelect } from '../../../src/components'
import { colors } from './constants'
export default {
  title: 'Design/Colors',
  component: ColorPallette,
}

export const AllColors = {
  render: () => ({
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
  }),
}

export const ColorContrastGrid = {
  render: () => ({
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
        return Object.entries(colors[this.sample]).reduce(
          (acc, [name, hex]) => {
            const colorObject = {
              name,
              hex,
              parentColor: this.sample,
            }
            return [...acc, colorObject]
          },
          [],
        )
      },
    },
    template: `
    <h1 class="sb-mb-4">Color Grid</h1>
    <p class="sb-mb-4 font-14 text-gray">Select a color palette to see the contrast grid</p>
    <SbSelect :options="selectOptions" v-model="sample" class="mw-300 sb-mb-4" />
    <ColorGrid
      :colors-arr="colorsArray"
      :sample="sample">
    </ColorGrid>
  `,
  }),
}

export const ColorComparator = () => ({
  components: { SbSelect, ContrastResult },
  data: () => ({
    colorOne: '',
    colorTwo: '',
  }),
  computed: {
    selectOptions() {
      return Object.keys(colors)
        .map((colorName) => {
          return Object.keys(colors[colorName]).map((numberValue) => ({
            label: colorName + '-' + numberValue,
            value: colors[colorName][numberValue],
          }))
        })
        .flat()
    },
    bothColorsSelected() {
      return this.colorOne && this.colorTwo
    },
  },
  template: `
    <h1 class="sb-mb-4">Color Comparator</h1>
    <p class="sb-mb-4 font-14 text-gray">Select two colors to compare their contrast</p>

    <div class="flex sb-mb-4">
      <SbSelect :options="selectOptions" v-model="colorOne" label="First Color" />
      <SbSelect :options="selectOptions" v-model="colorTwo" label="Second Color" />
    </div>

    <div v-if="bothColorsSelected" class="helper-square" :style="{ backgroundColor: colorOne, color: colorTwo }">
      <ContrastResult :rowColor="{hex: colorOne}" :colColor="{hex: colorTwo}" />
    </div>

  `,
})
