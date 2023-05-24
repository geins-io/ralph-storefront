export default {
  name: 'MixCheckoutPage',
  mixins: [],
  props: {},
  data: () => ({
    avardaScriptLoaded: false
  }),
  computed: {
    stage() {
      return this.$config.ralphEnv === 'prod' ? '' : 'stage.';
    }
  },
  watch: {},
  mounted() {
    this.$store.dispatch('initVoyado');
    if (window.avardaCheckoutInit) {
      this.avardaScriptLoaded = true;
    }
  },
  methods: {},
  head() {
    return {
      script: [
        {
          hid: 'avarda',
          src: `https://${this.stage}checkout-cdn.avarda.com/cdn/static/js/main.js`,
          callback: () => {
            this.avardaScriptLoaded = true;
          }
        }
      ]
    };
  }
};
