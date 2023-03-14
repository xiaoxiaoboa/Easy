import React from "react"
import { queryUser } from "../api/user.api"
import { MyContext } from "../context/context"
import { ConversationType, MessageSendType } from "../types/chat.type"
import { RequestFriendsType } from "../types/friend.type"
import { BackNoticeType } from "../types/notice.type"
import { ActionTypes } from "../types/reducer"
import { UserType } from "../types/user.type"
import useSnackbar from "./useSnackbar"

const useSocketLinstener = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const fr_cacheRef = React.useRef<BackNoticeType<RequestFriendsType>[]>([])
  const ct_cacheRef = React.useRef<ConversationType | null>(null)

  React.useEffect(() => {
    /* 监听好友请求 */
    state.socket?.notice.on("friendsRequest", (user: BackNoticeType<any>) => {
      setRequestFriends(user)
    })

    /* 监听未处理信息 */
    state.socket?.notice.on(
      `notice_${state.user_info?.result.user_id}`,
      (val: BackNoticeType<any>, callback) => {
        switch (val.notice.type) {
          case "0":
            setRequestFriends(val)
            break
          case "00":
            callback("我已收到")
            break
          default:
            break
        }
      }
    )

    /* 新消息 */
    state.socket?.notice.on("new_message", (data: MessageSendType) => {
      if (ct_cacheRef.current?.conversation_id !== data.to_id && ct_cacheRef.current?.conversation_id !== data.conversation_id) {
        dispatch({
          type: ActionTypes.UNREAD_MESSAGE,
          payload: [...state.unread_message, data]
        })
      }
    })

    return () => {
      state.socket?.notice.off("friendsRequest")
      state.socket?.notice.off("err")
      state.socket?.notice.off(`notice_${state.user_info?.result.user_id}`)
      state.socket?.notice.off("new_message")
    }
  }, [])

  React.useEffect(() => {
    /* 缓存current_talk，因为useEffect中有socket监听，不能加依赖，所以无法访问到最新值 */
    ct_cacheRef.current = state.current_talk
  }, [state.current_talk])

  React.useEffect(() => {
    /* 缓存好友请求 */
    fr_cacheRef.current = state.requestFriends
  }, [state.requestFriends])

  /* 处理好友请求 */
  const setRequestFriends = (val: BackNoticeType<any>) => {
    dispatch({
      type: ActionTypes.REQUESTFRIENDS,
      payload: [...fr_cacheRef.current, val]
    })
  }

  return
}

export default useSocketLinstener
