/* 登录 */
import request, { uploadRequest } from "../utils/request"
import { ResponseType, DataType } from "../types/index"
import getLocalData from "../utils/getLocalData"
import { AlterationCoverType, UserType } from "../types/user.type"
import { FriendType, FriendsListType } from "../types/friend.type"
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
  const { files, user_id } = params
  const formData = new FormData()
  formData.append("background", params.files.background)
  formData.append("data", JSON.stringify({ user_id, blur: files.background_blur }))
  return uploadRequest({
    url: "/cover",
    methods: "POST",
    body: formData,
    token: t
  })
}

/* 修改头像 */
// export const changeAvatar = (user_id: string, file: File) => {}

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
): Promise<ResponseType<FriendsListType>> => {
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

/* 消息中的图片和视频上传 */
export const messageUpload = async (
  file: File,
  user_id: string,
  friend_id: string,
  t: string,
  isGroup?: boolean
): Promise<ResponseType<string>> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("user_id", user_id)
  formData.append("friend_id", friend_id)
  formData.append("isGroup", JSON.stringify(isGroup))
  return await uploadRequest({
    url: "/message_upload",
    methods: "POST",
    body: formData,
    token: t
  })
}

/* 删除好友 */
export const deleteFriend = async (
  user_id: string,
  friend_id: string,
  t: string
): Promise<ResponseType<void>> => {
  return await request({
    url: "/del_friend",
    methods: "POST",
    body: { user_id, friend_id },
    token: t
  })
}
