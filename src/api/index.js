import axios from 'axios'

const urlRecords = 'https://couchdb-404574.smileupps.com/schedule/records';
const urlDisciplines = 'https://couchdb-404574.smileupps.com/schedule/disciplines';
const urlIntervals = 'https://couchdb-404574.smileupps.com/schedule/intervals';

export default {
  getRecords() {
    return axios.get(urlRecords)
  },
  getDisciplines() {
    return axios.get(urlDisciplines)
  },
  getIntervals() {
    return axios.get(urlIntervals)
  },
  saveData(data, rev) {
    const body = {
      _rev: rev,
      data: data,
    }

    return axios.put(`${urlRecords}`, body)
  }
}
