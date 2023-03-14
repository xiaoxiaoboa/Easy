import { UserType } from "./user.type.js"
import { Socket } from "socket.io-client"

export interface ResponseType<T> {
  code: number
  message: string
  data: T
}

export interface DataType {
  result: UserType
  token: string
}

export interface MySocket {
  chat: Socket
  group: Socket
  notice: Socket
}
