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
import commitResetMutation from 'user/pw-reset-commit.graphql';
export default {
  name: 'ResetPasswordPage',
  data: vm => ({
    loading: false,
    password: '',
    passwordConfirm: '',
    resetKey: '',
    currentFeedback: {
      type: 'info',
      message: ''
    },
    feedback: {
      passwordChanged: {
        type: 'success',
        message: vm.$t('ACCOUNT_FEEDBACK_PASSWORD_CHANGED')
      },
      notValid: {
        type: 'error',
        message: vm.$t('ACCOUNT_FEEDBACK_FIELDS_NOT_VALID')
      },
      error: {
        type: 'error',
        message: vm.$t('FEEDBACK_ERROR')
      },
      resetKeyNotValid: {
        type: 'error',
        message: vm.$t('ACCOUNT_FEEDBACK_RESET_KEY_NOT_VALID')
      }
    }
  }),
  computed: {},
  created() {},
  mounted() {
    this.resetKey = this.$route.query.resetKey;
  },
  methods: {
    async commitReset() {
      if (
        this.$refs.inputPassword.validateInput() &&
        this.$refs.inputPasswordConfirm.validateInput()
      ) {
        this.loading = true;
        const password = await this.$store.state.auth.client.digest(
          this.password
        );
        this.$apollo
          .mutate({
            mutation: commitResetMutation,
            variables: {
              resetKey: this.resetKey,
              password
            },
            errorPolicy: 'all',
            fetchPolicy: 'no-cache'
          })
          .then(result => {
            this.loading = false;
            if (result.errors) {
              this.showFeedback(this.feedback.error);
            } else if (result.data.commitReset) {
              this.resetFields();
              this.showFeedback(this.feedback.passwordChanged);
            } else {
              this.showFeedback(this.feedback.resetKeyNotValid);
            }
          })
          .catch(error => {
            // pass the error response to the error component
            this.$nuxt.error({ statusCode: 500, message: error });
          });
      } else {
        this.showFeedback(this.feedback.notValid);
      }
    },
    // @vuese
    // Used to hide feedback if field becomes valid after error
    // @arg Valid (Boolean)
    checkValid(valid) {
      if (valid) {
        this.$refs.feedback.hide();
      }
    },
    // @vuese
    // Show feedback
    // @arg Feedback (Object)
    showFeedback(feedback) {
      this.currentFeedback = feedback;
      this.$refs.feedback.show();
    },
    // @vuese
    // Reset all fields
    resetFields() {
      this.password = '';
      this.passwordConfirm = '';
    }
  },
  meta: {
    pageType: 'Reset password Page'
  }
};
</script>

<style lang="scss">
.ca-reset-password {
  text-align: center;
  width: rem-calc(400px);
  max-width: 100%;
  margin: rem-calc(30px) auto rem-calc(80px);
  @include bp(tablet) {
    margin: rem-calc(60px) auto rem-calc(130px);
  }
  &__title {
    font-weight: $font-weight-bold;
    font-size: $font-size-xl;
  }
  &__text {
    font-size: $font-size-m;
    margin: $px10 0 $px16;
  }
  &__button {
    margin: $px16 0 0;
  }
}
</style>
