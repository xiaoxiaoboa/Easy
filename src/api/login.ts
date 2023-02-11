/* 登录 */
import request from "../utils/request"
import { ResponseType, UserType } from "../types/index"

interface DataType {
  result: UserType
  token: string
}

export const sign_in = <T>(params: T): Promise<ResponseType<DataType>> => {
  return request({ url: "/login", methods: "POST", body: params })
}

export const sing_up = <T>(params: T): Promise<ResponseType<UserType>> => {
  return request({ url: "/register", methods: "POST", body: params })
}
