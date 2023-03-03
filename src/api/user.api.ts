/* 登录 */
import request from "../utils/request"
import { ResponseType, DataType } from "../types/index"
import getLocalData from "../utils/getLocalData"
import { UserType } from "../types/user.type"

/* 获取token */
const user_info: DataType = getLocalData("user_info")

/* 登录 */
export const sign_in = <T>(params: T): Promise<ResponseType<DataType>> => {
  return request({ url: "/login", methods: "POST", body: { ...params } })
}

/* 注册 */
export const sing_up = <T>(params: T): Promise<ResponseType<UserType>> => {
  return request({ url: "/register", methods: "POST", body: { ...params } })
}

/* 更改封面 */
export const alterationCover = <T>(params: T): Promise<ResponseType<UserType>> => {
  return request({
    url: "/cover",
    methods: "POST",
    body: { ...params },
    token: user_info.token
  })
}

/* 查询用户 */
export const queryUser = async <T>(params: T): Promise<ResponseType<UserType>> => {
  return await request({
    url: "/user",
    methods: "POST",
    body: { ...params },
    token: user_info.token
  })
}

export const favFeed = async (params: { user_id: string; feed_id: string }) => {
  return await request({
    url: "/fav",
    methods: "POST",
    body: { ...params },
    token: user_info.token
  })
}
