const path = require('path')

module.exports = {
  stories: [
    // '../stories/**/*.stories.js',
    '../src/**/*.stories.js'
  ],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-actions',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource'
  ],
  // https://storybook.js.org/docs/configurations/custom-webpack-config/
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['sass-loader', {
        loader: 'style-resources-loader',
        options: {
          patterns: [
            path.resolve(__dirname, '../src/assets/styles/variables.scss')
          ]
        }
      }]
    })

    return config
  }
}
