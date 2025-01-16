export default {
  name: 'MixCheckoutPage',
  data: () => ({
    avardaScriptLoaded: false,
  }),
  computed: {
    stage() {
      return this.$config.ralphEnv === 'prod' ? '' : 'stage.';
    },
  },
  mounted() {
    if (window.avardaCheckoutInit) {
      this.avardaScriptLoaded = true;
    }
  },
  head() {
    const avardaBaseUrl = `https://${this.stage}checkout-cdn.avarda.com/cdn/static/js/main.js`;
    return {
      script: [
        {
          hid: 'avarda',
          src: `${avardaBaseUrl}?ts=${Date.now()}`,
          callback: () => {
            this.avardaScriptLoaded = true;
          },
        },
      ],
    };
  },
};
