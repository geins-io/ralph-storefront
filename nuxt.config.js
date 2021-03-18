import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import {
  ApolloClient,
  gql,
  InMemoryCache,
  HttpLink
} from '@apollo/client/core';
import fetch from 'cross-fetch';
import DirectoryNamedWebpackPlugin from './static/directory-named-webpack-resolve';
const imageSizesFile = './static/ImageSize.csv';

const imageSizesStream = fs.createReadStream(imageSizesFile);
const imageSizeObject = {};
const apolloCache = new InMemoryCache({});
const apolloClient = new ApolloClient({
  cache: apolloCache,
  link: new HttpLink({ uri: process.env.API_ENDPOINT, fetch })
});

// Parse the imageSizesFile to get the image sizes
const imageSizesStreamRead = new Promise(function(resolve) {
  imageSizesStream
    .pipe(csv())
    .on('data', row => {
      // Get the value from the PartitionKey (Imate type) Column and make it lowercase (Because of input inconsistencies in the source document)
      const PartitionKey = row.PartitionKey.toLowerCase();
      // Create the data for this row
      const imageRow = {
        folder: row.Folder,
        descriptor: row.Width + 'w'
      };
      // Check if the imagesizeobject has the current image tyoe already, if so add to it, otherwise create it
      if (imageSizeObject[PartitionKey]) {
        imageSizeObject[PartitionKey].push(imageRow);
      } else {
        imageSizeObject[PartitionKey] = [imageRow];
      }
    })
    .on('end', () => {
      resolve(imageSizeObject);
    });
});

async function getImageSizes() {
  const imageSizes = await imageSizesStreamRead;
  return imageSizes;
}
export default async () => {
  const imageSizes = await getImageSizes();
  const apiKey = process.env.API_KEY;
  const defaultMetaQuery = await apolloClient.query({
    query: gql`
      query listPageInfo {
        listPageInfo(apiKey: "${apiKey}", alias: "frontpage") {
          meta {
            description
            title
          }
        }
      }
    `
  });
  const defaultMeta = await defaultMetaQuery.data.listPageInfo.meta;
  return {
    /*
     ** Headers of the page
     */
    head: {
      link: [
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
      { path: '~/components/atoms', extensions: ['vue'] },
      { path: '~/components/molecules', extensions: ['vue'] },
      { path: '~/components/organisms', extensions: ['vue'] },
      {
        path: '~/node_modules/@ralph/ralph-ui/components/atoms',
        extensions: ['vue'],
        level: 1
      },
      {
        path: '~/node_modules/@ralph/ralph-ui/components/molecules',
        extensions: ['vue'],
        level: 1
      },
      {
        path: '~/node_modules/@ralph/ralph-ui/components/organisms',
        extensions: ['vue'],
        level: 1
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
          detectBrowserLanguage: false,
          parsePages: false,
          pages: {
            'checkout/index': {
              sv: '/kassan',
              en: '/checkout'
            },
            'account/orders': {
              sv: '/mina-sidor/ordrar',
              en: '/my-account/orders'
            },
            'account/settings': {
              sv: '/mina-sidor/installningar',
              en: '/my-account/settings'
            }
          }
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
      ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
      // Doc: https://www.npmjs.com/package/nuxt-polyfill
      'nuxt-polyfill'
    ],
    pwa: {
      // Default metadata. Doc: https://pwa.nuxtjs.org/meta/
      meta: {
        name: defaultMeta.title,
        description: defaultMeta.description,
        author: null
      }
    },
    styleResources: {
      scss: ['./styles/_variables.scss', './styles/_helpers.scss']
    },
    apollo: {
      clientConfigs: {
        default: {
          httpEndpoint: process.env.API_ENDPOINT,
          httpLinkOptions: {
            headers: {
              apikey: process.env.API_KEY
            }
          },
          tokenName: 'ralph-auth'
        }
      },
      includeNodeModules: true
    },
    polyfill: {
      features: [
        {
          require: 'focus-visible'
        }
      ]
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
        // Adding routes with translated paths is done through nuxt-i18n config above
      }
    },
    /*
     ** Runtime configs
     */
    publicRuntimeConfig: {
      /* ***************** */
      /* **** GLOBAL ***** */
      /* ***************** */
      imageServer: process.env.IMAGE_SERVER,
      apiKey: process.env.API_KEY,
      authEndpoint: process.env.AUTH_ENDPOINT,
      signEndpoint: process.env.SIGN_ENDPOINT,
      gtm: {
        id: ''
      },
      customerServiceEmail: 'info@ralph.io',
      customerServicePhone: '+46 123 23 43 45',
      breakpoints: {
        tablet: 768,
        laptop: 1024,
        desktop: 1200
      },
      /* ****************** */
      /* **** WIDGETS ***** */
      /* ****************** */
      bannerWidgetPrimaryColor: '#000000',
      bannerWidgetSecondaryColor: '#FFFFFF',
      productListWidgetArrowIconName: 'chevron',
      productListRowSize: 5,
      widgetImageSizes: {
        full: '(min-width: 1360px) 1320px, 96vw',
        half: '(min-width: 1360px) 650px, (min-width: 768px) 47vw, 96vw',
        third: '(min-width: 1360px) 427px, (min-width: 768px) 31vw, 96vw',
        quarter: '(min-width: 1360px) 315px, (min-width: 768px) 23vw, 96vw'
      },
      widgetImageSizesFullWidth: {
        full: '100vw',
        half: '(min-width: 768px) 49vw, 100vw',
        third: '(min-width: 768px) 33vw, 100vw',
        quarter: '(min-width: 768px) 24vw, 100vw'
      },
      /* *********************** */
      /* **** PRODUCT LIST ***** */
      /* *********************** */
      productListDefaultSort: 'LATEST',
      productListPageSize: 20,
      productListScrollSize: {
        phone: 2,
        tablet: 3,
        laptop: 5,
        desktop: 5
      },
      /* ****************** */
      /* **** PRODUCT ***** */
      /* ****************** */
      productStockFewLeftLimit: 6,
      /* ****************** */
      /* **** IMAGES ***** */
      /* ****************** */
      productImageRatio: 1 / 1,
      imageSizes
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
          automaticNameDelimiter: 'a.',
          name: undefined,
          cacheGroups: {},
          minSize: 15000,
          maxSize: 260000
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
    dev: process.env.NODE_ENV !== 'production'
  };
};
