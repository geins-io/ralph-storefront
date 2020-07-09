<template>
  <div class="ca-checkout">
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="klarnaResponse.html_snippet" />
  </div>
</template>

<script>
// import Logo from '@/components/Logo.vue';
export default {
  name: 'FrontPage',
  components: {},
  fetch({ store }) {
    store.commit('increment');
  },
  asyncData() {
    return fetch('http://localhost:3000/api/klarna-checkout-orders/')
      .then(response => response.json())
      .then(data => {
        return { klarnaResponse: data };
      });
  },
  data: () => ({
    klarnaResponse: {}
  }),

  mounted() {
    this.initializeKlarnaScript();
  },
  methods: {
    fetchKlarnaData() {
      // replace `getPost` with your data fetching util / API wrapper
      fetch('http://localhost:3000/api/klarna-checkout-orders/')
        .then(response => response.json())
        .then(data => (this.klarnaResponse = data));
    },
    initializeKlarnaScript() {
      const checkoutContainer = document.getElementById(
        'klarna-checkout-container'
      );
      const scriptsTags = checkoutContainer.getElementsByTagName('script');
      for (let i = 0; i < scriptsTags.length; i++) {
        const parentNode = scriptsTags[i].parentNode;
        const newScriptTag = document.createElement('script');
        newScriptTag.type = 'text/javascript';
        newScriptTag.text = scriptsTags[i].text;
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
    }
  }
};
</script>

<style lang="scss">
.site-title {
  font-size: $font-size-xxl;
  text-align: center;
  font-weight: $font-weight-bold;
}
.site-preamble {
  max-width: 450px;
  margin: $px20 auto;
  font-size: $font-size-l;
  text-align: center;
}

.categories {
  ul {
    margin-left: 10px;
  }
}
</style>
