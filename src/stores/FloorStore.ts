// stores/counter.js
import { defineStore } from 'pinia'

export const useFloorStore = defineStore('iotshower', {
  state: () => {
    return { meshName: '' }
  },
  actions: {
    change(name:string){
        if(this.meshName !== name)
            this.meshName = name;
    }
  },
})