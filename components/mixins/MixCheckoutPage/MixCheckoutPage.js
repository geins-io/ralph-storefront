export default {
  name: 'MixCheckoutPage',
  mixins: [],
  props: {},
  data: () => ({
    avardaScriptLoaded: false
  }),
  computed: {
    env() {
      return process.env.NODE_ENV === 'production' ? 'p' : 's';
    }
  },
  watch: {},
  mounted() {
    this.$store.dispatch('initVoyado');
  },
  methods: {},
  head() {
    return {
      script: [
        {
          hid: 'avarda',
          src: `https://avdonl0${this.env}0checkout0fe.blob.core.windows.net/frontend/static/js/main.js`,
          callback: () => {
            this.avardaScriptLoaded = true;
          }
        }
      ]
    };
  }
};
