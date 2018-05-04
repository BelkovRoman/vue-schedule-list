<template>
  <div
    class="button"
    :class="{button_disabled: isDisabled}"
    @click="action"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    action() {
      if (!this.isDisabled) {
        this.$emit('handleClick')
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 150px;
  padding: 5px 10px;
  background-color: #c3c3c3;
  cursor: pointer;

  &_disabled {
    background-color: #989898;
    cursor: not-allowed
  }

  &:hover {
    background-color: f5f5f5;
  }
}
</style>
