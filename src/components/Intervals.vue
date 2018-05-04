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
        @click="() => selectInterval(item.value)"
        v-for="(item, index) in intervals"
        :key="`interval_${index}`"
        :class="{intervals__item_disabled: item.isDisabled || !isSomeItemSelected,
          intervals__item_enabled: !item.isDisabled,
          intervals__item_highlighted: item.value === selectedDiscipline.timeStart}"
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
    selectInterval(value) {
      this.$store.dispatch('selectTime', value)

      if (this.isSomeItemSelected) {
        this.$store.dispatch('setIntervals', value)
      }
    },
    deselectTime() {
      if (this.selectedTime) {
        this.$store.dispatch('deselectTime')
      }
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
        cursor: not-allowed;
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
