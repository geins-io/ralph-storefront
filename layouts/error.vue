<template>
  <CaContainer class="ca-error-page" width="slim">
    <h1 v-if="error.statusCode === 404" class="ca-error-page__title">
      {{ $t('ERROR_PAGE_404_TITLE') }}
    </h1>
    <h1 v-else class="ca-error-page__title">{{ $t('ERROR_PAGE_TITLE') }}</h1>
    <CaButton class="ca-error-page__button" href="/">
      {{ $t('ERROR_PAGE_BUTTON') }}
    </CaButton>
  </CaContainer>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.$store.dispatch('loading/end');
  }
};
</script>
<style lang="scss">
.ca-error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 $px40;
  &__title {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    margin: $px10 0 $px20;
  }
}
</style>
