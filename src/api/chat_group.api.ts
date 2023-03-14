import { DataType } from "../types"
import { ChatGroupSaveType, ChatGroupType } from "../types/chat.type"
import getLocalData from "../utils/getLocalData"
import request, { uploadRequest } from "../utils/request"
import { ResponseType } from "../types/index"

const user_info: DataType = getLocalData("user_info")

export const newGroup = async (
  data: ChatGroupSaveType,
  numbers: string[],
  file: File
): Promise<ResponseType<ChatGroupType>> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("data", JSON.stringify(data))
  formData.append("numbers", JSON.stringify(numbers))

  return await uploadRequest({
    url: "/group_create",
    methods: "POST",
    body: formData,
    token: user_info.token
  })
}

export const getJoinedGroups = async (
  user_id: string
): Promise<ResponseType<ChatGroupSaveType[]>> => {
  return await request({
    url: "/group_joined",
    methods: "POST",
    body: { user_id },
    token: user_info.token
  })
}
