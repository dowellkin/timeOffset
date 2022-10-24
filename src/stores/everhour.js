import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEHourStore = defineStore('EHour', {
  state: {
    apiKey: null,
    loggedIn: false,
    loading: false,
  },

  actions: {

  },

  getters: {

  }
})
