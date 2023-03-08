import React from "react"
import reducer from "./reducer"
import { ActionTypes, createContextType, ReducerState } from "../types/reducer"
import getLocalData from "../utils/getLocalData"
import { io } from "socket.io-client"

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
  theme: "light",
  user_info: getLocalData("user_info"),
  home_feeds: [],
  socket: initSocket(),
  requestFriends: []
}

export const MyContext = React.createContext<createContextType>({
  state: initialValue,
  dispatch: () => null
})

type Props = { children: React.ReactNode }
export const MyContextProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialValue)
  // const nothing = useSocketLinstener()

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
      })
      /* 群聊 */
      state.socket?.group?.on("connect", () => {
        // console.log("连接上group了")
      })
    }

    state.socket?.notice.on("online", (msg, callback) => {
      callback("我在线")
    })

    return () => {
      state.socket?.chat.off("getSocketId")
      state.socket?.notice.off("online")
    }
  }, [])

  React.useEffect(() => {
    if (state.user_info && !state.socket) {
      dispatch({ type: ActionTypes.MYSOCKET, payload: initSocket()! })
    }
  }, [state.user_info])

  return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>
}
