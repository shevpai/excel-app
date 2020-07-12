import { storage } from '../core/utils';

function storageName(params) {
  return 'excel:' + params
}

export class LocalStorageClient {
  constructor(params) {
    this.name = storageName(params)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return Promise.resolve(storage(this.name))

    // -----------------imitation of async-----------------
    // return new Promise(resolve => {
    //   const state = storage(this.name)

    //   setTimeout(() => {
    //     resolve(state)
    //   }, 2000)
    // })
  }
}