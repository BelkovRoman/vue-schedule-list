<template>
  <div class='disciplines'>
    <h2 class='disciplines__title'>
      Дисциплины
    </h2>
    <table class='disciplines__table'>
      <thead>
        <tr class="discipline">
          <td>
            <customCheckbox
              :isSelected="isAllSelected"
              :id="'main'"
              @handleClick="() => selectAllItems(isAllSelected)"
            />
          </td>
          <td>
            Время
          </td>
          <td>
            Наименование
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="discipline"
          v-for="(item, index) in records"
          :key="`discipline_${index}`"
          :class="{discipline_highlighted: item.timeStart === selectedTime}"
        >
          <td>
            <customCheckbox
              :isSelected="item.isSelected"
              :id="`item_${index}`"
              @handleClick="() => selectItem(item, index)"
            />
          </td>
          <td>
            {{ item.timeStart }}
          </td>
          <td>
            {{ item.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CustomCheckbox from "./shared/Checkbox.vue";
export default {
  components: {
    customCheckbox: CustomCheckbox
  },
  computed: {
    records() {
      return this.$store.getters.getRecords;
    },
    selectedTime() {
      return this.$store.getters.getSelectedTime;
    },
    isAllSelected() {
      return this.$store.getters.isAllSelected;
    },
    selectedDiscipline() {
      return this.$store.getters.getSelectedDiscipline;
    }
  },
  methods: {
    selectItem(item, index) {
      this.$store.dispatch('selectItem', index)
      this.$store.dispatch('selectDiscipline', item.timeStart)
    },
    selectAllItems() {
      this.$store.dispatch('selectAllItems', this.isAllSelected)
    }
  },
};
</script>

<style lang="sass" scoped>
  .disciplines {
    &__title {
      margin-top: 0;
    }
    &__table {
      text-align: left;
    }
  }
  .discipline {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
    margin-bottom: 5px;
    background-color: #c3c3c3;
    border: 3px solid transparent;
    &_highlighted {
      border-color: red;
    }
    & td {
      margin-right: 5px;
    }
  }
</style>
