import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import DirectoryNamedWebpackPlugin from './static/directory-named-webpack-resolve';
const filepath = './static/ImageSize.csv';

// Pipeline environment variables
const inDev = process.env.NODE_ENV !== 'production';
const ImageServer = inDev ? process.env.IMAGE_SERVER : '#{ImageServer}#';
const ApiKey = inDev ? process.env.API_KEY : '#{ApiKey}#';
const ApiEndpoint = inDev ? process.env.API_ENDPOINT : '#{ApiEndpoint}#';
const csvStream = fs.createReadStream(filepath);
const imageSizeObject = {};
const csvStreamRead = new Promise(function(resolve) {
  csvStream
    .pipe(csv())
    .on('data', row => {
      const PartitionKey = row.PartitionKey.toLowerCase();
      const imageRow = {
        folder: row.Folder,
        descriptor: row.Width + 'w'
      };

      if (imageSizeObject[PartitionKey]) {
        imageSizeObject[row.PartitionKey].push(imageRow);
      } else {
        imageSizeObject[PartitionKey] = [imageRow];
      }
    })
    .on('end', () => {
      resolve(imageSizeObject);
    });
});
async function getImageSizes() {
  const imageSizes = await csvStreamRead;
  return imageSizes;
}
export default async () => {
  const imageSizes = await getImageSizes();
  return {
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
    // See https://github.com/nuxt/components
    components: [
      { path: '~/components', extensions: ['vue'] },
      { path: '~/globalComponents', extensions: ['vue'], global: true },
      {
        path: '~/node_modules/@ralph/ralph-ui/components',
        extensions: ['vue'],
        level: 1
      },
      {
        path: '~/node_modules/@ralph/ralph-ui/globalComponents',
        extensions: ['vue'],
        level: 1,
        global: true
      }
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [{ src: '~/plugins/persistedState.js' }],

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
      'cookie-universal-nuxt',
      // Doc: https://www.npmjs.com/package/nuxt-user-agent
      'nuxt-user-agent',
      // Doc: https://www.npmjs.com/package/@nuxtjs/component-cache
      ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }]
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
      },
      includeNodeModules: true
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
        routes.push({
          name: 'content',
          path: '/:alias',
          component: resolve(__dirname, 'pages/content/_alias.vue')
        });
      }
    },
    /*
     ** Runtime configs
     */
    publicRuntimeConfig: {
      bannerWidgetPrimaryColor: '#000000',
      bannerWidgetSecondaryColor: '#FFFFFF',
      productListPageSize: 20,
      productListRowSize: 5,
      productListScrollSize: {
        phone: 2,
        tablet: 3,
        laptop: 5,
        desktop: 5
      },
      productListDefaultSort: 'LATEST',
      productStockFewLeftLimit: 6,
      breakpoints: {
        tablet: 768,
        laptop: 1024,
        desktop: 1200
      },
      productImageRatio: 1 / 1,
      imageServer: ImageServer,
      apiKey: ApiKey,
      imageSizes,
      widgetImageSizes: {
        full: '(min-width: 1360px) 1320px, 96vw',
        half: '(min-width: 1360px) 650px, (min-width: 768px) 47vw, 96vw',
        third: '(min-width: 1360px) 427px, (min-width: 768px) 31vw, 96vw',
        quarter: '(min-width: 1360px) 315px, (min-width: 768px) 23vw, 96vw'
      }
    },
    privateRuntimeConfig: {},
    render: {
      http2: {
        push: true
      }
    },
    server: {
      timing: {
        total: true
      }
    },
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
      optimization: {
        splitChunks: {
          chunks: 'all',
          automaticNameDelimiter: '.',
          name: undefined,
          cacheGroups: {},
          minSize: 15000,
          maxSize: 180000
        }
      },
      /*
       ** You can extend webpack config here
       */
      extend(config, { isDev }) {
        config.resolve.extensions.unshift('.vue');
        config.resolve.plugins = [new DirectoryNamedWebpackPlugin()];
        // Resolve modules by always checking storefront first to allow for overrides
        config.resolve.modules = [
          path.resolve(__dirname, 'node_modules/'),
          // First check for scss styles
          path.resolve(__dirname, 'styles/components/'),
          path.resolve(
            __dirname,
            'node_modules/@ralph/ralph-ui/styles/components/'
          ),
          // Then for mixins
          path.resolve(__dirname, 'components/mixins/'),
          path.resolve(
            __dirname,
            'node_modules/@ralph/ralph-ui/components/mixins/'
          ),
          // Then for graphql queries
          path.resolve(__dirname, 'graphql/'),
          path.resolve(__dirname, 'node_modules/@ralph/ralph-ui/graphql/'),
          // Then the UI store
          path.resolve(__dirname, 'node_modules/@ralph/ralph-ui/store/')
        ];
        if (isDev) {
          config.devtool = 'source-map';
        }
      }
    },
    dev: inDev
  };
};
