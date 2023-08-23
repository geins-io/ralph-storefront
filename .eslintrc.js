module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      plugins: ['@babel/plugin-proposal-class-properties'],
      presets: ['@babel/preset-env'],
    },
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  // add your custom rules here
  rules: {
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    'vue/no-unused-components': 1,
    curly: 2,
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'antlr',
    '**/unifaun-checkout-all.min.js',
  ],
};
