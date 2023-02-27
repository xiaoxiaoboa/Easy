import { UserType } from "./user.type"

export interface Feed {
  feed: FeedType
  feed_user: UserType
}

export interface FeedType {
  feed_id: string
  feed_userID: string
  feed_text: string
  feed_attach: Feed_attach[]
  feed_liked: string[]
  feed_likedCount: number
  feed_comment: string[]
  feed_commentCount: number
  createdAt: string
  updatedAt: string
}

export interface PublishFeedType {
  feed_userID: string
  feed_text: string
  feed_attach: Feed_attach[]
}

export interface Feed_attach {
  id: string
  attach_type: "image" | "video"
  attach_link: string
}

export interface Feed_like {
  feed_id: string
  user_id: string
}
