<template>
  <div class="ca-front-page">
    <CaContainer>
      <h1 class="site-title">ralph / front page</h1>
      <p class="site-preamble">
        This is the front page of Ralph. In a distant future, awesome front page
        content will be displayed here.
      </p>
    </CaContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import Logo from '@/components/Logo.vue';
import { CaContainer } from '@ralph/ralph-ui';
export default {
  name: 'FrontPage',
  components: {
    CaContainer
  },
  fetch({ store }) {
    store.commit('increment');
  },
  data() {
    return {
      message: process.env.VUE_APP_TITLE
    };
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    },
    ...mapState(['counter'])
  },
  methods: {
    increment() {
      this.$store.commit('increment');
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
</style>
