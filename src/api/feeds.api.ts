import {
  Feed,
  FeedType,
  Feed_attach,
  Feed_attachType,
  Feed_CommentPublishType,
  Feed_CommentType,
  PublishFeedType,
  UserFavouritedFeeds
} from "../types/feed.type.js"
import { DataType } from "../types/index.js"
import getLocalData from "../utils/getLocalData.js"
import request, { uploadRequest } from "../utils/request.js"
import { ResponseType } from "../types/index"

const user_info: DataType = getLocalData("user_info")

/* 获取帖子 */
export const feeds_query = async (
  user_id: string,
  limit: number,
  offset: number
): Promise<ResponseType<FeedType[]>> => {
  return await request({
    url: "/feed_query",
    methods: "POST",
    body: { user_id, limit, offset },
    token: user_info.token
  })
}

/* 发布帖子 */
export const feed_publish = async (
  files: File[],
  params: Pick<Feed, "feed_userID" | "feed_text">
): Promise<ResponseType<PublishFeedType>> => {
  const formData = new FormData()
  files.map((file, index) => formData.append(`file-${index}`, file))
  formData.append("data", JSON.stringify(params))
  return await uploadRequest({
    url: "/feed_create",
    methods: "POST",
    body: formData,
    token: user_info.token
  })
}

/* 获取所有帖子 */
export const feeds_all = async (
  limit: number,
  offset: number
): Promise<ResponseType<FeedType[]>> => {
  return await request({
    url: `/feeds_all?limit=${limit}&offset=${offset}`,
    methods: "GET"
  })
}

/* 点赞 */
export const feed_like = async (params: {
  feed_id: string
  user_id: string
}): Promise<ResponseType<void>> => {
  return await request({
    url: "/feed_like",
    methods: "POST",
    body: params,
    token: user_info.token
  })
}

/* 删除 */
export const feed_delete = async (feed_id: string): Promise<ResponseType<number>> => {
  return await request({
    url: "/feed_delete",
    methods: "POST",
    body: { feed_id },
    token: user_info.token
  })
}

/* 收藏 */
export const feed_fav = async (feed_id: string, user_id: string) => {
  return await request({
    url: "/fav",
    methods: "POST",
    body: { feed_id, user_id },
    token: user_info.token
  })
}

/* 获取帖子的评论 */
export const feed_comments = async (
  feed_id: string
): Promise<ResponseType<Feed_CommentType[]>> => {
  return await request({
    url: "/feed_comment",
    methods: "POST",
    body: { feed_id }
  })
}

/* 发布评论 */
export const comment_publish = async (
  params: Feed_CommentPublishType
): Promise<ResponseType<Feed_CommentType>> => {
  return await request({
    url: "/comment_create",
    methods: "POST",
    body: params,
    token: user_info.token
  })
}

/* 获取用户收藏的帖子 */
export const favourited_feeds = async (
  user_id: string,
  limit: number,
  offset: number
): Promise<ResponseType<UserFavouritedFeeds[]>> => {
  return await request({
    url: "/feed_fav",
    methods: "POST",
    body: { user_id, limit, offset },
    token: user_info.token
  })
}

/* 删除评论 */
export const comment_delete = async (comment_id: string) => {
  return await request({
    url: "/comment_delete",
    methods: "POST",
    body: { comment_id },
    token: user_info.token
  })
}

/* 获取用户关于帖子的所有的图片和视频 */
export const allAttaches = async (
  user_id: string
): Promise<ResponseType<Feed_attachType[]>> => {
  return await request({
    url: "/feed_attaches",
    methods: "POST",
    body: { user_id },
    token: user_info.token
  })
}
