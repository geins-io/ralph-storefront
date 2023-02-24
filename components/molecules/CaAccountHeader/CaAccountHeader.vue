<template>
  <div class="ca-account-header">
    <h1 class="ca-account-header__title">
      {{ title }}
    </h1>
    <CaButton
      color="secondary"
      size="s"
      class="ca-account-header__log-out"
      @clicked="logout"
    >
      <CaIconAndText icon-name="log-out">
        {{ $t('LOG_OUT') }}
      </CaIconAndText>
    </CaButton>
    <nav class="ca-account-header__nav">
      <NuxtLink
        v-for="(item, index) in navItems"
        :key="index"
        :to="$getPath(item.path)"
        class="ca-account-header__nav-item"
        :class="{
          'ca-account-header__nav-item--current':
            $getPath(item.path) === $route.path
        }"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>
  </div>
</template>
<script>
/*
  CaAccountHeader is a reusable component that displays a title, a log out button and a navigation menu.
  It receives two props:
  - title: a string representing the title
  - navItems: an array of objects representing the navigation items
  It also dispatches the 'auth/logout' action when the log out button is clicked.
*/
export default {
  name: 'CaAccountHeader',
  mixins: [],
  props: {
    title: {
      type: String,
      required: true
    },
    navItems: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push({ path: this.$getPath('index') });
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-account-header';
</style>
