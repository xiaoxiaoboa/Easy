import { UserType } from "./user.type"

export interface Feed {
  feed: FeedType
  feed_user: UserType
}

export interface FeedType {
  feed_id: string
  feed_text: string
  feed_attach: string[]
  feed_liked: string[]
  feed_likedCount: number
  feed_comment: string[]
  feed_commentCount: number
  createdAt: string
  updatedAt: string
}

export interface PublishFeedType {
  user_id: string
  feed_text: string
  feed_attach: string[]
}
