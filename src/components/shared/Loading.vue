<template>
  <div class="container">
    <preloader v-if="isFetching"/>
    <slot v-else/>
  </div>
</template>

<script>
import Preloader from './Preloader.vue'

export default {
  components: {
    preloader: Preloader,
  },
  computed: {
    isFetching() {
      return this.$store.getters.isFetching
    }
  },
};
</script>

<style lang="sass" scoped>
.container {
  width: 800px;
  padding-top: 60px;
  margin-right: auto;
  margin-left: auto;
}
</style>
