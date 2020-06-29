import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './table.function'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.rowsCount = 50
  }


  toHTML() {
    return createTable(this.rowsCount)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$subscribe('formula:input', text => 
        this.selection.current.textContent(text))

    this.$subscribe('formula:done', () => this.selection.current.focus())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    event.preventDefault()

    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells) 
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp']
    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id, this.rowsCount))
      this.selectCell($next)
    }
  }
  
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}

