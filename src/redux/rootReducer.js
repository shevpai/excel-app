import { TABLE_RESIZE, 
         CHANGE_TEXT, 
         CHANGE_TABLE_HEADER, 
         CURRENT_STYLE, 
         APPLY_STYLE, 
         UPDATE_VIEW_DATE} from "./types"
import { rgb2hex } from "../core/utils"

export function rootReducer(state, action) {
  let updateState
  let field 
  let val
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.payload.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(state, field, action)}     
    case CHANGE_TEXT: 
      field = 'dataState'
      return {...state, [field]: value(state, field, action), currentText: action.payload.value}     
    case CHANGE_TABLE_HEADER:
      field = 'headerState'
      updateState = state[field] || ''
      updateState = action.payload
      return {...state, [field]: updateState}
    case CURRENT_STYLE:
      field = 'currentStyles'
      action.payload.color = rgb2hex(action.payload.color)
      action.payload.backgroundColor = rgb2hex(action.payload.backgroundColor)
      return {...state, [field]: action.payload}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.payload.ids.forEach(id => {
        val[id] = {...val[id], ...action.payload.value}        
      })
      return {
        ...state, 
        [field]: val, 
        currentStyles: {...state.currentStyles, ...action.payload.value}
      } 
    case UPDATE_VIEW_DATE:
      return {...state, lastViewed: new Date().toJSON()} 
    default: return state
  }
}

function value(state, field, action) {
  const updateState = state[field] || {}
  updateState[action.payload.id] = action.payload.value
  return updateState
}