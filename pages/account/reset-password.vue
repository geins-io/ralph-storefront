<template>
  <div class="ca-reset-password-page">
    <CaContainer>
      <div class="ca-reset-password">
        <h1 class="ca-reset-password__title">{{ $t('RESET_PASSWORD') }}</h1>
        <p class="ca-reset-password__text">
          {{ $t('ACCOUNT_RESET_PASSWORD_PAGE_TEXT') }}
        </p>
        <LazyCaFeedback
          ref="feedback"
          class="ca-account-panel__feedback"
          :type="currentFeedback.type"
          :message="currentFeedback.message"
        />
        <input v-show="false" id="email" type="text" />
        <CaInputText
          id="password"
          ref="inputPassword"
          v-model="password"
          type="password"
          :label="$t('NEW_PASSWORD')"
          validate="passwordStrength"
          autocomplete="new-password"
          :error-message="$t('PASSWORD_ERROR_WEAK')"
          @validation="checkValid"
          @keyup.enter="commitReset"
        />
        <CaInputText
          id="password-confirm"
          ref="inputPasswordConfirm"
          v-model="passwordConfirm"
          type="password"
          :label="$t('NEW_PASSWORD_CONFIRM')"
          validate="passwordMatch"
          autocomplete="new-password"
          :password-to-match="password"
          :error-message="$t('PASSWORD_ERROR_NO_MATCH')"
          @validation="checkValid"
          @keyup.enter="commitReset"
        />
        <CaButton
          class="ca-reset-password__button"
          type="full-width"
          :loading="loading"
          @clicked="commitReset"
        >
          {{ $t('RESET_PASSWORD') }}
        </CaButton>
      </div>
    </CaContainer>
  </div>
</template>

<script>
/*
  Renders the reset password page.
*/
import MixResetPassword from 'MixResetPassword';
export default {
  name: 'ResetPasswordPage',
  mixins: [MixResetPassword],
  meta: {
    pageType: 'Reset password Page',
  },
};
</script>

<style lang="scss">
@import './styles/pages/reset-password-page';
</style>
