import './spacing.scss'

export default {
  title: 'Design/Spacing',
}

export const AllSpacing = () => ({
  template: `
  <section>
    <div>
      <h1 class="sb-my-5">Variables</h1>
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

      <h1 class="sb-my-5">Margin</h1>
      <div class="wrapper">
        <div class="outer-margin"><div class="square sb-m-1">sb-m-1</div></div>
        <div class="outer-margin"><div class="square sb-mt-2">sb-mt-2</div></div>
        <div class="outer-margin"><div class="square sb-mr-3">sb-mr-3</div></div>
        <div class="outer-margin"><div class="square sb-mb-4">sb-mb-4</div></div>
        <div class="outer-margin"><div class="square sb-ml-5">sb-ml-5</div></div>
        <div class="outer-margin"><div class="square sb-mx-6">sb-mx-6</div></div>
        <div class="outer-margin"><div class="square sb-my-7">sb-my-7</div></div>
        <div class="outer-margin"><div class="square sb-m-8">sb-m-8</div></div>
      </div>

      <h1 class="sb-my-5">Padding</h1>

      <div class="wrapper">
        <div class="outer-padding"><div class="square sb-p-1">sb-p-1</div></div>
        <div class="outer-padding"><div class="square sb-pt-2">sb-pt-2</div></div>
        <div class="outer-padding"><div class="square sb-pr-3">sb-pr-3</div></div>
        <div class="outer-padding"><div class="square sb-pb-4">sb-pb-4</div></div>
        <div class="outer-padding"><div class="square sb-pl-5">sb-pl-5</div></div>
        <div class="outer-padding"><div class="square sb-px-6">sb-px-6</div></div>
        <div class="outer-padding"><div class="square sb-py-7">sb-py-7</div></div>
        <div class="outer-padding"><div class="square sb-p-8">sb-p-8</div></div>
      </div>
    </div>
  </section>
  `,
})
