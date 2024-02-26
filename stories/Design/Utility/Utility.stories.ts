import type { Meta, StoryObj } from '@storybook/vue3'
import './utility.scss'

const meta: Meta = {
  title: 'Design/Utility Classes',
}

export default meta

export const BackgroundUsage: StoryObj = {
  render: () => ({
    template: `
    <h2 class="font-20 font-bold sb-mb-3">Background color</h2>
    <section class="flex" style="gap: 8px;">
    <div class="helper-square bg-teal">.bg-teal</div>
    <div class="helper-square bg-dark-blue text-white">.bg-dark-blue</div>
    <div class="helper-square bg-green">.bg-green</div>
    <div class="helper-square bg-white">.bg-white</div>
    <div class="helper-square bg-yellow">.bg-yellow</div>
    <div class="helper-square bg-blue">.bg-blue</div>
    <div class="helper-square bg-red">.bg-red</div>
    <div class="helper-square bg-gray">.bg-gray</div>
    <div class="helper-square bg-gray-50">.bg-gray-50</div>
    </section>

    <h2 class="font-20 font-bold sb-mb-3 sb-mt-6">Example Background Usages</h2>
    <section class="flex" style="gap: 8px;">
    <div class="helper-square example-bg">$bg-teal-light and $border-teal</div>
    <div class="helper-square example-bg-yellow">$bg-yellow-light and $border-yellow</div>
    <div class="helper-square example-bg-blue">$bg-blue-light and $border-blue</div>
    <div class="helper-square example-bg-red">$bg-red and $bg-red-hover</div>
    <div class="helper-square example-bg-dark-blue">$bg-dark-blue and $bg-dark-blue-hover</div>
    </section>


    <h2 class="font-20 font-bold sb-mb-3 sb-mt-6">Background color Variables</h2>

    <pre><code>
$bg-yellow: #f4b20b;
$bg-yellow-hover: #da9707;
$bg-yellow-light: #fff4d5;
$bg-white: #fff;
$bg-teal: #00b3b0;
$bg-teal-hover: #057f7f;
$bg-teal-light: #d4f7f3;
$bg-red: #ff6159;
$bg-red-hover: #e5271d;
$bg-red-light: #ffe2e1;
$bg-green: #2db47d;
$bg-green-light: #d7f4e3;
$bg-gray: #b1b5be;
$bg-gray-50:  #f6f7f8;
$bg-gray-100: #ebecee;
$bg-dark-blue: #0a2e7f;
$bg-dark-blue-hover: #262e48;
$bg-blue: #395ece;
$bg-blue-hover: #75a0e5;
$bg-blue-light: #e0e9f9;
    </code></pre>
    `,
  }),
}

export const BorderUsage: StoryObj = {
  render: () => ({
    template: `
    <h2 class="font-20 font-bold sb-mb-3">Border Examples</h2>
    <section class="flex" style="gap: 8px;">
      <div class="helper-square example-border">A box with $border-gray-light</div>
      <div class="helper-square example-border-2">A box with $border-teal-focus</div>
      <div class="helper-square example-border-3">A box with $border-dark-blue-focus</div>
    </section>

    <h2 class="font-20 font-bold sb-mb-3 sb-mt-6">Border Color Variables</h2>

    <pre><code>
  $border-teal:  #00b3b0;
  $border-teal-focus:  #6fdcd3;
  $border-dark-blue:  #1b243f;
  $border-dark-blue-focus:  #8b91a7;
  $border-blue:  #a2c1ee;
  $border-yellow:  #fbcd41;
  $border-red:  #ff6159;
  $border-gray-light: #dbdde2;
  $border-white:  #fff;
    </code></pre>
    `,
  }),
}
