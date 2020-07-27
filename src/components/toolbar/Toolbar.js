import {$} from '@core/dom'
import { createToolbarBtn, createColorPic } from './toolbar.tamplate'
import { ExcelStateComponent } from '../../core/ExcelStateComponent'


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
      ${createToolbarBtn(this.state)}
      ${createColorPic(this.state)}
    `)
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
    if (event.target.dataset.type === 'text-color') {
      const value = {color: event.target.value}
      this.$emit('toolbar:applyStyle', value)   
    } else if (event.target.dataset.type === 'background-color') {
      const value = {backgroundColor: event.target.value}
      this.$emit('toolbar:applyStyle', value)   
    }
  }
}
