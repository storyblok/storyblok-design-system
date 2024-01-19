import { dirname, join } from "path";
const config = {
  framework: {
    name: getAbsolutePath("@storybook/vue3-vite"),
  },
  staticDirs: ['../public'],
  stories: [
    '../stories/**/*.stories.@(ts|js|mdx)',
    '../src/**/*.stories.@(ts|js|mdx)',
  ],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-storysource"),
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
}

export default config

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
