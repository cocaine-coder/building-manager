import { defineStore } from 'pinia'

export const useIOTShowerStore = defineStore('iotshower', {
  state: () => {
    return { show: true }
  },
  actions: {
    change(){
        this.show = !this.show
    }
  },
})