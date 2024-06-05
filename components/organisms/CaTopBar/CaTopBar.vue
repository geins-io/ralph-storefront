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
      <div class="ca-top-bar__group">
        <CaMarketSelectorButton
          v-if="$store.state.channel.markets.length > 1"
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
              frame: 'login',
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
          v-if="$config.public.customerTypesToggle"
          v-show="!undistracted"
          class="ca-top-bar__customer-type-toggle only-computer"
        />
      </div>
    </CaContainer>
  </div>
</template>
<script>
/*
  The component for the top bar of the page, included in the header.

  props:
    undistracted: Boolean
      Set to true if used in the undistracted layout. If true, some elements might want to be hidden
*/
export default {
  name: 'CaTopBar',
  mixins: [],
  props: {
    undistracted: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'organisms/ca-top-bar';
</style>
