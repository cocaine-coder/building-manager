import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => {
    return { show: true }
  },
  actions: {
  },
})