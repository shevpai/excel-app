import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubs = []

    this.prepare()
  }

  prepare() {
    // some settings before init()
  }

  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    // emit interface
    this.emitter.emit(event, ...args)
  }

  $subscribe(event, fn) {
    // subscribe interface
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubs.push(unsub)
  }

  init() {
    // add listeners
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }
}