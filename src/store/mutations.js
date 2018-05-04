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
  setData(state, data) {
    const newArray = data.records.map(item => ({
      ...item,
      isSelected: false
    }))
    state.records = newArray
    state.initialRecords = newArray
    state.intervals = data.intervals
    state.disciplines = data.disciplines
    state.rev = data.rev

    state.isFetching = false
    state.isFetched = true
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
    )
  },
  removeDiscipline(state) {
    state.records = orderBy(
      state.records.filter(item => !item.isSelected),
      ['timeStart'],
      ['asc']
    )
  },
  setIntervals(state, value) {
    state.records = state.records.map(item => ({
      ...item,
      timeStart: item.timeStart !== value && item.isSelected ?
        value :
        item.timeStart
    }))
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
  }
};
