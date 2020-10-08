import path from 'path';
// eslint-disable-next-line no-console
console.log('nodeversion', process.version);
// eslint-disable-next-line import/first
import DirectoryNamedWebpackPlugin from './static/directory-named-webpack-resolve';

// Pipeline environment variables
const inDev = process.env.NODE_ENV !== 'production';
const ImageServer = inDev ? process.env.IMAGE_SERVER : '#{ImageServer}#';
const ApiKey = inDev ? process.env.API_KEY : '#{ApiKey}#';
const ApiEndpoint = inDev ? process.env.API_ENDPOINT : '#{ApiEndpoint}#';

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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:400,400i,500&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#353797', height: '5px' },
  /*
   ** Global CSS
   */
  css: ['@/styles/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/localStorage.js', ssr: false }],
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
    '@nuxtjs/stylelint-module'
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
            flag: 'gb'
          },
          {
            code: 'sv',
            iso: 'sv-SE',
            file: 'sv-SE.js',
            name: 'Svenska',
            flag: 'se'
          }
        ],
        langDir: 'languages/',
        defaultLocale: 'sv',
        lazy: true,
        vueI18n: {
          fallbackLocale: 'sv'
        },
        detectBrowserLanguage: false
      }
    ],
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // Doc: https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt'
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
        httpEndpoint: ApiEndpoint,
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
   ** Runtime configs
   */
  publicRuntimeConfig: {
    productListPageSize: 20,
    productListDefaultSort: 'LATEST',
    imageServer: ImageServer,
    apiKey: ApiKey
  },
  privateRuntimeConfig: {},
  /*
   ** Build configuration
   */
  build: {
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    },
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              corejs: { version: 3 }
            }
          ]
        ];
      }
    },
    transpile: ['@ralph/ralph-ui'],
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev }) {
      config.resolve.extensions.unshift('.vue');
      config.resolve.plugins = [new DirectoryNamedWebpackPlugin()];
      // Resolve modules first by checking node modules, then checking Ralph Storefront components, then Ralph UI components
      config.resolve.modules = [
        path.resolve(__dirname, 'node_modules/'),
        path.resolve(__dirname, 'components/atoms/'),
        path.resolve(__dirname, 'components/molecules/'),
        path.resolve(__dirname, 'components/organisms/'),
        path.resolve(__dirname, 'components/mixins/'),
        path.resolve(__dirname, 'styles/components/'),
        path.resolve(
          __dirname,
          'node_modules/@ralph/ralph-ui/components/atoms/'
        ),
        path.resolve(
          __dirname,
          'node_modules/@ralph/ralph-ui/components/molecules/'
        ),
        path.resolve(
          __dirname,
          'node_modules/@ralph/ralph-ui/components/organisms/'
        ),
        path.resolve(
          __dirname,
          'node_modules/@ralph/ralph-ui/components/mixins/'
        ),
        path.resolve(
          __dirname,
          'node_modules/@ralph/ralph-ui/styles/components/'
        ),
        path.resolve(__dirname, 'node_modules/@ralph/ralph-ui/store/')
      ];
      if (isDev) {
        config.devtool = 'source-map';
      }
    }
  },
  dev: inDev
};
