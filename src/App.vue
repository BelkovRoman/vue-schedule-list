<template>
  <div id="app" class="app">
    <loading>
      <h1>Расписание соревнований</h1>
      <div class="app__header">
        <controlPanel/>
      </div>
      <div class="app__body">
        <disciplines/>
        <intervals/>
      </div>
    </loading>
    <addDiscipline v-if="isModalVisible"/>
  </div>
</template>

<script>
import Disciplines from "./components/Disciplines.vue";
import Intervals from "./components/Intervals.vue";
import ControlPanel from "./components/ControlPanel.vue";
import AddDiscipline from "./components/AddDiscipline.vue";
import Loading from "./components/shared/Loading.vue"

export default {
  components: {
    disciplines: Disciplines,
    intervals: Intervals,
    controlPanel: ControlPanel,
    addDiscipline: AddDiscipline,
    loading: Loading
  },
  computed: {
    isModalVisible() {
      return this.$store.getters.isModalVisible;
    }
  },
  beforeMount: function() {
    this.$store.dispatch("fetchData");
  }
};
</script>

<style lang="sass">
body {
  margin: 0;
  padding: 0;
}

.app {
  position: relative;
  height: 100vh;
  width: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  &__body {
    display: flex;
    justify-content: space-between;
  }
}
</style>
