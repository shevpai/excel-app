import { storage, formatDate } from "../core/utils"

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]  
  const date = new Date(model.lastViewed)
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.headerState}</a>
      <span>
        ${formatDate(date)}
      </span>
    </li>   
  `
}

function getAllKeys() {
  const keys = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) {
  return `<p class="db__table__no-tables">You have not create any table</p>`
  }  

  return `
    <div class="db__list-header">
      <span>Name</span>
      <span>Last viewed</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}