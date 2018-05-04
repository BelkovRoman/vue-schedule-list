import api from '../api'
import data from "../mock/data";
import parseResponse from "../helpers/parseResponse";

const handleFetchRecords = commit => {
  commit('setFetching')
  api.getRecords()
    .then(records => commit("setRecords", records.data))
    .catch(error => commit("setFetchFailure", error))
}

export default {
  fetchRecords({ commit }) {
    handleFetchRecords(commit)
  },
  fetchDisciplines({ commit }) {
    api.getDisciplines()
      .then(disciplines => commit("setDisciplines", disciplines.data.data))
      .catch(error => commit("setFetchFailure", error))
  },
  fetchIntervals({ commit }) {
    api.getIntervals()
      .then(intervals => commit("setIntervals", intervals.data.data))
      .catch(error => commit("setFetchFailure", error))
  },
  selectItem({ commit }, id) {
    commit('selectItem', id)
  },
  selectAllItems({ commit }, value) {
    commit('selectAllItems', value)
  },
  setIntervals({ commit }, value) {
    commit('setIntervals', value)
  },
  addDiscipline({ commit }, value) {
    commit('addDiscipline', value)
  },
  removeDiscipline({ commit }) {
    commit('removeDiscipline')
  },
  selectTime({ commit }, value) {
    commit('selectTime', value)
  },
  deselectTime({ commit }) {
    commit('deselectTime')
  },
  selectDiscipline({ commit }, value) {
    commit('selectDiscipline', value)
  },
  deselectDiscipline({ commit }) {
    commit('deselectDiscipline')
  },
  changeModalVisibility({ commit }) {
    commit('changeModalVisibility')
  },
  saveChanges({ commit }, payload) {
    const arrayToSave = payload.records.map(item =>
      ({name: item.name, timeStart: item.timeStart})
    )

    api.saveData(arrayToSave, payload.rev)
      .then(res => {
        commit('changeSavingState')
        setTimeout(() => {
          commit('changeSavingState')
        }, 3000)

        handleFetchRecords(commit)
      })
      .catch(err => commit('setSavedErr', `Произошла ошибка: ${err}`))
  },
};
