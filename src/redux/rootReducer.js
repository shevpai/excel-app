import { TABLE_RESIZE } from "./types"

export function rootReducer(state, action) {
  let updateState
  let field 
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.payload.type === 'col' ? 'colState' : 'rowState'
      updateState = state[field] || {}
      updateState[action.payload.id] = action.payload.value
      return {...state, [field]: updateState}     
    default: return state
  }
}