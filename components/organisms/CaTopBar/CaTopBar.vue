<template>
  <div class="ca-top-bar" :class="{ 'ca-top-bar--undistracted': undistracted }">
    <CaContainer class="ca-top-bar__container">
      <CaTopBarNavigation
        v-show="!undistracted"
        class="only-computer"
        menu-location-id="top-bar"
      />
      <div class="ca-usp-block ca-top-bar__usps only-computer">
        <CaIconAndText class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_1') }}
        </CaIconAndText>
        <CaIconAndText class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_2') }}
        </CaIconAndText>
        <CaIconAndText class="ca-top-bar__usp" icon-name="check-circle">
          {{ $t('USP_3') }}
        </CaIconAndText>
      </div>
      <div class="ca-top-bar__usp only-mobile">{{ $t('USP_TEXT') }}</div>
      <CaMarketSelectorButton
        v-show="!undistracted"
        class="ca-top-bar__lang-switcher only-computer"
      />
      <button
        v-if="!$store.getters['auth/authenticated']"
        v-show="!undistracted"
        type="button"
        class="ca-top-bar__link ca-top-bar__link--login only-computer"
        @click="
          $store.commit('contentpanel/open', {
            name: 'account',
            frame: 'login'
          })
        "
      >
        <CaIconAndText icon-name="user">
          {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
        </CaIconAndText>
      </button>
      <NuxtLink
        v-else
        v-show="!undistracted"
        class="ca-top-bar__link ca-top-bar__link--login only-computer"
        :to="$getPath('account-orders')"
      >
        <CaIconAndText icon-name="user">
          {{ $t('ACCOUNT_TITLE') }}
        </CaIconAndText>
      </NuxtLink>

      <CaCustomerTypeToggle
        v-if="$config.customerTypesToggle"
        v-show="!undistracted"
        class="ca-top-bar__customer-type-toggle only-computer"
      />
    </CaContainer>
  </div>
</template>
<script>
/*
  A top bar component that is used on all pages.

  props:
    undistracted: Boolean
      If true, this is used by rthe undistrected layout and some elements might want to be hidden
*/
export default {
  name: 'CaTopBar',
  mixins: [],
  props: {
    undistracted: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-top-bar';
</style>
