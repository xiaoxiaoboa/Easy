import { ReducerState, ActionsType, ActionTypes } from "../types/reducer"

const reducer = (state: ReducerState, action: ActionsType) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.THEME:
      return { ...state, theme: payload }
    case ActionTypes.USER_INFO:
      return { ...state, user_info: payload }
    case ActionTypes.HOME_FEEDS:
      const result = payload.filter(p =>
        state.home_feeds.every(s => s.feed.feed_id !== p.feed.feed_id)
      )
      return { ...state, home_feeds: [...state.home_feeds, ...result] }
    default:
      return state
  }
}

export default reducer
