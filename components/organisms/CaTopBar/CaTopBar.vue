<template>
  <div class="ca-top-bar">
    <div class="ca-container ca-top-bar__container">
      <a class="ca-top-bar__lang-switcher only-desktop" href="javascript:;">
        <ca-flag country="se" shape="circle" />
        Sverige
      </a>
      <nuxt-link
        class="ca-top-bar__link ca-top-bar__link--customer-service only-desktop"
        to="/"
      >
        {{ $t('CUSTOMER_SERVICE') }}
      </nuxt-link>
      <div class="ca-usp-block ca-top-bar__usps only-desktop">
        <ca-icon-and-text class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_1') }}
        </ca-icon-and-text>
        <ca-icon-and-text class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_2') }}
        </ca-icon-and-text>
        <ca-icon-and-text class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_3') }}
        </ca-icon-and-text>
      </div>
      <div class="ca-top-bar__usp only-mobile">{{ $t('USP_TEXT') }}</div>
      <a
        class="ca-top-bar__link ca-top-bar__link--login only-desktop"
        href="javascript:;"
      >
        <ca-icon-and-text icon-name="user">
          {{ $t('LOG_IN_LINK') }}
        </ca-icon-and-text>
      </a>
      <ca-vat-toggle class="only-desktop" />
    </div>
  </div>
</template>
<script>
import { CaIconAndText, CaFlag, CaVatToggle } from '@ralph/ralph-ui';
export default {
  name: 'CaTopBar',
  components: {
    CaIconAndText,
    CaFlag,
    CaVatToggle
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
<style lang="scss">
$top-bar-height: rem-calc(20px);
$top-bar-height-desktop: rem-calc(36px);
.ca-top-bar {
  background: $c-topbar-bg;
  font-size: $font-size-xs;
  &__container {
    display: flex;
    height: $top-bar-height;
    line-height: $top-bar-height;
    justify-content: center;
    @include bp(laptop) {
      height: $top-bar-height-desktop;
      line-height: $top-bar-height-desktop;
      justify-content: space-between;
    }
  }
  &__usps {
    @include bp(desktop) {
      @include calign;
    }
  }
  &__usp {
    @include bp(laptop) {
      margin: 0 $px16;
    }
  }
  &__link {
    &--login {
      margin: 0 $px24 0 auto;
    }
    &--customer-service {
      margin: 0 auto 0 $px24;
    }
  }
  a {
    text-decoration: none;
  }
  .ca-vat-toggle {
    display: flex;
    &__link {
      &:not(:last-child) {
        margin-right: $px8;
      }
      &--active {
        font-weight: $font-weight-bold;
      }
    }
  }
}
</style>
