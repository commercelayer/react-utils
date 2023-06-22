const { resolve } = require('path')
const tailwindConfig = require('../mfe-elements/tailwind.config.cjs')

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...tailwindConfig,
  content: tailwindConfig.content.map((content) =>
    resolve(__dirname, '../mfe-elements', content)
  )
}
