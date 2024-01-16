const config = {
  framework: {
    name: '@storybook/vue3-vite',
  },
  staticDirs: ['../public'],
  stories: [
    '../stories/**/*.stories.@(ts|js|mdx)',
    '../src/**/*.stories.@(ts|js|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-themes',
  ],
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
}

export default config
