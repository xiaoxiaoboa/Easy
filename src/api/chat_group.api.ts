import { ChatGroupType } from "../types/chat.type"
import request, { uploadRequest } from "../utils/request"
import { ResponseType } from "../types/index"
import getLocalData from "../utils/getLocalData"

/* 新群组 */
export const newGroup = async (
  data: ChatGroupType,
  numbers: string[],
  file: File,
  t: string
): Promise<ResponseType<ChatGroupType>> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("data", JSON.stringify(data))
  formData.append("numbers", JSON.stringify(numbers))

  return await uploadRequest({
    url: "/group_create",
    methods: "POST",
    body: formData,
    token: t
  })
}

/* 用户加入的群组 */
export const getJoinedGroups = async (
  user_id: string,
  t: string
): Promise<ResponseType<ChatGroupType[]>> => {
  return await request({
    url: "/group_joined",
    methods: "POST",
    body: { user_id },
    token: t
  })
}

/* 更新群组头像 */
export const updateAvatar = async (
  group_id: string,
  file: File,
  t:string
): Promise<ResponseType<string>> => {
  const formData = new FormData()
  formData.append("files", file)
  formData.append("group_id", JSON.stringify(group_id))

  return await uploadRequest({
    url: "/group_avatar",
    methods: "POST",
    body: formData,
    token: t
  })
}
