<template>
  <div class="ca-front-page">
    <CaContainer>
      <CaWidgetArea family="Frontpage" area-name="The front page area" />
    </CaContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import Logo from '@/components/Logo.vue';
import { CaContainer, CaWidgetArea } from '@ralph/ralph-ui';
export default {
  name: 'FrontPage',
  components: {
    CaContainer,
    CaWidgetArea
  },
  fetch({ store }) {
    store.commit('increment');
  },
  data: () => ({}),
  computed: {
    ...mapState(['counter'])
  },
  methods: {}
};
</script>

<style lang="scss">
.site-title {
  font-size: $font-size-xxl;
  text-align: center;
  font-weight: $font-weight-bold;
}
.site-preamble {
  max-width: 450px;
  margin: $px20 auto;
  font-size: $font-size-l;
  text-align: center;
}

.categories {
  ul {
    margin-left: 10px;
  }
}
</style>
