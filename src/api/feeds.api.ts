import { Feed, FeedType, Feed_attach, PublishFeedType } from "../types/feed.type.js"
import { DataType } from "../types/index.js"
import getLocalData from "../utils/getLocalData.js"
import request, { uploadRequest } from "../utils/request.js"
import { ResponseType } from "../types/index"

const user_info: DataType = getLocalData("user_info")

export const feeds_query = async (user_id: string): Promise<ResponseType<Feed[]>> => {
  return await request({
    url: "/feed_query",
    methods: "POST",
    body: { user_id },
    token: user_info.token
  })
}

export const feed_publish = async (
  params: PublishFeedType
): Promise<ResponseType<Feed>> => {
  return await request({
    url: "/feed_create",
    methods: "POST",
    body: { ...params },
    token: user_info.token
  })
}

export const feed_attach = async (
  files: File[]
): Promise<ResponseType<Feed_attach[]>> => {
  const formData = new FormData()
  files.map((file, index) => formData.append(`file-${index}`, file, file.name))
  return await uploadRequest({
    url: `/feed_attach`,
    methods: "POST",
    body: formData,
    token: user_info.token
  })
}

export const feeds_all = async (): Promise<ResponseType<Feed[]>> => {
  return await request({ url: "/feeds_all", methods: "GET" })
}
