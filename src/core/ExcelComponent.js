import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
  }

  // Return component tamplate
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()

  }
}