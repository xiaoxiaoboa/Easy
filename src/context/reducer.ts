import { ReducerState, ActionsType, ActionTypes } from "../types/reducer"

const reducer = (state: ReducerState, action: ActionsType) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.THEME:
      return { ...state, theme: payload }
    case ActionTypes.USER_INFO:
      return { ...state, user_info: payload }
    case ActionTypes.HOME_FEEDS:
      return { ...state, home_feeds: [...payload, ...state.home_feeds] }
    default:
      return state
  }
}

export default reducer
