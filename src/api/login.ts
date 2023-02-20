/* 登录 */
import request from "../utils/request"
import { ResponseType, UserType, DataType } from "../types/index"
import getLocalData from "../utils/getLocalData"

export const sign_in = <T>(params: T): Promise<ResponseType<DataType>> => {
  return request({ url: "/login", methods: "POST", body: params })
}

export const sing_up = <T>(params: T): Promise<ResponseType<UserType>> => {
  return request({ url: "/register", methods: "POST", body: params })
}

export const alterationCover = <T>(params: T): Promise<ResponseType<UserType>> => {
  const user_info: DataType = getLocalData("user_info")
  return request({ url: "/cover", methods: "POST", body: params, token: user_info.token })
}
