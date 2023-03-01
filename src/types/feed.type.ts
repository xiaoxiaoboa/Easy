import { UserType } from "./user.type"

export interface Feed {
  feed_id: string
  feed_userID: string
  user: UserType
  feed_text: string
  createdAt: string
  updatedAt: string
}

export interface FeedType extends Feed {
  feed_liked: Feed_LikedType
  feed_comment: Feed_CommentType
  feed_attach: Feed_attachType
}

export interface PublishFeedType {
  feed_userID: string
  feed_text: string
  feed_attach: Feed_attach[]
}

export interface Feed_like {
  feed_id: string
  user_id: string
}

/* =====================Feed_attach=========================== */
export interface Feed_attachType {
  feed_id: string
  feed_userID: string
  attach: Feed_attach[]
  count: number
}
export type Feed_attachServiceType = {
  [key in keyof Feed_attachType]: Feed_attachType[key] extends number ? number : string
}
export interface Feed_attach {
  id: string
  type: "image" | "video"
  link: string
}

/* =====================Feed_liked=========================== */
export interface Feed_LikedType {
  id: number
  feed_id: string
  feed_userID: string
  liked: string[]
  count: number
}

/* =====================Feed_comment=========================== */
export interface Feed_CommentType {
  id: number
  feed_id: string
  feed_userID: string
  comment: string[]
  count: number
}
