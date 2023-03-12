import { FeedType } from "../feed.type"
import { DataType, MySocket } from "../index"
import { Socket } from "socket.io-client"
import { UserType } from "../user.type"
import { FriendType, RequestFriendsType } from "../friend.type"
import { BackNoticeType } from "../notice.type"
import { ConversationType } from "../chat.type"

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
  friends: FriendType[]
  conversations: ConversationType[]
  current_talk: ConversationType | null
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
  REQUESTFRIENDS = "requestFriends",
  FRIENDS = "friends",
  CONVERSATIONS = "conversations",
  CURRENT_TALK = "current_talk"
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
  [ActionTypes.FRIENDS]: FriendType[]
  [ActionTypes.CONVERSATIONS]: ConversationType[]
  [ActionTypes.CURRENT_TALK]: ConversationType | null
}

export type ActionsType = ActionMap<ReducerPaylodType>[keyof ActionMap<ReducerPaylodType>]
