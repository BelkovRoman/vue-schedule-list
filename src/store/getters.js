import { orderBy, isEqual } from 'lodash'

export default {
  getRecords(state) {
    return state.records
  },
  isSomeItemSelected(state) {
    return state.records.some(item => item.isSelected)
  },
  isAllSelected(state) {
    return state.records.every(item => item.isSelected);
  },
  getSelectedTime(state) {
    return state.selectedTime
  },
  getSelectedDiscipline(state) {
    return state.selectedDiscipline
  },
  getIntervals(state) {
    const { from, to } = state.intervals
    const { records } = state

    const addValue = newValue => ({
      value: newValue,
      isDisabled: records.some(item => item.timeStart === newValue)
    })

    if (from && to) {
      const fromItem = from.split(':')
      const currObj = {
        hh: +fromItem[0],
        mm: +fromItem[1]
      }
      const toItem = to.split(':')
      const toObj = {
        hh: +toItem[0],
        mm: +toItem[1]
      }

      let newArr = [addValue(from)]

      while (currObj.hh < toObj.hh) {
        currObj.mm += 15
        if (currObj.mm >= 60) {
          currObj.hh++
          currObj.mm = 0
        }

        const mm = currObj.mm === 0 ? '00' : currObj.mm
        newArr.push(addValue(`${currObj.hh}:${mm}`))
      }

      return newArr
    }
  },
  isFetching(state) {
    return state.isFetching
  },
  isDataEdited(state) {
    const initArray = array => array.map(item => ({
      name: item.name,
      timeStart: item.timeStart
    }))

    const currentRecords = initArray(orderBy(state.records, ['timeStart'], ['asc']))
    const initialRecords = initArray(orderBy(state.initialRecords, ['timeStart'], ['asc']))

    return !isEqual(currentRecords, initialRecords)
  },
  isModalVisible(state) {
    return state.modalVisibility
  },
  getDisciplines(state) {
    return state.disciplines
  },
  getRev(state) {
    return state.rev
  },
  isSaving(state) {
    return state.isSaving
  },
};
