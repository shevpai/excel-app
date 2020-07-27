import {$} from '@core/dom'
import { createToolbar } from './toolbar.tamplate'
import { ExcelStateComponent } from '../../core/ExcelStateComponent'
import { rgb2hex } from '../../core/utils'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click', 'change'],
      subscribe: ['currentStyles'],
      ...options
    })
  }    

  prepare() {  
    this.initState(this.store.getState().currentStyles)
  }

  get template() {
    return (`
      ${createToolbar(this.state)}
      <div class="button">
        <input 
          type="color" 
          value=${this.state.color || '#ff0000'}
          data-type="color-picker"
        > 
      </div>`
    )
  }

  toHTML() {
    return this.template
  }

  storeChanged({currentStyles}) {    
    this.setState(currentStyles)       
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)      
    } 
  }

  onChange(event) {
    if (event.target.dataset.type === 'color-picker') {
      const value = {color: event.target.value}
      this.$emit('toolbar:applyStyle', value)   
    }
  }
}
