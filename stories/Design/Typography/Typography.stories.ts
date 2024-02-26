import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta = {
  title: 'Design/Typography',
}

export default meta

export const ExampleTextUsages: StoryObj = {
  render: () => ({
    template: `
    <section>
      <h2 class="font-20 font-bold sb-mb-5">Example Usages</h2>
      <label class="font-14 font-medium">Label text</label><br />
      <pre>$font-14, $font-medium</pre>
      <hr />
      <p class="font-14 text-gray">Simple descriptive text: </p>
      <pre>$font-14, $text-gray</pre>
      <hr />
      <p class="font-14 text-gray font-medium">Interactive text (e.g. tab titles)</p>
      <pre>$font-14, $text-gray, $font-medium</pre>
      <hr />
      <p class="font-14 text-teal">Highlighted text</p>
      <pre>$font-14, $text-gray</pre>
      <hr />
      <h1 class="font-26 font-bold text-dark-blue">Page title</h1>
      <pre>$font-26, $font-bold, $text-dark-blue</pre>
      <hr />
      <h3 class="font-16 font-medium text-dark-blue">Section headline</h3>
      <pre>$font-16, $font-medium, $text-dark-blue</pre>
      <hr />
      <p class="font-12 text-gray">Footnote, caption</p>
      <pre>$font-12, $text-gray</pre>
    </section>
  `,
  }),
}

export const FontSizes: StoryObj = {
  render: () => ({
    template: `
    <section>
      <h2 class="font-20 font-bold sb-mb-3">Font Sizes</h2>
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

      <h2 class="font-20 font-bold sb-mb-3 sb-mt-6">Font Size Variables</h2>

      <pre><code>
  $font-10: 1rem;
  $font-12: 1.2rem;
  $font-13: 1.3rem;
  $font-14: 1.4rem;
  $font-16: 1.6rem;
  $font-18: 1.8rem;
  $font-20: 2rem;
  $font-24: 2.4rem;
  $font-26: 2.6rem;
  $font-32: 3.2rem;
      </code></pre>

    </section>
  `,
  }),
}

export const FontWeights: StoryObj = {
  render: () => ({
    template: `
    <section>
      <h2 class="font-20 font-bold sb-mb-3">Font Weight</h2>
      <p class="font-light">.font-light</p>
      <p class="font-regular">.font-regular</p>
      <p class="font-medium">.font-medium</p>
      <p class="font-bold">.font-bold</p>

      <h2 class="font-20 font-bold sb-mb-3 sb-mt-6">Font Weight Variables</h2>

      <pre><code>
  $font-light: 300;
  $font-regular: 400;
  $font-medium: 500;
  $font-bold: 700;
      </code></pre>
    </section>
  `,
  }),
}

export const TextColors: StoryObj = {
  render: () => ({
    template: `
    <section>
      <h2 class="font-20 font-bold sb-mb-3">Text Color</h2>
      <p class="text-yellow">.text-yellow</p>
      <p class="text-white bg-dark-blue">.text-white</p>
      <p class="text-teal">.text-teal</p>
      <p class="text-red">.text-red</p>
      <p class="text-green">.text-green</p>
      <p class="text-gray-light">.text-gray-light</p>
      <p class="text-gray">.text-gray</p>
      <p class="text-blue">.text-blue</p>
      <p class="text-dark-blue">.text-dark-blue</p>


      <h2 class="font-20 font-bold sb-mb-3 sb-mt-6">Text Color Variables</h2>

      <pre><code>
      $text-yellow: #f4b20b;
      $text-yellow-hover: #fbcd41;
      $text-white: #fff;
      $text-teal: #00b3b0;
      $text-red: #ff6159;
      $text-green: #2db47d;
      $text-gray-light: #b1b5be;
      $text-gray: #6a728a;
      $text-dark-blue: #1b243f;
      $text-blue: #3f6fcd;
      </code></pre>
    </section>
  `,
  }),
}

export const HeadingSizes: StoryObj = {
  render: () => ({
    template: `
    <section>
      <h2 class="font-20 font-bold sb-mb-3">Headings</h2>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </section>
  `,
  }),
}
