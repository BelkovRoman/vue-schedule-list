import { isEqual, orderBy } from 'lodash'

export default {
  setFetching(state) {
    state.isFetching = true
    state.isFetched = false
  },
  setFetched(state) {
    state.isFetching = false
    state.isFetched = true
  },
  setFetchFailure(state, value) {
    state.isFetching = false
    state.isFetched = true
    state.error = value
  },
  setRecords(state, payload) {
    const sortedArray = orderBy(payload.data, ['timeStart'], ['asc']);
    const selectedTime = state.selectedTime

    const newArray = sortedArray.map((item, index) => ({
      ...item,
      id: index,
      isHighlighted: item.timeStart === selectedTime,
      isSelected: false,
    }));

    state.records = newArray
    state.initialRecords = newArray
    state.rev = payload._rev

    state.isFetching = false
    state.isFetched = true
  },
  setDisciplines(state, payload) {
    state.disciplines = payload
  },
  setIntervals(state, payload) {
    state.intervals = payload
  },
  selectItem(state, id) {
    state.records = state.records.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          isSelected: !item.isSelected
        }
      }

      return item
    })
  },
  selectAllItems(state, value) {
    state.records = state.records.map(item => ({
      ...item,
      isSelected: !value
    }))
  },
  addDiscipline(state, value) {
    state.records = orderBy
      (state.records.concat(value),
      ['timeStart'],
      ['asc']
    ).map((item, index) => ({
      ...item,
      id: index,
    }))
  },
  removeDiscipline(state) {
    state.records = orderBy(
      state.records.filter(item => !item.isSelected),
      ['timeStart'],
      ['asc']
    ).map((item, index) => ({
      ...item,
      id: index,
    }))
  },
  setInterval(state, value) {
    state.records = orderBy
      (state.records.map(item => ({
      ...item,
      timeStart: item.timeStart !== value && item.isSelected ?
        value :
        item.timeStart
      })),
      ['timeStart'],
      ['asc'])
  },
  selectTime(state, value) {
    state.selectedTime = value
  },
  deselectTime(state) {
    state.selectedTime = null
  },
  selectDiscipline(state, value) {
    state.selectedDiscipline = value
  },
  deselectDiscipline(state, value) {
    state.selectedDiscipline = {
      timeStart: null
    }
  },
  changeModalVisibility(state) {
    state.modalVisibility = !state.modalVisibility
  },
  changeSavingState(state) {
    state.isSaving = !state.isSaving
  },
};
