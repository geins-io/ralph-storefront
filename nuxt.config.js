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

const fallbackChannelId = process.env.FALLBACK_CHANNEL_ID;
const fallbackMarketAlias = process.env.FALLBACK_MARKET_ALIAS;

const routePaths = {
  category: '/c',
  brand: '/b',
  product: '/p',
  search: '/s',
  discountCampaign: '/dc',
  list: '/l'
};

// Set the domain settings and market settings based on if env-variable DOMAINS exists
// Default settings for multi market / multi language
// TODO: All this should come from channelSettings when we have a way to get channel settings from api
let domainSettings = {
  differentDomains: false,
  strategy: 'prefix'
};
let domainUrls = null;

// Default settings for market for publicRuntimeConfig
let marketSettings = {
  isMultiLanguage: true,
  marketInPath: true
};

if (process.env.DOMAINS) {
  const domains = process.env.DOMAINS.split(',');

  domainUrls = domains
    ?.map(domain => {
      const domainArr = domain?.split('|');
      return {
        [domainArr[0]]: domainArr[1] || ''
      };
    })
    .reduce((result, item) => {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

  // If using DOMAINS, turn off multilang and marketInPath
  marketSettings = {
    isMultiLanguage: false,
    marketInPath: false
  };

  // If site should have only language prefix and no market prefix, remove the following declaration
  domainSettings = {
    differentDomains: false,
    strategy: 'no_prefix'
  };

  if (domains.length > 1) {
    // If more than one domain, set diffrentDomains to true
    domainSettings = {
      differentDomains: true
    };
  }
}

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
  // Get default meta
  const defaultMetaQuery = await apolloClient.query({
    query: gql`
      query listPageInfo {
        listPageInfo(alias: "frontpage", channelId: "${fallbackChannelId}", marketId: "${fallbackMarketAlias}") {
          meta {
            description
            title
          }
        }
      }
    `,
    context: {
      headers: {
        'X-ApiKey': process.env.API_KEY
      }
    }
  });
  const defaultMeta = await defaultMetaQuery.data.listPageInfo.meta;

  // Get fallback markets
  const getMarketsQuery = await apolloClient.query({
    query: gql`
      query channel {
        channel(channelId: "${fallbackChannelId}") {
          defaultMarketId
          markets {
            id
            defaultLanguageId
            alias
            virtual
            onlyDisplayInCheckout
            groupKey
            allowedLanguages {
              id
              name
              code
            }
            country {
              name
              code
            }
            currency {
              name
              code
            }
          }
        }
      }
    `,
    context: {
      headers: {
        'X-ApiKey': process.env.API_KEY
      }
    }
  });
  const markets = await getMarketsQuery.data.channel.markets;

  return {
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#ffdce0', height: '5px' },
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
    plugins: [
      { src: '~/plugins/persistedState.js', mode: 'client' },
      {
        src: '~/node_modules/@ralph/ralph-ui/plugins/ralph.js'
      },
      {
        src: '~/node_modules/@ralph/ralph-ui/plugins/broadcastChannel.js',
        mode: 'client'
      },
      {
        src: '~/node_modules/@ralph/ralph-ui/plugins/appInsights.client.js',
        mode: 'client'
      },
      {
        src: '~/node_modules/@ralph/ralph-ui/plugins/appInsights.server.js',
        mode: 'server'
      },
      {
        src: '~/node_modules/@ralph/ralph-ui/plugins/headersControl.js',
        mode: 'server'
      },
      {
        src: '~/plugins/voyadoEngage.client.js',
        mode: 'client',
        ssr: false
      }
    ],

    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
      // Doc: https://www.npmjs.com/package/@nuxtjs/router
      [
        '@nuxtjs/router',
        {
          path: 'node_modules/@ralph/ralph-ui/plugins',
          keepDefaultRouter: true
        }
      ],
      // Doc: https://github.com/nuxt-community/eslint-module
      '@nuxtjs/eslint-module',
      // Doc: https://github.com/nuxt-community/stylelint-module
      '@nuxtjs/stylelint-module'
      // Doc: https://html-validator.nuxtjs.org/
      // '@nuxtjs/html-validator'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
      // Doc: https://github.com/nuxt-community/pwa-module
      '@nuxtjs/pwa',
      [
        // Doc: https://github.com/nuxt-community/i18n-module
        '@nuxtjs/i18n',
        {
          baseUrl: process.env.BASE_URL,
          seo: false,
          locales: [
            // This might be used later, keeping it here
            // {
            //   code: 'en',
            //   iso: 'en-US',
            //   file: 'en-US.js',
            //   name: 'English',
            //   country: 'Europe',
            //   currency: 'EUR',
            //   flag: 'eu',
            //   domain: domainUrls?.en || '' // Only matters if diffrentDomains are used
            // },
            {
              code: 'sv',
              iso: 'sv-SE',
              file: 'sv-SE.js',
              name: 'Swedish',
              country: 'Sweden',
              currency: 'SEK',
              flag: 'se',
              domain: domainUrls?.sv || '' // Only matters if diffrentDomains are used
            },
            {
              code: 'nb',
              iso: 'nb-NO',
              file: 'nb-NO.js',
              name: 'Norsk',
              country: 'Norway',
              currency: 'NOK',
              flag: 'no',
              domain: domainUrls?.nb || '' // Only matters if diffrentDomains are used
            },
            {
              code: 'da',
              iso: 'da-DK',
              file: 'da-DK.js',
              name: 'Dansk',
              country: 'Denmark',
              currency: 'DKK',
              flag: 'dk',
              domain: domainUrls?.da || '' // Only matters if diffrentDomains are used
            },
            {
              code: 'fi',
              iso: 'fi-FI',
              file: 'fi-FI.js',
              name: 'Finska',
              country: 'Finland',
              currency: 'EUR',
              flag: 'fi',
              domain: domainUrls?.fi || '' // Only matters if diffrentDomains are used
            }
          ],
          langDir: 'languages/',
          defaultLocale: process.env.DEFAULT_LOCALE,
          lazy: true,
          vueI18n: {
            fallbackLocale: process.env.DEFAULT_LOCALE
          },
          detectBrowserLanguage: false,
          parsePages: false,
          pages: {
            'checkout/index': {
              sv: '/kassan',
              en: '/checkout',
              da: '/kassen',
              fi: '/kassa',
              nb: '/kassen'
            },
            'account/orders': {
              sv: '/mina-sidor/ordrar',
              en: '/my-account/orders',
              da: '/min-konto/bestillinger',
              fi: '/tilini/tilaukset',
              nb: '/min-konto/bestillinger'
            },
            'account/settings': {
              sv: encodeURI('/mina-sidor/inställningar'),
              en: '/my-account/settings',
              da: '/min-konto/indstillinger',
              fi: '/tilini/asetukset',
              nb: '/min-konto/innstillinger'
            },
            'account/balance': {
              sv: '/mina-sidor/saldo',
              en: '/my-account/balance',
              da: '/min-konto/saldo',
              fi: '/tilini/saldo',
              nb: '/min-konto/saldo'
            },
            'favorites/index': {
              sv: '/favoriter',
              en: '/favorites',
              da: '/favoritter',
              fi: '/suosikkeja',
              nb: '/favoritter'
            },
            'brands/index': {
              sv: encodeURI('/märken'),
              en: '/brands',
              da: encodeURI('/mærker'),
              fi: '/tuotemerkit',
              nb: '/merker'
            },
            'list/bestsellers': {
              sv: encodeURI('/bästsäljare-just-nu'),
              en: '/bestsellers',
              da: '/bestseller-lige-nu',
              fi: '/parhaiten-myydyt-just-nyt',
              nb: encodeURI('/bestselgere-akkurat-nå')
            },
            'list/_all': {
              sv: '/nyheter',
              en: '/news',
              da: '/nyheder',
              fi: '/uutuudet',
              nb: '/nyheter'
            }
          },
          ...domainSettings
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
      // Doc: https://www.npmjs.com/package/@nuxtjs/applicationinsights
      '@nuxtjs/applicationinsights',
      // Doc: https://www.npmjs.com/package/@geins/ralph-module-voyado-elevate
      [
        '@geins/ralph-module-voyado-elevate',
        {
          clusterId: process.env.VOYADO_CLUSTER_ID
        }
      ],
      // Doc: https://www.npmjs.com/package/@geins/ralph-module-gtm
      [
        '@geins/ralph-module-gtm',
        {
          itemId: 'articleNumber',
          propOverrides: [
            {
              override: 'price_campaign',
              name: 'green_price'
            },
            {
              override: 'value',
              name: 'total_value'
            },
            {
              override: 'items_value_ex_tax',
              name: 'value'
            },
            {
              override: 'items_value',
              name: 'UA_value'
            },
            {
              override: 'items_tax',
              name: 'tax'
            },
            {
              override: 'user_id',
              name: 'userId'
            }
          ],
          gtm: {
            id: process.env.GTM_ID,
            debug: process.env.RALPH_ENV === 'dev',
            respectDoNotTrack: false
          }
        }
      ],
      // Doc: https://www.npmjs.com/package/@nuxtjs/robots/v/2.5.0
      '@nuxtjs/robots'
    ],
    robots() {
      const options = [
        {
          UserAgent: '*',
          Disallow: ['/checkout/', '/account/', '/favorites'],
          Sitemap:
            domainUrls[process.env.DEFAULT_LOCALE] +
            '/sitemap/bubbleroom.' +
            fallbackMarketAlias +
            '-' +
            process.env.DEFAULT_LOCALE +
            '-' +
            fallbackMarketAlias.toUpperCase() +
            '.xml'
        }
      ];
      switch (fallbackMarketAlias) {
        case 'se':
          options[0].Disallow.push('/kassan', '/mina-sidor/', '/favoriter');
          break;
        case 'fi':
          options[0].Disallow.push('/kassa', '/tilini/', '/suosikkeja');
          break;
        case 'no':
          options[0].Disallow.push('/kassen', '/min-konto/', '/favoriter');
          break;
        case 'dk':
          options[0].Disallow.push('/kassen', '/min-konto/', '/favoritter');
          break;
        default:
          break;
      }
      options.push({ userAgent: 'AhrefsBot', disallow: '/' });
      return options;
    },
    head: {
      script: [
        {
          hid: 'voyado-engage-js-embed',
          src:
            process.env.ralphEnv === 'prod'
              ? '/vendors/voyado-engage-tracking-script.js'
              : '/vendors/voyado-engage-tracking-script-staging.js',
          defer: true
        }
      ]
    },
    serverMiddleware: [{ path: '/api', handler: '~/api/voyado-engage.js' }],
    // htmlValidator: {
    //   usePrettier: true,
    //   options: {
    //     rules: {
    //       'input-missing-label': 'off',
    //       'prefer-native-element': 'off'
    //     }
    //   }
    // },
    pwa: {
      manifest: {
        name: 'Bubbleroom',
        short_name: 'Bubbleroom',
        description: defaultMeta.description,
        theme_color: '#ffdce0'
      },
      icon: {
        purpose: 'any'
      }
    },
    styleResources: {
      scss: ['./styles/_variables.scss', './styles/_helpers.scss']
    },
    apollo: {
      clientConfigs: {
        default: '~/node_modules/@ralph/ralph-ui/plugins/apollo-config.js'
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
      middleware: ['default'],
      extendRoutes(routes, resolve) {
        routes.push({
          name: 'pdp',
          path: routePaths.product + '/:alias',
          component: resolve(__dirname, 'pages/product/_alias.vue')
        });
        routes.push({
          name: 'pdp-level',
          path: routePaths.product + '/(.*)/:alias',
          component: resolve(__dirname, 'pages/product/_alias.vue')
        });
        routes.push({
          name: 'pdp-sub-level',
          path: routePaths.product + '/(.*)/(.*)/:alias',
          component: resolve(__dirname, 'pages/product/_alias.vue')
        });
        routes.push({
          name: 'plp',
          path: routePaths.list + '/*',
          component: resolve(__dirname, 'pages/list/_list.vue')
        });
        routes.push({
          name: 'plp-search',
          path: routePaths.search + '/:search',
          component: resolve(__dirname, 'pages/list/_search.vue')
        });
        routes.push({
          name: 'preview-widgets',
          path: '/preview-widgets',
          component: resolve(__dirname, 'pages/content/_preview.vue')
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
      ralphEnv: process.env.RALPH_ENV,
      baseUrl: process.env.BASE_URL,
      imageServer: process.env.IMAGE_SERVER,
      authEndpoint: process.env.AUTH_ENDPOINT,
      signEndpoint: process.env.SIGN_ENDPOINT.replace(
        '{API_KEY}',
        process.env.API_KEY
      ),
      apiKey: process.env.API_KEY,
      apiEndpoint: process.env.API_ENDPOINT,
      fallbackChannelId,
      fallbackMarketAlias,
      ...marketSettings,
      useStartPage: false,
      markets,
      salePathsByMarket: {
        se: '/rea',
        en: '/sale',
        dk: '/udsalg',
        fi: '/ale',
        no: '/tilbud'
      },
      customerServiceEmail: 'kundservice@bubbleroom.se',
      customerServicePhone: '08-411 17 17',
      breakpoints: {
        tablet: 768,
        laptop: 1024,
        desktop: 1200,
        desktopBig: 1440
      },
      siteTopThreshold: 10,
      paymentAndDeliveryLogosByMarket: {
        se: [
          'bubbleroom-faktura',
          'bubbleroom-konto',
          'visa',
          'mastercard',
          'swish',
          'budbee',
          'postnord',
          'instabox'
        ],
        dk: [
          'bubbleroom-faktura',
          'bubbleroom-konto',
          'visa',
          'mastercard',
          'budbee',
          'postnord',
          'mobilepay'
        ],
        fi: [
          'bubbleroom-faktura',
          'bubbleroom-konto',
          'visa',
          'mastercard',
          'budbee',
          'posti',
          'mobilepay'
        ],
        no: [
          'bubbleroom-faktura',
          'bubbleroom-konto',
          'visa',
          'mastercard',
          'vipps',
          'postnord'
        ]
      },
      paymentAndDeliveryLogos: [
        {
          name: 'bubbleroom-faktura',
          type: 'payment'
        },
        {
          name: 'bubbleroom-konto',
          type: 'payment'
        },
        {
          name: 'visa',
          type: 'payment'
        },
        {
          name: 'mastercard',
          type: 'payment'
        },
        {
          name: 'swish',
          type: 'payment'
        },
        {
          name: 'budbee',
          type: 'shipping'
        },
        {
          name: 'postnord',
          type: 'shipping'
        },
        {
          name: 'vipps',
          type: 'shipping'
        },
        {
          name: 'posti',
          type: 'shipping'
        },
        {
          name: 'instabox',
          type: 'shipping'
        }
      ],
      socialMediaLinks: [
        {
          icon: 'instagram',
          title: 'Instagram',
          link: 'https://instagram.com/bubbleroom'
        },
        {
          icon: 'tiktok',
          title: 'TikTok',
          link: 'https://www.tiktok.com/@bubbleroom'
        },
        {
          icon: 'facebook',
          title: 'Facebook',
          link: 'https://www.facebook.com/bubbleroom'
        },
        {
          icon: 'youtube',
          title: 'Youtube',
          link: 'https://www.youtube.com/user/BubbleroomVideo'
        },
        {
          icon: 'linkedin',
          title: 'LinkedIn',
          link: 'https://www.linkedin.com/company/bubbleroom/'
        }
      ],
      customerTypesToggle: false,
      customerTypes: [
        {
          type: 'PERSON',
          vat: true
        },
        {
          type: 'ORGANIZATION',
          vat: false
        }
      ],
      routePaths,
      useExternalGtm: true,
      /* ****************** */
      /* **** WIDGETS ***** */
      /* ****************** */
      bannerWidgetPrimaryColor: '#000000',
      bannerWidgetSecondaryColor: '#FFFFFF',
      productListWidgetArrowIconName: 'chevron',
      productListRowSize: 4,
      widgetImageSizes: {
        full: '(min-width: 1860px) 1920px, 96vw',
        half: '(min-width: 1860px) 950px, (min-width: 768px) 48vw, 96vw',
        third: '(min-width: 1860px) 627px, (min-width: 768px) 31vw, 96vw',
        quarter: '(min-width: 1860px) 465px, (min-width: 768px) 23vw, 96vw'
      },
      widgetImageSizesFullWidth: {
        full: '100vw',
        half: '(min-width: 768px) 50vw, 100vw',
        third: '(min-width: 768px) 33vw, 100vw',
        quarter: '(min-width: 768px) 25vw, 100vw'
      },
      /* *********************** */
      /* **** PRODUCT LIST ***** */
      /* *********************** */
      productListDefaultSort: 'LATEST',
      productListPageSize: 60,
      productListScrollSize: {
        phone: 2,
        tablet: 3,
        laptop: 4,
        desktop: 4,
        desktopBig: 4
      },
      showCategoryFilter: true,
      showCategoryTreeViewFilter: true,
      showBrandsFilter: true,
      showSkuFilter: true,
      showPriceFilter: true,
      showDiscountFilter: true,
      customSortRoutes: [
        {
          name: 'bestsellers',
          sort: 'CUSTOM_1'
        }
      ],
      /* ****************** */
      /* **** PRODUCT ***** */
      /* ****************** */
      productStockFewLeftLimit: 10,
      productSchemaOptions: {
        productSkuLabelIsSize: false,
        productDescriptionField: 'text1',
        schemaImageSize: '700x1016', // Make sure this is a valid product image size
        extraOfferProperties: {
          itemCondition: 'https://schema.org/NewCondition'
        }
      },
      productShowRelated: true,
      showProductReviewSection: false,
      showStarsInProductReviewForm: false, // it requires showProductReviewSection to be true
      /* ****************** */
      /* ***** IMAGES ***** */
      /* ****************** */
      productImageRatio: 1.4514,
      imageSizes,
      /* ******************** */
      /* ***** CHECKOUT ***** */
      /* ******************** */
      checkout: {
        promoCodes: true,
        shippingAddress: true,
        identityNumber: true,
        entryCode: true,
        message: true,
        defaultPaymentId: 29,
        defaultShippingId: null,
        showMultipleMarkets: true
      },
      /* ******************** */
      /* ******* CART ******* */
      /* ******************** */
      cart: {
        hiddenSkuValues: ['-', 'One size'],
        quantityChangerType: 'default'
      },
      /* ******************** */
      /* ******* USER ******* */
      /* ******************** */
      user: {
        gender: false, // If set to true, gender must be added to user.graphql
        country: false,
        priceLists: true // Set to true if using different price lists for different users
      },
      /* ******************** */
      /* ******* GTM ******* */
      /* ******************** */
      gtm: {
        isProductsKeyItems: false
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
      transpile: ['@ralph/ralph-ui', '@apptus/esales-api'],
      optimization: {
        splitChunks: {
          automaticNameDelimiter: 'ca.',
          chunks: 'async',
          minSize: 20000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      },
      loaders: {
        vue: { cacheBusting: false, prettify: false },
        scss: { sourceMap: false }
      },
      /*
       ** You can extend webpack config here
       */
      extend(config, { isDev }) {
        config.module.rules.push({
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        });
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
          path.resolve(__dirname, 'node_modules/@ralph/ralph-ui/store/'),
          // Then the UI middleware
          path.resolve(__dirname, 'node_modules/@ralph/ralph-ui/middleware/')
        ];
        if (isDev) {
          config.devtool = 'source-map';
        }
      }
    },
    dev: process.env.NODE_ENV === 'development',
    appInsights: {
      instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATION_KEY,
      serverConfig: {
        excludedFileEndings: ['.js', '.map', '.json', '.png', '.svg']
      },
      clientConfig: {
        enableAutoRouteTracking: true
      }
    }
  };
};
