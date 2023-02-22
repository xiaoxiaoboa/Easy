import { DataType, ResponseType } from "../types"
import getLocalData from "../utils/getLocalData"
import { uploadRequest } from "../utils/request"

const user_info: DataType = getLocalData("user_info")

export const upload = async (files: File[]): Promise<ResponseType<string[]>> => {
  const formData = new FormData()
  files.map((file, index) => formData.append(`file-${index}`, file, file.name))
  return await uploadRequest({
    url: `/feed_upload`,
    methods: "POST",
    body: formData,
    token: user_info.token
  })
}
