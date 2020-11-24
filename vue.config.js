const { globalStyles } = require('./config/globals')

function addStyleResource(rule) {
  rule.use('style-resource').loader('style-resources-loader').options({
    patterns: globalStyles,
  })
}

module.exports = {
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach((type) => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  },
}
