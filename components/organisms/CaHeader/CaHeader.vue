<template>
  <div class="ca-header">
    <CaTopBar />
    <CaContainer class="ca-header__container">
      <a href="javascript:;" class="ca-header__nav-toggle only-mobile">
        <CaIcon class="ca-header__nav-toggle-icon" name="menu" />
      </a>
      <CaLogo class="ca-header__logo" />
      <CaFavorites class="ca-header__favorites" />
      <CaMiniCart class="ca-header__cart" />
    </CaContainer>
  </div>
</template>
<script>
import {
  CaContainer,
  CaIcon,
  CaLogo,
  CaMiniCart,
  CaFavorites
} from '@ralph/ralph-ui';
import CaTopBar from '@/components/organisms/CaTopBar/CaTopBar';

export default {
  name: 'CaHeader',
  components: {
    CaTopBar,
    CaContainer,
    CaIcon,
    CaLogo,
    CaMiniCart,
    CaFavorites
  },
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.ca-header {
  background: $c-header-bg;

  &__container {
    height: rem-calc(50px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include bp(laptop) {
      justify-content: flex-end;
      height: rem-calc(60px);
    }
  }

  &__nav-toggle {
    margin-right: auto;
    display: flex;
    align-items: center;
  }
  &__nav-toggle-icon {
    font-size: 28px;
  }

  &__logo {
    @include calign;
    width: 120px;
  }

  ::v-deep .ca-notification-badge {
    border: 1px solid $c-header-bg;
  }
}
</style>
