import { Feed, FeedType, PublishFeedType } from "../types/feed.type.js"
import { DataType } from "../types/index.js"
import getLocalData from "../utils/getLocalData.js"
import request from "../utils/request.js"
import { ResponseType } from "../types/index"

const user_info: DataType = getLocalData("user_info")

export const getUserFeeds = async (user_id: string): Promise<ResponseType<Feed[]>> => {
  return await request({
    url: "/feeds",
    methods: "POST",
    body: { user_id },
    token: user_info.token
  })
}

export const publish = async (params: PublishFeedType): Promise<ResponseType<Feed>> => {
  return await request({
    url: "/create_feed",
    methods: "POST",
    body: { ...params },
    token: user_info.token
  })
}
