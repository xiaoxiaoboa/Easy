import { ReducerState, ActionsType, ActionTypes } from "../types/reducer"

const reducer = (state: ReducerState, action: ActionsType) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.MYSOCKET:
      return { ...state, socket: payload }
    case ActionTypes.THEME:
      return { ...state, theme: payload }
    case ActionTypes.USER_INFO:
      return { ...state, user_info: payload }
    case ActionTypes.HOME_FEEDS:
      return { ...state, home_feeds: payload }
    case ActionTypes.REQUESTFRIENDS:
      return { ...state, requestFriends: payload }
    case ActionTypes.FRIENDS:
      return { ...state, friends: payload }
    case ActionTypes.GROUPS:
      return { ...state, groups: payload }
    case ActionTypes.CONVERSATIONS:
      return { ...state, conversations: payload }
    case ActionTypes.CURRENT_TALK:
      return { ...state, current_talk: payload }
    case ActionTypes.UNREAD_MESSAGE:
      return { ...state, unread_message: payload }
    case ActionTypes.POPOVERS:
      return { ...state, popovers: payload }
    default:
      return state
  }
}

export default reducer
