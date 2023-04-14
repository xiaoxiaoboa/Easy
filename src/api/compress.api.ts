import getBase64 from "../utils/getBase64"
import request, { uploadRequest } from "../utils/request"
import { ResponseType, DataType } from "../types/index"
import getLocalData from "../utils/getLocalData"
import { CompressedType } from "../types/user.type"

const compress = async (
  pic: File,
  t: string
): Promise<ResponseType<CompressedType>> => {
  const formData = new FormData()
  formData.append("file", pic)
  return await uploadRequest({
    url: "/compress",
    methods: "POST",
    body: formData,
    token: t
  })
}

export default compress
