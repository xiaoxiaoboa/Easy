import { FeedType } from "../feed.type"
import { DataType, MySocket } from "../index"
import { Socket } from "socket.io-client"
import { UserType } from "../user.type"
import { RequestFriendsType } from "../friend.type"
import { BackNoticeType } from "../notice.type"

export interface createContextType {
  state: ReducerState
  dispatch: React.Dispatch<ActionsType>
}

export interface ReducerState {
  user_info: DataType | null
  theme: "light" | "dark"
  home_feeds: FeedType[]
  readonly socket: MySocket | null
  requestFriends: BackNoticeType<RequestFriendsType>[]
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum ActionTypes {
  USER_INFO = "user_info",
  THEME = "theme",
  HOME_FEEDS = "home_feeds",
  MYSOCKET = "mysocket",
  REQUESTFRIENDS = "requestFriends"
}

export interface ReducerActionType {
  type: ActionTypes
  payload: ReducerPaylodType
}

export interface ReducerPaylodType {
  [ActionTypes.USER_INFO]: DataType | null
  [ActionTypes.THEME]: "light" | "dark"
  [ActionTypes.HOME_FEEDS]: FeedType[]
  [ActionTypes.MYSOCKET]: MySocket
  [ActionTypes.REQUESTFRIENDS]: BackNoticeType<RequestFriendsType>[]
}

export type ActionsType = ActionMap<ReducerPaylodType>[keyof ActionMap<ReducerPaylodType>]
