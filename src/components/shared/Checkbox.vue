<template>
  <input
    class="checkbox"
    type="checkbox"
    :checked="isSelected"
    @change="$emit('handleClick')"
  >
</template>

<script>
export default {
  props: {
    isSelected: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'checkbox'
    }
  }
};
</script>

<style scoped>
.checkbox {
  width: 20px;
  height: 20px;
}
</style>
