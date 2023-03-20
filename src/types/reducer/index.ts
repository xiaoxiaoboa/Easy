import { FeedType } from "../feed.type"
import { DataType, MySocket, PopoversType } from "../index"
import { FriendType } from "../friend.type"
import { UserRequestType } from "../notice.type"
import {
  UnReadMessageType,
  ChatGroupType,
  ConversationType,
  MessageType
} from "../chat.type"

export interface createContextType {
  state: ReducerState
  dispatch: React.Dispatch<ActionsType>
}

export interface ReducerState {
  user_info: DataType | null
  theme: "light" | "dark"
  home_feeds: FeedType[]
  readonly socket: MySocket | null
  requestFriends: UserRequestType[]
  friends: FriendType[]
  groups: ChatGroupType[]
  conversations: ConversationType[]
  current_talk: ConversationType | null
  unread_message: UnReadMessageType[]
  popovers: PopoversType
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
  GROUPS = "groups",
  CONVERSATIONS = "conversations",
  CURRENT_TALK = "current_talk",
  UNREAD_MESSAGE = "unread_message",
  POPOVERS = "popovers"
}

export interface ReducerActionType {
  type: ActionTypes
  payload: ReducerPaylodType
}

export interface ReducerPaylodType {
  [ActionTypes.USER_INFO]: DataType | null
  [ActionTypes.THEME]: "light" | "dark"
  [ActionTypes.HOME_FEEDS]: FeedType[]
  [ActionTypes.MYSOCKET]: MySocket | null
  [ActionTypes.REQUESTFRIENDS]: UserRequestType[]
  [ActionTypes.FRIENDS]: FriendType[]
  [ActionTypes.GROUPS]: ChatGroupType[]
  [ActionTypes.CONVERSATIONS]: ConversationType[]
  [ActionTypes.CURRENT_TALK]: ConversationType | null
  [ActionTypes.UNREAD_MESSAGE]: UnReadMessageType[]
  [ActionTypes.POPOVERS]: PopoversType
}

export type ActionsType = ActionMap<ReducerPaylodType>[keyof ActionMap<ReducerPaylodType>]
