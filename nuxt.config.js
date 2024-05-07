import path from 'path';
import pkg from './package.json';
import { getImageSizes } from './config/image-sizes';
import { getFallbackMarkets, getFallbackMeta } from './config/fallback-data';
import { getMarketSettings } from './config/market-settings';
import {
  channelSettings,
  currentChannelSettings,
} from './config/channel-settings';
import { routePaths } from './config/route-paths';
import DirectoryNamedWebpackPlugin from './config/directory-named-webpack-resolve';

export default async () => {
  const ralphEnv = process.env.RALPH_ENV || 'prod';
  const imageSizes = await getImageSizes();
  const fallbackMarkets = await getFallbackMarkets();
  const fallbackMeta = await getFallbackMeta();
  const { domainSettings, domainUrls, marketSettings } = getMarketSettings();

  return {
    version: pkg.version + '-' + pkg.dependencies['@geins/ralph-ui'],
    /*
     ** Global CSS
     */
    css: ['@/styles/main.scss'],
    /*
     ** Customize the progress-bar color
     */
    loading: {
      color: currentChannelSettings.theme['accent-color'],
      height: '5px',
    },
    /*
     ** Auto import components with @nuxt/components
     ** See https://github.com/nuxt/components
     */
    components: [
      { path: '~/components/atoms', extensions: ['vue'] },
      { path: '~/components/molecules', extensions: ['vue'] },
      { path: '~/components/organisms', extensions: ['vue'] },
      {
        path: '~/node_modules/@geins/ralph-ui/components/atoms',
        extensions: ['vue'],
        level: 1,
      },
      {
        path: '~/node_modules/@geins/ralph-ui/components/molecules',
        extensions: ['vue'],
        level: 1,
      },
      {
        path: '~/node_modules/@geins/ralph-ui/components/organisms',
        extensions: ['vue'],
        level: 1,
      },
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
      {
        src: '~/node_modules/@geins/ralph-ui/plugins/ralph.js',
      },
      {
        src: '~/node_modules/@geins/ralph-ui/plugins/set-css-variables.js',
        mode: 'client',
      },
      {
        src: '~/node_modules/@geins/ralph-ui/plugins/broadcast-channel.js',
        mode: 'client',
      },
      {
        src: '~/node_modules/@geins/ralph-ui/plugins/headers-control.js',
        mode: 'server',
      },
    ],
    /*
     ** Nuxt.js build modules
     */
    buildModules: [
      // Internal build module
      '~/node_modules/@geins/ralph-ui/modules/ralph-build',
      // Doc: https://www.npmjs.com/package/@nuxtjs/router
      [
        '@nuxtjs/router',
        {
          path: 'node_modules/@geins/ralph-ui/plugins',
          keepDefaultRouter: true,
        },
      ],
      // Doc: https://github.com/nuxt-community/eslint-module
      '@nuxtjs/eslint-module',
      // Doc: https://github.com/nuxt-community/stylelint-module
      '@nuxtjs/stylelint-module',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
      // Doc: https://github.com/nuxt-community/i18n-module
      '@nuxtjs/i18n',
      // Doc: https://github.com/nuxt-community/pwa-module
      '@nuxtjs/pwa',
      // Doc: https://github.com/nuxt-community/apollo-module
      '@nuxtjs/apollo',
      // Doc: https://github.com/nuxt-community/style-resources-module
      '@nuxtjs/style-resources',
      // Doc: https://www.npmjs.com/package/nuxt-polyfill
      'nuxt-polyfill',
      // Doc: https://www.npmjs.com/package/cookie-universal-nuxt
      'cookie-universal-nuxt',
      // Doc: https://www.npmjs.com/package/nuxt-user-agent
      'nuxt-user-agent',
      // Doc: https://www.npmjs.com/package/nuxt-compress
      'nuxt-compress',
      // Doc: https://www.npmjs.com/package/nuxt-ssr-cache
      'nuxt-ssr-cache',
    ],
    cache: {
      pages: ['/'],
      store: {
        type: 'memory',
        max: 100,
        ttl: 60,
      },
    },
    /*
     ** Nuxt Compress configuration
     */
    'nuxt-compress': {
      gzip: {
        threshold: 8192,
        cache: true,
      },
      brotli: {
        threshold: 8192,
        cache: true,
      },
    },
    /*
     ** Nuxt.js i18n configuration
     */
    i18n: {
      baseUrl: process.env.BASE_URL,
      seo: false,
      // It's recommended to remove the locales you do not intend to use.
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js',
          name: 'English',
          domain: domainUrls?.en || '', // Only matters if diffrentDomains are used
        },
        {
          code: 'sv',
          iso: 'sv-SE',
          file: 'sv-SE.js',
          name: 'Swedish',
          domain: domainUrls?.sv || '', // Only matters if diffrentDomains are used
        },
        {
          code: 'nb',
          iso: 'nb-NO',
          file: 'nb-NO.js',
          name: 'Norsk',
          domain: domainUrls?.nb || '', // Only matters if diffrentDomains are used
        },
        {
          code: 'da',
          iso: 'da-DK',
          file: 'da-DK.js',
          name: 'Dansk',
          domain: domainUrls?.da || '', // Only matters if diffrentDomains are used
        },
        {
          code: 'fi',
          iso: 'fi-FI',
          file: 'fi-FI.js',
          name: 'Finska',
          domain: domainUrls?.fi || '', // Only matters if diffrentDomains are used
        },
      ],
      langDir: 'languages/',
      defaultLocale: process.env.DEFAULT_LOCALE,
      lazy: true,
      vueI18n: {
        fallbackLocale: process.env.DEFAULT_LOCALE,
      },
      detectBrowserLanguage: false,
      parsePages: false,
      pages: {
        'checkout/index': {
          sv: '/kassan',
          en: '/checkout',
          da: '/kassen',
          fi: '/kassa',
          nb: '/kassen',
        },
        'account/orders': {
          sv: '/mina-sidor/ordrar',
          en: '/my-account/orders',
          da: '/min-konto/bestillinger',
          fi: '/tilini/tilaukset',
          nb: '/min-konto/bestillinger',
        },
        'account/settings': {
          sv: '/mina-sidor/installningar',
          en: '/my-account/settings',
          da: '/min-konto/indstillinger',
          fi: '/tilini/asetukset',
          nb: '/min-konto/innstillinger',
        },
        'account/balance': {
          sv: '/mina-sidor/saldo',
          en: '/my-account/balance',
          da: '/min-konto/saldo',
          fi: '/tilini/saldo',
          nb: '/min-konto/saldo',
        },
        'favorites/index': {
          sv: '/favoriter',
          en: '/favorites',
          da: '/favoritter',
          fi: '/suosikkeja',
          nb: '/favoritter',
        },
        'brands/index': {
          sv: '/varumarken',
          en: '/brands',
          da: '/varemaerker',
          fi: '/tavaramerkkeja',
          nb: '/varemerker',
        },
        'list/all': {
          sv: '/nyheter',
          en: '/news',
          da: '/nyheder',
          fi: '/uutuudet',
          nb: '/nyheter',
        },
      },
      ...domainSettings,
    },
    /*
     ** PWA module configuration
     */
    pwa: {
      manifest: {
        name: currentChannelSettings.siteName,
        short_name: currentChannelSettings.siteName,
        description: fallbackMeta.description,
        theme_color: currentChannelSettings.theme['accent-color'],
      },
      icon: {
        purpose: 'any',
      },
    },
    /*
     ** Apollo module configuration
     */
    apollo: {
      clientConfigs: {
        default: '~/node_modules/@geins/ralph-ui/plugins/apollo-config.js',
      },
      includeNodeModules: true,
    },
    /*
     ** Style resources configuration
     */
    styleResources: {
      scss: ['./styles/_variables.scss', './styles/_helpers.scss'],
    },
    /*
     ** Polyfills
     */
    polyfill: {
      features: [
        {
          require: 'focus-visible',
        },
      ],
    },
    /*
     ** Nuxt.js router configuration
     */
    router: {
      middleware: ['ralph-default'],
      prefetchLinks: false,
      extendRoutes(routes, resolve) {
        routes.push({
          name: 'pdp',
          path: routePaths.product + '/:alias',
          component: resolve(__dirname, 'pages/product/_alias.vue'),
        });
        routes.push({
          name: 'pdp-level',
          path: routePaths.product + '/(.*)/:alias',
          component: resolve(__dirname, 'pages/product/_alias.vue'),
        });
        routes.push({
          name: 'pdp-sub-level',
          path: routePaths.product + '/(.*)/(.*)/:alias',
          component: resolve(__dirname, 'pages/product/_alias.vue'),
        });
        routes.push({
          name: 'plp',
          path: routePaths.list + '/*',
          component: resolve(__dirname, 'pages/list/_list.vue'),
        });
        routes.push({
          name: 'plp-category',
          path: routePaths.category + '/:category',
          component: resolve(__dirname, 'pages/list/_category.vue'),
        });
        routes.push({
          name: 'plp-sub-category',
          path: routePaths.category + '/(.*)/:category',
          component: resolve(__dirname, 'pages/list/_category.vue'),
        });
        routes.push({
          name: 'plp-brand',
          path: routePaths.brand + '/:brand+',
          component: resolve(__dirname, 'pages/list/_brand.vue'),
        });
        routes.push({
          name: 'plp-discount-campaign',
          path: routePaths.discountCampaign + '/:discountCampaign+',
          component: resolve(__dirname, 'pages/list/_discountCampaign.vue'),
        });
        routes.push({
          name: 'plp-search',
          path: routePaths.search + '/:search',
          component: resolve(__dirname, 'pages/list/_search.vue'),
        });
        routes.push({
          name: 'preview-widgets',
          path: '/preview-widgets',
          component: resolve(__dirname, 'pages/content/_preview.vue'),
        });
        routes.push({
          name: 'content',
          path: '/:alias',
          component: resolve(__dirname, 'pages/content/_alias.vue'),
        });
        // Adding routes with translated paths is done through nuxt-i18n config above
      },
    },
    /*
     ** Setup of global $config variables
     */
    publicRuntimeConfig: {
      /* ***************** */
      /* **** GLOBAL ***** */
      /* ***************** */
      ralphLog: {
        onlyInClient: true,
        all: ralphEnv === 'dev',
        api: false,
        events: false,
        checkout: false,
        warnings: false,
      },
      ralphEnv,
      baseUrl: process.env.BASE_URL,
      imageServer: process.env.IMAGE_SERVER,
      authEndpoint: process.env.AUTH_ENDPOINT,
      signEndpoint: process.env.SIGN_ENDPOINT.replace(
        '{API_KEY}',
        process.env.API_KEY,
      ),
      apiKey: process.env.API_KEY,
      apiEndpoint: process.env.API_ENDPOINT,
      fallbackChannelId: process.env.FALLBACK_CHANNEL_ID,
      fallbackMarketAlias: process.env.FALLBACK_MARKET_ALIAS,
      ...marketSettings,
      currentChannelSettings,
      channelSettings,
      fallbackMarkets,
      imageSizes,
      useStartPage: false,
      customerServiceEmail: 'info@geins.io',
      customerServicePhone: '+46 123 23 43 45',
      breakpoints: {
        tablet: 768,
        laptop: 1024,
        desktop: 1200,
        desktopBig: 1440,
      },
      siteTopThreshold: 10,
      socialMediaLinks: [
        {
          icon: 'facebook',
          title: 'Facebook',
          link: 'https://www.facebook.com',
        },
        {
          icon: 'instagram',
          title: 'Instagram',
          link: 'https://www.instagram.com',
        },
      ],
      customerTypesToggle: true,
      customerTypes: [
        {
          type: 'PERSON',
          vat: true,
        },
        {
          type: 'ORGANIZATION',
          vat: false,
        },
      ],
      routePaths,
      statesToPersist: [
        'favorites',
        'customerType',
        'vatIncluded',
        'list/relocateAlias',
        'list/relocatePage',
      ],
      /* ****************** */
      /* **** WIDGETS ***** */
      /* ****************** */
      bannerWidgetPrimaryColor: '#000000',
      bannerWidgetSecondaryColor: '#FFFFFF',
      productListWidgetArrowIconName: 'chevron',
      productListRowSize: 4,
      widgetImageSizes: {
        full: '(min-width: 1920px) 1920px, 97vw',
        half: '(min-width: 1920px) 950px, (min-width: 768px) 48vw, 97vw',
        third: '(min-width: 1920px) 627px, (min-width: 768px) 32vw, 97vw',
        quarter: '(min-width: 1920px) 465px, (min-width: 768px) 24vw, 97vw',
      },
      widgetImageSizesFullWidth: {
        full: '100vw',
        half: '(min-width: 768px) 49vw, 100vw',
        third: '(min-width: 768px) 33vw, 100vw',
        quarter: '(min-width: 768px) 24vw, 100vw',
      },
      /* *********************** */
      /* **** PRODUCT LIST ***** */
      /* *********************** */
      productListDefaultSort: 'LATEST',
      productListPageSize: 20,
      productListScrollSize: {
        phone: 2,
        tablet: 3,
        laptop: 4,
        desktop: 4,
        desktopBig: 4,
      },
      showCategoryFilter: true,
      showCategoryTreeViewFilter: true,
      showBrandsFilter: true,
      showSkuFilter: true,
      showPriceFilter: true,
      showDiscountFilter: true,
      customSortRoutes: [],
      productCardBuyButton: false,
      /* ****************** */
      /* **** PRODUCT ***** */
      /* ****************** */
      productImageRatio: 1 / 1,
      productStockFewLeftLimit: 6,
      productSchemaOptions: {
        productSkuLabelIsSize: true,
        productDescriptionField: 'text1',
        schemaImageSize: '700f700', // Make sure this is a valid product image size
        extraOfferProperties: {
          itemCondition: 'https://schema.org/NewCondition',
        },
      },
      productShowRelated: false,
      showProductReviewSection: false,
      showStarsInProductReviewForm: true,
      preLoadedProductImageSizes: ['1000f1000'],
      /* ******************** */
      /* ***** CHECKOUT ***** */
      /* ******************** */
      checkout: {
        promoCodes: true,
        shippingAddress: true,
        identityNumber: true,
        entryCode: true,
        message: true,
        defaultPaymentId: 23,
        defaultShippingId: null,
        showMultipleMarkets: true,
        useInternalShipping: false,
      },
      /* ******************** */
      /* ******* CART ******* */
      /* ******************** */
      cart: {
        hiddenSkuValues: ['-', 'One size'],
        quantityChangerType: 'default', // Options: `default`, `round`, `stacked`
      },
      /* ******************** */
      /* ******* USER ******* */
      /* ******************** */
      user: {
        gender: false,
        country: false,
      },
    },
    render: {
      asyncScripts: true,
      http2: {
        push: true,
      },
    },
    server: {
      timing: {
        total: true,
      },
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
                corejs: { version: 3 },
              },
            ],
          ];
        },
      },
      transpile: ['@geins/ralph-ui'],
      cache: true,
      splitChunks: {
        pages: true,
        vendor: true,
        commons: true,
        runtime: true,
        layouts: true,
      },
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
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
      loaders: {
        vue: { cacheBusting: false, prettify: false },
        scss: { sourceMap: false },
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
            'node_modules/@geins/ralph-ui/styles/components/',
          ),
          // Then for mixins
          path.resolve(__dirname, 'components/mixins/'),
          path.resolve(
            __dirname,
            'node_modules/@geins/ralph-ui/components/mixins/',
          ),
          // Then for graphql queries
          path.resolve(__dirname, 'graphql/'),
          path.resolve(__dirname, 'node_modules/@geins/ralph-ui/graphql/'),
          // Then the UI store
          path.resolve(__dirname, 'node_modules/@geins/ralph-ui/store/'),
          // Then the UI middleware
          path.resolve(__dirname, 'node_modules/@geins/ralph-ui/middleware/'),
        ];
        if (isDev) {
          config.devtool = 'source-map';
        }
      },
    },
    /*
     ** Dev mode setting
     */
    dev: process.env.NODE_ENV !== 'production',
  };
};
