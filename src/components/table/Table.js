import { ExcelComponent } from "../../core/ExelComponent";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  
  toHTML() {
    return `
      <div class="row">
      <div class="row-info">
        
      </div>
      <div class="row-data">
        <div class="column">
          A
        </div>
        <div class="column">
          B
        </div>
        <div class="column">
          C
        </div>
      </div>
    </div> 

    <div class="row">
      <div class="row-info">
        1
      </div>
      <div class="row-data">
        <div class="cell selected" contenteditable spellcheck="false">A1</div>
        <div class="cell" contenteditable spellcheck="false">B1</div>
        <div class="cell" contenteditable spellcheck="false">C1</div>  
      </div>
    </div>       
    `
  }  
}