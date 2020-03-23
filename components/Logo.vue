<template>
  <ca-logo />
</template>

<script>
import { CaLogo } from "@ralph/ralph-ui";
export default {
  components: { CaLogo },
  computed: {},
  mounted() {
    this.calculateStuff();
  },
  methods: {
    calculateStuff() {
      let nr = 1;
      nr += 2;
      return nr;
    }
  }
};
</script>
