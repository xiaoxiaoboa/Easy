import { FriendType } from "./friend.type"
import { UserType } from "./user.type"

export interface MessageType {
  user_id: string
  to_id: string
  msg: string
  user: {
    nick_name: string
    avatar: string
  }
  createdAt: string
  conversation_id: string
}

export type ConversationType = {
  conversation_id: string
  avatar: string
  name: string
  user_name: string
  msg: string
  isGroup: boolean
  msg_length: number
}

export interface ChatGroupType {
  group_id: string
  group_owner: string
  group_name: string
  group_avatar: string
  group_desc: string
}
export interface ChatGroupSendType {
  group: ChatGroupType
  group_numbers: GroupNumbersType[]
}
export interface GroupNumbersType {
  group_id: string
  user_id: string
}
