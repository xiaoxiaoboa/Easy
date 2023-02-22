import { Feed } from "../feed.type"
import { DataType } from "../index"

export interface createContextType {
  state: ReducerState
  dispatch: React.Dispatch<ActionsType>
}

export interface ReducerState {
  user_info: DataType | null
  theme: "light" | "dark"
  home_feeds: Feed[]
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
  HOME_FEEDS = "home_feeds"
}

export interface ReducerActionType {
  type: ActionTypes
  payload: ReducerPaylodType
}

export interface ReducerPaylodType {
  [ActionTypes.USER_INFO]: DataType | null
  [ActionTypes.THEME]: "light" | "dark"
  [ActionTypes.HOME_FEEDS]: Feed[]
}

export type ActionsType = ActionMap<ReducerPaylodType>[keyof ActionMap<ReducerPaylodType>]
