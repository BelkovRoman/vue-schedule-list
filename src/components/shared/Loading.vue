<template>
  <div class="container">
    <div v-if="isFetching" class="loading">
      <div class="loading__item loading__item_first"/>
      <div class="loading__item loading__item_second"/>
      <div class="loading__item loading__item_third"/>
    </div>
    <slot v-else/>
  </div>
</template>

<script>
export default {
  computed: {
    isFetching() {
      return this.$store.getters.isFetching
    }
  }
};
</script>

<style lang="sass" scoped>
.container {
  width: 800px;
  padding-top: 60px;
  margin-right: auto;
  margin-left: auto;
}

.loading {
  display: flex;
  justify-content: space-between;
  width: 80px;
  margin-top: 40px;
  margin-right: auto;
  margin-left: auto;

  &__item {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: black;
    margin-right: 10px;
    animation: loading 1s infinite linear;

    &_first {
      animation-delay: 0.3s;
    }

    &_second {
      animation-delay: 0.6s;
    }

    &_third {
      animation-delay: 0.9s;
    }
  }
}

@keyframes loading {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(0.5);
  }
}
</style>
