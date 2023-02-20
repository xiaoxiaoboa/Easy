import getBase64 from "../utils/getBase64"
import request from "../utils/request"
import { ResponseType, CompressedType, DataType } from "../types/index"
import getLocalData from "../utils/getLocalData"

const compress = async (
  user_id: string,
  pic: File
): Promise<ResponseType<CompressedType>> => {
  const res = await getBase64(pic)
  const user_info: DataType = getLocalData("user_info")
  const data = {
    user_id,
    pic,
    base64: res.base64
  }
  return await request({
    url: "/compress",
    methods: "POST",
    body: data,
    token: user_info.token
  })
}

export default compress
