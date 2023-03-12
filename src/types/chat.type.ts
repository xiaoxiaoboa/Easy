import { FriendType } from "./friend.type"
import { UserType } from "./user.type"

export interface PrivateMessageType {
  user_id: string
  to_id: string
  msg: string
  createdAt: string
}

export type PrivateMessageSaveType = Omit<PrivateMessageType, "createdAt">

export interface ConversationType extends FriendType {
  conversation_id: string
}
