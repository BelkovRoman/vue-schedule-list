<template>
  <div class="controlPanel">
    <div class="controlPanel__item">
      <customButton @handleClick="() => changeModalVisibility()">
        Добавить дисциплину
      </customButton>
    </div>
    <div class="controlPanel__item">
      <customButton
        :isDisabled="!isSomeItemSelected"
        @handleClick="() => removeDiscipline()"
      >
        Удалить дисциплину
      </customButton>
    </div>
    <div class="controlPanel__item">
      <customButton
        :isDisabled="!isDataEdited"
        @handleClick="() => saveChanges()"
      >
        Сохранить изменения
      </customButton>
    </div>
  </div>
</template>

<script>
import CustomButton from "./shared/Button.vue";

export default {
  components: {
    customButton: CustomButton,
  },
  computed: {
    isSomeItemSelected() {
      return this.$store.getters.isSomeItemSelected;
    },
    intervals() {
      return this.$store.getters.getIntervals;
    },
    isDataEdited() {
      return this.$store.getters.isDataEdited;
    },
    records() {
      return this.$store.getters.getRecords;
    },
  },
  methods: {
    changeModalVisibility() {
      this.$store.dispatch('changeModalVisibility')
    },
    removeDiscipline() {
      this.$store.dispatch('removeDiscipline')
    },
    saveChanges() {
      if (this.isDataEdited) {
        const rev = this.$store.getters.getRev;

        this.$store.dispatch('saveChanges', {
          records: this.records,
          rev: rev
        })
      }
    }
  },
};
</script>

<style lang="sass" scoped>
  .controlPanel {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;

    &__item {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
