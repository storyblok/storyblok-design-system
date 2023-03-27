// const { mergeConfig } = require('vite');
// import projectConfig from '../vite.config.ts';

const config = {
  framework: {
    name: '@storybook/vue3-vite',
    // options: projectConfig
  },
  staticDirs: ['../public'],
  stories: ['../stories/**/*.stories.js', '../src/**/*.stories.js'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-viewport', '@storybook/addon-a11y'],
  // async viteFinal(config) {
  //   return mergeConfig(config, projectConfig);
  // },
  // docs: {
  //   autodocs: true
  // }
};

export default config
