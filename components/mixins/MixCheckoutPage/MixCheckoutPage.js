export default {
  name: 'MixCheckoutPage',
  mixins: [],
  props: {},
  data: () => ({
    avardaScriptLoaded: false
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
  head() {
    return {
      script: [
        {
          hid: 'avarda',
          src:
            'https://avdonl0s0checkout0fe.blob.core.windows.net/frontend/static/js/main.js',
          callback: () => {
            this.avardaScriptLoaded = true;
          }
        }
      ]
    };
  }
};
