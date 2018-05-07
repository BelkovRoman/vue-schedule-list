<template>
  <div class="intervals">
    <h2 class="intervals__title">
      Интервалы
    </h2>
    <div
      class="intervals__content"
      v-on-clickaway="deselectTime"
    >
      <div
        class="intervals__item"
        v-for="(item, index) in intervals"
        @click="() => selectInterval(item.value, item.isDisabled)"
        :key="`interval_${index}`"
        :class="{intervals__item_disabled: item.isDisabled,
          intervals__item_enabled: !item.isDisabled,
          intervals__item_highlighted: isItemHighlighted(item)}"
        >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
export default {
  directives: {
    onClickaway: onClickaway,
  },
  computed: {
    intervals() {
      return this.$store.getters.getIntervals;
    },
    isSomeItemSelected() {
      return this.$store.getters.isSomeItemSelected;
    },
    selectedDiscipline() {
      return this.$store.getters.getSelectedDiscipline;
    },
    selectedTime() {
      return this.$store.getters.getSelectedTime;
    },
  },
  methods: {
    selectInterval(value, isDisabled) {
      if (this.isSomeItemSelected) {
        this.$store.dispatch('setInterval', value)
        this.$store.dispatch('selectDiscipline', null)
        this.$store.dispatch('selectTime', null)
      } else if (isDisabled) {
        this.$store.dispatch('selectTime', value)
      }
    },
    deselectTime() {
      if (this.selectedTime) {
        this.$store.dispatch('deselectTime')
      }
    },
    isItemHighlighted(item) {
      return item.value === this.selectedDiscipline &&
        this.isSomeItemSelected
    }
  },
};
</script>

<style lang="sass" scoped>
  .intervals {
    &__title {
      margin-top: 0;
    }
    &__content {
      display: flex;
      width: 210px;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    &__item {
      width: 50px;
      padding: 5px;
      margin-right: 5px;
      margin-bottom: 5px;
      border: 3px solid transparent;
      &_enabled {
        background-color: #c3c3c3;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
        }
      }
      &_disabled {
        background-color: #989898;
      }
      &_highlighted {
        border-color: red;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
</style>
