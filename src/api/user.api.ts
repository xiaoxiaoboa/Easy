/* 登录 */
import request from "../utils/request"
import { ResponseType, DataType } from "../types/index"
import getLocalData from "../utils/getLocalData"
import { AlterationCoverType, UserType } from "../types/user.type"
import { FriendType } from "../types/friend.type"
import { OtherNoticeType, UnReadMessageType } from "../types/notice.type"

/* 登录 */
export const sign_in = <T>(params: T): Promise<ResponseType<DataType>> => {
  return request({ url: "/login", methods: "POST", body: { ...params } })
}

/* 注册 */
export const sing_up = <T>(params: T): Promise<ResponseType<UserType>> => {
  return request({ url: "/register", methods: "POST", body: { ...params } })
}

/* 更改封面 */
export const alterationCover = (
  params: AlterationCoverType,
  t: string
): Promise<ResponseType<UserType>> => {
  return request({
    url: "/cover",
    methods: "POST",
    body: { ...params },
    token: t
  })
}

/* 查询用户 */
export const queryUser = async (
  user_id: string,
  t: string
): Promise<ResponseType<UserType>> => {
  return await request({
    url: "/user",
    methods: "POST",
    body: { user_id },
    token: t
  })
}

/* 查找好友 */
export const getFriends = (
  user_id: string,
  t: string
): Promise<ResponseType<FriendType[]>> => {
  return request({
    url: "/friends",
    methods: "POST",
    body: { user_id },
    token: t
  })
}

/* 查询未读消息的notice */
export const queryMessageNotice = async (
  user_id: string,
  type: string,
  t: string
): Promise<ResponseType<UnReadMessageType[]>> => {
  return await request({
    url: "/notice_message",
    methods: "POST",
    body: { user_id, type },
    token: t
  })
}
/* 查询好友请求点赞评论未读的notice */
export const queryNotice = async (
  user_id: string,
  t: string
): Promise<ResponseType<OtherNoticeType[]>> => {
  return await request({
    url: "/notice",
    methods: "POST",
    body: { target_id: user_id },
    token: t
  })
}

/* 将和已读消息相关的记录都更新为已读 */
export const updateNotice = async (
  { source_id, notice_id }: { source_id?: string; notice_id?: string },
  t: string
): Promise<ResponseType<any>> => {
  return await request({
    url: "/read",
    methods: "POST",
    body: { source_id, notice_id },
    token: t
  })
}
