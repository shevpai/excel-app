import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.emitter = options.emitter;
    this.unsubs = [];

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return "";
  }

  $emit(event, ...args) {
    // emit interface
    this.emitter.emit(event, ...args);
  }

  $subscribe(event, fn) {
    // subscribe interface
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubs.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged(changes) {
    // optimize subscribe logic
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  init() {
    // add listeners
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach((unsub) => unsub());
  }
}
