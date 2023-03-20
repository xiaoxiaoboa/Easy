import React from "react"
import { queryUser } from "../api/user.api"
import { MyContext } from "../context/context"
import { ChatGroupType, ConversationType, MessageType } from "../types/chat.type"
import { RequestFriendsType } from "../types/friend.type"
import { UserRequestType } from "../types/notice.type"
import { ActionTypes } from "../types/reducer"
import { UserType } from "../types/user.type"
import useSnackbar from "./useSnackbar"

const useSocketLinstener = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const fr_cacheRef = React.useRef<UserRequestType[]>([])
  const ct_cacheRef = React.useRef<ConversationType | null>(null)
  const c_cacheRef = React.useRef<ConversationType[]>([])
  const g_cacheRef = React.useRef<ChatGroupType[]>([])

  React.useEffect(() => {
    /* 监听好友请求 */
    state.socket?.notice.on("friendsRequest", (user: UserRequestType) => {
      dispatch({
        type: ActionTypes.REQUESTFRIENDS,
        payload: [...fr_cacheRef.current, user]
      })
    })

    /* 监听未处理信息 */
    state.socket?.notice.on(
      `notice_${state.user_info?.result.user_id}`,
      (val: UserRequestType, callback) => {
        switch (val.type) {
          case "0":
            // setRequestFriends(val)
            break
          case "00":
            callback("我已收到")
            break
          default:
            break
        }
      }
    )

    /* 私聊 */
    state.socket?.chat.on("private_message", (data: MessageType, callback) => {
      // callback('save')
      const current_path = window.location.pathname
      /* 在不在chat页面 */
      if (current_path.includes("chat")) {
        console.log("@")
        const findeItem = c_cacheRef.current.find(
          i => i.conversation_id === data.conversation_id
        )
        /* 在不在Conversation中 */
        if (findeItem) {
          inConversations(findeItem, data, callback)
        } else {
          noConversations(data)
        }
      }
    })

    /* 群聊 */
    state.socket?.group.on("group_messages", (data: MessageType) => {
      console.log(data)
      const current_path = window.location.pathname
      /* 在不在chat页面 */
      if (current_path.includes("chat")) {
        const findeItem = c_cacheRef.current.find(
          i => i.conversation_id === data.conversation_id
        )
        const findGroup = g_cacheRef.current.find(
          i => i.group_id === data.conversation_id
        )

        /* 在不在Conversation中 */
        if (findeItem) {
          inConversations(findeItem, data)
        } else {
          noConversations(data, findGroup)
        }
      }
    })

    return () => {
      state.socket?.notice.off("friendsRequest")
      state.socket?.notice.off("err")
      state.socket?.notice.off(`notice_${state.user_info?.result.user_id}`)
      state.socket?.notice.off("new_message")
      state.socket?.chat.off("private_message")
      state.socket?.group.off("group_messages")
    }
  }, [])

  /* 缓存current_talk，因为useEffect中有socket监听，不能加依赖，所以无法访问到最新值 */
  React.useEffect(() => {
    ct_cacheRef.current = state.current_talk
  }, [state.current_talk])

  /* 缓存好友请求 */
  React.useEffect(() => {
    fr_cacheRef.current = state.requestFriends
  }, [state.requestFriends])

  /* 缓存conversation */
  React.useEffect(() => {
    c_cacheRef.current = state.conversations
  }, [state.conversations])

  /* 缓存group */
  React.useEffect(() => {
    g_cacheRef.current = state.groups
  }, [state.groups])

  /* 在conversaton里 */
  const inConversations = (
    findeItem: ConversationType,
    data: MessageType,
    callback?: any
  ) => {
    const isInCurrtenTalk =
      state.current_talk?.conversation_id === findeItem.conversation_id
    dispatch({
      type: ActionTypes.CONVERSATIONS,
      payload: [
        {
          ...findeItem,
          msg: data.msg,
          user_name: data.user.nick_name,
          msg_length: isInCurrtenTalk ? 0 : findeItem.msg_length + 1
        },
        ...state.conversations.filter(
          i => i.conversation_id !== findeItem.conversation_id
        )
      ]
    })
    callback("noNotice")
    if (isInCurrtenTalk) callback("nosave")
  }
  /* 不在conversa里 */
  const noConversations = (data: MessageType, group?: ChatGroupType) => {
    const newData: ConversationType = {
      conversation_id: data.conversation_id,
      avatar: group ? group.group_avatar : data.user.avatar,
      name: group ? group.group_name : data.user.nick_name,
      user_name: data.user.nick_name,
      msg: data.msg,
      isGroup: group ? true : false,
      msg_length: 1
    }
    dispatch({
      type: ActionTypes.CONVERSATIONS,
      payload: [newData, ...state.conversations]
    })
  }

  return
}

export default useSocketLinstener
