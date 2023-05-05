import { UserType } from "./user.type.js"
import { Socket } from "socket.io-client"

export interface ResponseType<T> {
  code: number
  message: string
  data: T
  more?:boolean //临时给首页帖子使用
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

export interface PopoversType {
  setting: boolean
  notice: boolean
  message: boolean
  card: boolean
}

export interface TopBarRightPopoverProps {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
