import api from '../api'
import data from "../mock/data";
import parseResponse from "../helpers/parseResponse";

export default {
  fetchData({ commit }) {
  //   let promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(parseResponse(data));
  //     }, 1000);
  //
  //   });
  //
  //   commit('setFetching')
  //     promise
  //     .then(result => {
  //       commit("setData", result)
  //       commit("setFetched")
  //     })
  //     .catch(error => commit("setFetchFailure", error))

    commit('setFetching')
    api.getRecords()
      .then(records => {
        api.getDisciplines()
          .then(disciplines => {
            api.getIntervals()
              .then(intervals => {
                commit("setData", {
                  records: records.data.data,
                  disciplines: disciplines.data.data,
                  intervals: intervals.data.data,
                  rev: records.data._rev
                })
              })
          })
      })
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

    commit('setFetching')
    api.saveData(arrayToSave, payload.rev)
      .then(res => commit('setFetched'))
      .catch(err => commit('setFetched', `Произошла ошибка: ${err}`))
  },
};
