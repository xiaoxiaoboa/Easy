import React from "react"
import reducer from "./reducer"
import { ActionTypes, createContextType, ReducerState } from "../types/reducer"
import getLocalData from "../utils/getLocalData"
import { io, Socket } from "socket.io-client"
import { getFriends } from "../api/user.api"
import { getJoinedGroups } from "../api/chat_group.api"

/* socket初始化 */
const initSocket = () =>
  getLocalData("user_info")
    ? {
        chat: io("ws://localhost:8000/chat", { autoConnect: true }),
        group: io("ws://localhost:8000/group_chat", { autoConnect: true }),
        notice: io("ws://localhost:8000", { autoConnect: true })
      }
    : null

/* reducer初始化值 */
const initialValue: ReducerState = {
  theme: getLocalData("color_mode") || "light",
  user_info: getLocalData("user_info"),
  home_feeds: [],
  socket: initSocket(),
  notice: [],
  friends: [],
  groups: [],
  conversations: getLocalData("conversations") || [],
  current_talk: getLocalData("current_talk"),
  unread_message: [],
  current_messages: []
}

export const MyContext = React.createContext<createContextType>({
  state: initialValue,
  dispatch: () => null
})

type Props = { children: React.ReactNode }
export const MyContextProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialValue)

  // dispatch(() => ({type: ActionTypes.CONVERSATIONS, payload: []}))

  React.useEffect(() => {
    if (state.user_info) {
      state.socket?.notice.on("connect", () => {
        state.socket?.notice?.emit(
          "connected",
          state.socket?.notice?.id,
          state.user_info?.result.user_id
        )
      })
      /* 私聊 */
      state.socket?.chat?.on("connect", () => {
        // console.log("连接上chat了")
        state.socket?.chat?.emit(
          "connected",
          state.socket?.chat?.id,
          state.user_info?.result.user_id
        )
      })
      /* 群聊 */
      state.socket?.group?.on("connect", () => {
        // console.log("连接上group了")
        state.socket?.group?.emit("connected", state.user_info?.result.user_id)
      })
    }

    state.socket?.notice.on("online", (msg, callback) => {
      callback("我在线")
    })

    return () => {
      state.socket?.notice.off("online")
      state.socket?.chat.off("connect")
      state.socket?.notice.off("connect")
      state.socket?.group.off("connect")
    }
  }, [])

  React.useEffect(() => {
    /* 存入本地 */
    localStorage.setItem("user_info", JSON.stringify(state.user_info))

    /* 一开始没登陆，然后登录了，需要初始化socket */
    if (state.user_info) {
      dispatch({ type: ActionTypes.MYSOCKET, payload: initSocket()! })
    }
    /* 获取用户列表 */
    if (state.user_info) {
      getFriends(state.user_info.result.user_id, state.user_info.token).then(val => {
        if (val.code === 1) {
          dispatch({ type: ActionTypes.FRIENDS, payload: val.data })
        }
      })
      /* 获取加入的群组 */
      getJoinedGroups(state.user_info?.result.user_id!, state.user_info.token).then(
        val => {
          if (val.code === 1) {
            dispatch({ type: ActionTypes.GROUPS, payload: val.data })
          }
        }
      )
    }

    if (!state.user_info) {
      state.socket?.chat.disconnect()
      state.socket?.group.disconnect()
      state.socket?.notice.disconnect()
    }
  }, [state.user_info])

  React.useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(state.conversations))
  }, [state.conversations])
  React.useEffect(() => {
    localStorage.setItem("current_talk", JSON.stringify(state.current_talk))
  }, [state.current_talk])

  return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>
}
