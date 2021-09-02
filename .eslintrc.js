module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier', 'prettier/vue'],
  // add your custom rules here
  rules: {
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    'vue/no-unused-components': 1,
    curly: 2
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'antlr',
    '**/unifaun-checkout-all.min.js'
  ]
};
