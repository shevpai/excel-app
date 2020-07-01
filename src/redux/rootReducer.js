import { TABLE_RESIZE, CHANGE_TEXT } from "./types"

export function rootReducer(state, action) {
  let updateState
  let field 
  console.log('Action:', action)
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.payload.type === 'col' ? 'colState' : 'rowState'
      updateState = state[field] || {}
      updateState[action.payload.id] = action.payload.value
      return {...state, [field]: updateState}     
    case CHANGE_TEXT: 
      updateState = state['dataState'] || {}
      updateState[action.payload.id] = action.payload.value
      return {...state, currentText: action.payload.value, dataState: updateState}
    default: return state
  }
}