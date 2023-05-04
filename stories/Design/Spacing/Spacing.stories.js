import './spacing.scss'

export default {
  title: 'Design/Spacing',
}

export const AllSpacing = () => ({
  template: `
  <section>
    <div>
      <h1 class="my-5">Variables</h1>
      <pre><code>
  $s-1: 4px;
  $s-2: 8px;
  $s-3: 12px;
  $s-4: 16px;
  $s-5: 24px;
  $s-6: 32px;
  $s-7: 40px;
  $s-8: 48px;
      </code></pre>

      <h1 class="my-5">Margin</h1>
      <div class="wrapper">
        <div class="outer-margin"><div class="square m-1">m-1</div></div>
        <div class="outer-margin"><div class="square mt-2">mt-2</div></div>
        <div class="outer-margin"><div class="square mr-3">mr-3</div></div>
        <div class="outer-margin"><div class="square mb-4">mb-4</div></div>
        <div class="outer-margin"><div class="square ml-5">ml-5</div></div>
        <div class="outer-margin"><div class="square mx-6">mx-6</div></div>
        <div class="outer-margin"><div class="square my-7">my-7</div></div>
        <div class="outer-margin"><div class="square m-8">m-8</div></div>
      </div>

    <div>
      <h1 class="my-5">Padding</h1>

      <div class="wrapper">
        <div class="outer-padding"><div class="square p-1">p-1</div></div>
        <div class="outer-padding"><div class="square pt-2">pt-2</div></div>
        <div class="outer-padding"><div class="square pr-3">pr-3</div></div>
        <div class="outer-padding"><div class="square pb-4">pb-4</div></div>
        <div class="outer-padding"><div class="square pl-5">pl-5</div></div>
        <div class="outer-padding"><div class="square px-6">px-6</div></div>
        <div class="outer-padding"><div class="square py-7">py-7</div></div>
        <div class="outer-padding"><div class="square p-8">p-8</div></div>
      </div>
    </div>
  </section>
  `,
})
