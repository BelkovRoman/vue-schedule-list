<template>
  <div class='addDiscipline'>
    <div class="addDiscipline__fade"/>
    <div
      class='addDiscipline__inner'
      v-on-clickaway="changeModalVisibility"
    >
      <h2 class='addDiscipline__title'>
        Добавить новую дисциплину
      </h2>
      <div class="addDiscipline__content">
        <div class="addDiscipline__selects">
          <div class="addDiscipline__item">
            <vueSelect
              v-model="nameValue"
              :options="nameOptions"
              :placeholder="'Выберите наименование'"
            />
          </div>
          <div class="addDiscipline__item">
            <vueSelect
              v-model="timeValue"
              label="value"
              :options="timeOptions"
              :placeholder="'Выберите время начала'"
            />
          </div>
        </div>
        <customButton
          :isDisabled="!(nameValue && timeValue)"
          @handleClick="() => addDiscipline()"
        >
          Добавить
        </customButton>
      </div>
    </div>
  </div>
</template>

<script>
import VueSelect from "vue-select";
import CustomButton from "./shared/Button.vue";
import { directive as onClickaway } from 'vue-clickaway';

export default {
  components: {
    vueSelect: VueSelect,
    customButton: CustomButton
  },
  directives: {
    onClickaway: onClickaway,
  },
  data: function () {
    return {
      nameValue: null,
      nameOptions: this.disciplines,
      timeValue: null,
      timeOptions: this.times,
    }
  },
  methods: {
    changeModalVisibility() {
      this.$store.dispatch('changeModalVisibility')
    },
    addDiscipline() {
      if (this.nameValue && this.timeValue) {
        this.$store.dispatch('addDiscipline', {
          timeStart: this.timeValue.value,
          name: this.nameValue,
        })
        this.$store.dispatch('changeModalVisibility')
      }
    }
  },
  mounted: function() {
    this.nameOptions = this.$store.getters.getDisciplines;
    this.timeOptions = this.$store.getters.getIntervals;
  }
};
</script>

<style lang="sass" scoped>
  .addDiscipline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    &__fade {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(56, 56, 56, 0.5);
      width: 100%;
      height: 100vh;
      z-index: 9998;
    }

    &__inner {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background-color: white;
      z-index: 9999;
    }

    &__title {
      margin-top: 0;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__selects {
      display: flex;
      margin-bottom: 20px;
    }

    &__item {
      font-size: 17px;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
