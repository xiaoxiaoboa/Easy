import { ReducerState, ActionsType, ActionTypes } from "../types/reducer"

const reducer = (state: ReducerState, action: ActionsType) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.THEME:
      return { ...state, theme: payload }
    default:
      return state
  }
}

export default reducer
