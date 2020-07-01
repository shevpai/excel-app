import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula') // -input

    this.$subscribe('table:select', $cell => this.$formula.textContent($cell.textContent()))

    // this.$subscribe('table:input', $cell => this.$formula.textContent($cell.textContent()))

    this.$subscribeStore(state => this.$formula.textContent(state.currentText))
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).textContent())
  }    
  
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()

      this.$emit('formula:done')
    }
  }
}
