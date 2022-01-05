const path = require('path')

const globalStyles = [
  path.resolve(__dirname, '../src/assets/styles/variables.scss'),
  path.resolve(__dirname, '../src/assets/styles/mixins.scss')
]

module.exports = {
  globalStyles
}
