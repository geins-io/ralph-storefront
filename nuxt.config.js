export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    // Doc: https://github.com/nuxt-community/stylelint-module
    "@nuxtjs/stylelint-module"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/pwa",
    [
      "nuxt-i18n",
      {
        locales: ["en", "es"],
        defaultLocale: "en",
        vueI18n: {
          fallbackLocale: "en",
          messages: {
            en: {
              greeting: "Hello world!"
            },
            es: {
              greeting: "¡Hola mundo!"
            }
          }
        }
      }
    ]
  ],
  /*
   ** Build configuration
   */
  build: {
    transpile: ["@ralph/ralph-ui", "@storefront-ui/shared"],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
