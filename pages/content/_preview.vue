<template>
  <CaWidgetArea
    v-if="isAuthenticated"
    preview
    @dataFetched="$store.dispatch('loading/end')"
  />
</template>

<script>
/*
  Renders a widget area preview page.
*/
import { mapState } from 'vuex';
export default {
  middleware: 'authenticated',
  name: 'WidgetPreview',
  data: () => ({
    isAuthenticated: false
  }),
  computed: {
    ...mapState(['auth'])
  },
  watch: {
    async 'auth.client'(val) {
      if (val && this.$route.query.loginToken) {
        if (this.$store.getters['auth/authenticated']) {
          await this.$store.dispatch('auth/logout');
        }
        // remove cart for new spoofed user
        this.$store.dispatch('cart/reset');
        this.auth.client.setTokenData({
          token: this.$route.query.loginToken,
          maxAge: 3600
        });
        this.$store.dispatch('auth/update', {
          username: 'preview-user@geins.io',
          rememberUser: false
        });
        if (this.$route.query.redirect) {
          this.$router.push(this.$getPath('index'));
        } else {
          this.isAuthenticated = true;
        }
      }
    }
  },
  methods: {},
  meta: {
    pageType: 'Preview Page'
  }
};
</script>
