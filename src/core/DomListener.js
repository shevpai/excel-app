import { capitalizeFirst } from "./utils"

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomeListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)    
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    
  }  
}

function getMethodName(eventName) {
  return 'on' + capitalizeFirst(eventName)
}