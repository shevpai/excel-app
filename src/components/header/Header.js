import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actions'


export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['headerState'],
      ...options
    })
  }

  toHTML() {
    const value = this.store.getState().headerState
    return `
      <input type="text" class="input" value="${value || 'New Table'}" spellcheck="false"/>

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    this.$dispatch(actions.changeHeader($(event.target).textContent()))
  }
}
