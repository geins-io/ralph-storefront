<template>
  <div class="ca-logo">
    <img class="ca-logo__img" :src="filename" />
    <img class="ca-logo__img" :src="filename" />
  </div>
</template>
<script>
import { CaLogo } from '@ralph/ralph-ui';
export default {
  name: 'Logo',
  mixins: [CaLogo]
};
</script>
<style lang="scss">
.ca-logo {
  background: #fc0;
  &__img {
    width: 300px;
  }
}
</style>
