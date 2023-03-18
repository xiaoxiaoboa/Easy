/* 登录 */
import request from "../utils/request"
import { ResponseType, DataType } from "../types/index"
import getLocalData from "../utils/getLocalData"
import { AlterationCoverType, UserType } from "../types/user.type"
import { FriendType } from "../types/friend.type"

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
export const getFriends = (user_id: string,t:string): Promise<ResponseType<FriendType[]>> => {
  return request({
    url: "/friends",
    methods: "POST",
    body: { user_id },
    token: t
  })
}
