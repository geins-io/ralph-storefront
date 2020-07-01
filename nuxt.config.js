export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/styles/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  loaders: [
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/pwa-module
    '@nuxtjs/pwa',
    [
      // Doc: https://github.com/nuxt-community/nuxt-i18n
      'nuxt-i18n',
      {
        seo: false,
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js',
            name: 'English',
            flag: 'gb',
            apiKey: '5324971256'
          },
          {
            code: 'sv',
            iso: 'sv-SE',
            file: 'sv-SE.js',
            name: 'Svenska',
            flag: 'se',
            apiKey: '5324971256'
          }
        ],
        langDir: 'languages/',
        defaultLocale: 'sv',
        lazy: true,
        vueI18n: {
          fallbackLocale: 'sv'
        }
      }
    ],
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo'
  ],
  styleResources: {
    scss: ['./styles/_variables.scss', './styles/_helpers.scss']
  },
  apollo: {
    // optional
    // watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    // optional
    // errorHandler: '~/plugins/apollo-error-handler.js',
    // required
    clientConfigs: {
      default: {
        httpEndpoint: 'https://ralphservice.azurewebsites.net/graphql',
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false // try to enable this later
      }
    }
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'product',
        path: '/p/:alias*',
        component: resolve(__dirname, 'pages/product/_alias.vue')
      });
      routes.push({
        name: 'category',
        path: '/c/:category',
        component: resolve(__dirname, 'pages/list/_category.vue')
      });
      routes.push({
        name: 'brand',
        path: '/b/:brand',
        component: resolve(__dirname, 'pages/list/_brand.vue')
      });
    }
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['@ralph/ralph-ui'],
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev }) {
      if (isDev) {
        config.devtool = 'source-map';
      }
    }
  },
  dev: process.env.NODE_ENV !== 'production'
};
