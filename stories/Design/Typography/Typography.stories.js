import SbTypography from '.'

export default {
  title: 'Design/Typography',
  component: SbTypography
}

export const AllTexts = () => ({
  components: { SbTypography },
  template: `
  <section>
    <div>
      <span class="sb-typography__label">Font family</span>
      <h1 class="sb-typography__title">Roboto</h1>

      <h2 class="sb-typography__subtitle">12px</h2>
      <p class="text-ink font-size-xs">12 px ink regular</p>
      <p class="text-light-gray font-size-xs">12 px light-gray regular</p>

      <h2 class="sb-typography__subtitle">13px</h2>
      <p class="text-ink font-size-sm">13 px ink regular</p>
      <p class="font-weight-medium text-ink font-size-sm">13 px ink medium</p>
      <p class="text-light-gray font-size-sm">13 px light-gray regular</p>

      <h2 class="sb-typography__subtitle">14px</h2>
      <p class="text-ink font-size-md">14 px ink regular</p>
      <p class="font-weight-medium text-ink font-size-md">14 px ink medium</p>
      <p class="text-red font-size-md">14 px red regular</p>
      <p class="font-weight-medium text-teal font-size-md">14 px teal medium</p>

      <h2 class="sb-typography__subtitle">16px</h2>
      <p class="font-weight-medium text-ink font-size-lg">16 px ink medium</p>
      <p class="text-light-gray font-size-lg">16 px light-gray regular</p>
      <p class="font-weight-medium text-light-gray font-size-lg">16 px light-gray medium</p>
      <p class="font-weight-medium text-teal font-size-lg">16 px teal medium</p>

      <h2 class="sb-typography__subtitle">Headings</h2>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </div>
  </section>
  `
})
