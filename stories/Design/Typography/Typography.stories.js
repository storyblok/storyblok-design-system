import SbTypography from '.'

export default {
  title: 'Design/Typography',
  component: SbTypography,
}

export const AllTexts = () => ({
  components: { SbTypography },
  template: `
  <section>
    <div>
      <span class="sb-typography__label">Font family</span>
      <h1 class="sb-typography__title">Roboto</h1>

      <h2 class="sb-typography__subtitle">Font Sizes</h2>
      <p class="font-10">.font-10</p>
      <p class="font-12">.font-12</p>
      <p class="font-13">.font-13</p>
      <p class="font-14">.font-14</p>
      <p class="font-16">.font-16</p>
      <p class="font-18">.font-18</p>
      <p class="font-20">.font-20</p>
      <p class="font-24">.font-24</p>
      <p class="font-26">.font-26</p>
      <p class="font-32">.font-32</p>

      <h2 class="sb-typography__subtitle">Font Weight</h2>
      <p class="font-light">.font-light</p>
      <p class="font-regular">.font-regular</p>
      <p class="font-medium">.font-medium</p>
      <p class="font-bold">.font-bold</p>


      <h2 class="sb-typography__subtitle">Text Color</h2>
      <p class="text-yellow">.text-yellow</p>
      <p class="text-white bg-dark-blue">.text-white</p>
      <p class="text-teal">.text-teal</p>
      <p class="text-red">.text-red</p>
      <p class="text-green">.text-green</p>
      <p class="text-gray-light">.text-gray-light</p>
      <p class="text-gray">.text-gray</p>
      <p class="text-blue">.text-blue</p>
      <p class="text-dark-blue">.text-dark-blue</p>

      <h2 class="sb-typography__subtitle">Background color</h2>
      <p class="bg-teal">.bg-teal</p>
      <p class="bg-dark-blue text-white">.bg-dark-blue</p>
      <p class="bg-green">.bg-green</p>
      <p class="bg-white">.bg-white</p>
      <p class="bg-yellow">.bg-yellow</p>
      <p class="bg-blue">.bg-blue</p>
      <p class="bg-red">.bg-red</p>
      <p class="bg-gray">.bg-gray</p>
      <p class="bg-gray-50">.bg-gray-50</p>

      <h2 class="sb-typography__subtitle">Headings</h2>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </div>
  </section>
  `,
})
