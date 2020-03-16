<template>
  <SfCircleIcon
    icon="profile"
    icon-size="20px"
    icon-color="black"
    class="sf-header__circle-icon a-account-icon"
    role="button"
    aria-label="account"
    :class="{ 'sf-header__circle-icon--is-active': true }"
    :aria-pressed="true ? 'true' : 'false'"
    @click="goToAccount"
  />
</template>

<script>
import { SfCircleIcon } from "@storefront-ui/vue";
export default {
  components: { SfCircleIcon },
  computed: {},
  methods: {}
};
</script>
