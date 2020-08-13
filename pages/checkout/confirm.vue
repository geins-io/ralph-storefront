<template>
  <div class="ca-checkout-confirm-page">
    <CaContainer>
      <!-- eslint-disable vue/no-v-html -->
      <!-- <div v-html="klarnaResponse.html_snippet" /> -->
      <client-only>
        <h1>{{ $store.cartId }}</h1>
      </client-only>
    </CaContainer>
  </div>
</template>

<script>
import { CaContainer } from '@ralph/ralph-ui';
export default {
  name: 'CheckoutConfirmPage',
  components: { CaContainer },
  // asyncData() {
  //   return fetch('http://localhost:3000/api/klarna-checkout-confirm/')
  //     .then(response => response.json())
  //     .then(data => {
  //       return { klarnaResponse: data };
  //     });
  // },
  data: () => ({
    klarnaResponse: {}
  }),

  mounted() {
    // this.initializeKlarnaScript();
  },
  methods: {
    // fetchKlarnaData() {
    //   // replace `getPost` with your data fetching util / API wrapper
    //   fetch('http://localhost:3000/api/klarna-checkout-confirm/')
    //     .then(response => response.json())
    //     .then(data => (this.klarnaResponse = data));
    // },
    // initializeKlarnaScript() {
    //   const checkoutContainer = document.getElementById(
    //     'klarna-checkout-container'
    //   );
    //   const scriptsTags = checkoutContainer.getElementsByTagName('script');
    //   for (let i = 0; i < scriptsTags.length; i++) {
    //     const parentNode = scriptsTags[i].parentNode;
    //     const newScriptTag = document.createElement('script');
    //     newScriptTag.type = 'text/javascript';
    //     newScriptTag.text = scriptsTags[i].text;
    //     parentNode.removeChild(scriptsTags[i]);
    //     parentNode.appendChild(newScriptTag);
    //   }
    // }
  }
};
</script>

<style lang="scss"></style>
