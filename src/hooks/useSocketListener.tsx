import React from "react"
import { queryUser } from "../api/user.api"
import { MyContext } from "../context/context"
import { ChatGroupType, ConversationType, MessageType } from "../types/chat.type"
import { FriendType } from "../types/friend.type"
import { OtherNoticeType } from "../types/notice.type"
import { ActionTypes } from "../types/reducer"

const useSocketLinstener = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const ct_cacheRef = React.useRef<ConversationType | null>(null)
  const c_cacheRef = React.useRef<ConversationType[]>([])
  const g_cacheRef = React.useRef<ChatGroupType[]>([])
  const cm_cacheRef = React.useRef<MessageType[]>([])
  const n_cacheRef = React.useRef<OtherNoticeType[]>([])
  const f_cacheRef = React.useRef<FriendType[]>([])

  /* 监听聊天消息 */
  React.useEffect(() => {
    /* 私聊 */
    state.socket?.chat.on("private_message", (data: MessageType, callback) => {
      const findeItem = c_cacheRef.current.find(
        i => i.conversation_id === data.conversation_id
      )
      /* 在不在Conversation中 */
      if (findeItem) {
        inConversations(findeItem, data, callback)
      } else {
        noConversations(data)
      }
    })

    /* 群聊 */
    state.socket?.group.on("group_messages", (data: MessageType, callback) => {
      const findeItem = c_cacheRef.current.find(
        i => i.conversation_id === data.conversation_id
      )
      const findGroup = g_cacheRef.current.find(i => i.group_id === data.conversation_id)

      /* 在不在Conversation中 */
      if (findeItem) {
        inConversations(findeItem, data, callback)
      } else {
        noConversations(data, findGroup)
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

  /* 好友相关的通知 */
  React.useEffect(() => {
    /* 监听好友请求 */
    state.socket?.notice.on("friendsRequest", (data: OtherNoticeType) => {
      dispatch({ type: ActionTypes.NOTICE, payload: [data, ...n_cacheRef.current] })
    })
    /* 拒绝 */
    state.socket?.notice.on("rejectRequest", (data: OtherNoticeType) => {
      dispatch({ type: ActionTypes.NOTICE, payload: [...n_cacheRef.current, data] })
    })
    /* 同意 */
    state.socket?.notice.on("agreeRequest", (data: OtherNoticeType) => {
      dispatch({ type: ActionTypes.NOTICE, payload: [data, ...n_cacheRef.current] })
      dispatch({
        type: ActionTypes.FRIENDS,
        payload: [...f_cacheRef.current, data.source as FriendType]
      })
    })
    /* 点赞评论帖子 */
    state.socket?.notice.on("notice", (data: OtherNoticeType) => {
      dispatch({ type: ActionTypes.NOTICE, payload: [data, ...n_cacheRef.current] })
    })

    return () => {
      state.socket?.notice.off("friendsRequest")
      state.socket?.notice.off("rejectRequest")
      state.socket?.notice.off("agreetRequest")
      state.socket?.notice.off("liked_feed")
      state.socket?.notice.off("comment_feed")
    }
  }, [])

  /* 缓存current_talk，因为useEffect中有socket监听，不能加依赖，所以无法访问到最新值 */
  React.useEffect(() => {
    ct_cacheRef.current = state.current_talk
  }, [state.current_talk])

  /* 缓存conversation */
  React.useEffect(() => {
    c_cacheRef.current = state.conversations
  }, [state.conversations])

  /* 缓存group */
  React.useEffect(() => {
    g_cacheRef.current = state.groups
  }, [state.groups])
  /* 缓存current_messages */
  React.useEffect(() => {
    cm_cacheRef.current = state.current_messages
  }, [state.current_messages])
  /* 缓存notice */
  React.useEffect(() => {
    n_cacheRef.current = state.notice
  }, [state.notice])
  /* 缓存friend */
  React.useEffect(() => {
    f_cacheRef.current = state.friends
  }, [state.friends])

  /* 在conversaton里 */
  const inConversations = (
    findeItem: ConversationType,
    data: MessageType,
    callback?: any
  ) => {
    /* 在不在chat页面 */
    const inChat = window.location.pathname.includes("chat")
    /* 是不是正在聊天 */
    const isInCurrtenTalk =
      ct_cacheRef.current?.conversation_id === findeItem.conversation_id

    dispatch({
      type: ActionTypes.CONVERSATIONS,
      payload: [
        {
          ...findeItem,
          msg: data.msg,
          msg_type: data.msg_type,
          user_name: data.user.nick_name,
          msg_length: isInCurrtenTalk ? 0 : findeItem.msg_length + 1
        },
        ...c_cacheRef.current.filter(i => i.conversation_id !== findeItem.conversation_id)
      ]
    })

    if (inChat) {
      isInCurrtenTalk &&
        dispatch({
          type: ActionTypes.CURRENT_MESSAGES,
          payload: [...cm_cacheRef.current, data]
        })
      isInCurrtenTalk ? callback("nosave") : callback("noNotice")
    }
  }
  /* 不在conversation里 */
  const noConversations = (data: MessageType, group?: ChatGroupType) => {
    const newData: ConversationType = {
      conversation_id: data.conversation_id,
      avatar: group ? group.group_avatar : data.user.avatar,
      name: group ? group.group_name : data.user.nick_name,
      user_name: data.user.nick_name,
      msg: data.msg,
      msg_type: data.msg_type,
      isGroup: group ? true : false,
      msg_length: 1
    }

    dispatch({
      type: ActionTypes.CONVERSATIONS,
      payload: [newData, ...c_cacheRef.current]
    })

    dispatch({
      type: ActionTypes.CURRENT_MESSAGES,
      payload: [...cm_cacheRef.current, data]
    })
  }

  return
}

export default useSocketLinstener
