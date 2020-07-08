import { Page } from "../core/Page";
import { $ } from "../core/dom";

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Excel Dashboard</h1>
      </div>
      <div class="db__new">
        <div class="db__view">
          <a href="#excel" class="db__create">
            New <br /> Table
            <span class="material-icons db__create__icon">
              note_add
            </span>
          </a>
        </div>        
      </div>
      <div class="db__table db__view">
        <div class="db__list-header">
          <span>Name</span>
          <span>Last viewed</span>
        </div>

        <ul class="db__list">
          <li class="db__record">
            <a href="#">Table №1</a>
            <strong>DD.MM.YYYY</strong>
          </li>
          <li class="db__record">
            <a href="#">Table №2</a>
            <strong>DD.MM.YYYY</strong>
          </li>
        </ul>
    </div>
  `)
  }
}