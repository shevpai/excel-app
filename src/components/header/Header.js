import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import { ActiveRoute } from '../../core/routes/ActiveRoute'


export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      subscribe: ['headerState'],
      ...options
    })
  }


  init() {
    super.init()
    
    this.$title = $('.input')
    this.$dispatch(actions.changeHeader(this.$title.textContent()))
  }

  toHTML() {
    const value = this.store.getState().headerState
    return `
      <input type="text" class="input" value="${value || 'New Table'}" spellcheck="false"/>

      <div>

        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    this.$dispatch(actions.changeHeader($(event.target).textContent()))
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Want to delete this table?')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
