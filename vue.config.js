
const path = require('path')
const { globalStyles } = require('./config/globals')
function addStyleResource(rule) {
  rule.use('style-resource').loader('style-resources-loader').options({
    patterns: globalStyles,
  })
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: path.resolve(
          __dirname,
          'node_modules/vue/runtime.esm-bundler.js'
        ),
      },
      symlinks: false,
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
        }
      })

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach((type) => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
}
