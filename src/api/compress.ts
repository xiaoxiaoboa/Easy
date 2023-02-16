import getBase64 from "../utils/getBase64"
import request from "../utils/request"
import { ResponseType,CompressedType } from "../types/index"

const compress = async (
  user_id: string,
  pic: File
): Promise<ResponseType<CompressedType>> => {
  const res = await getBase64(pic)
  const data = {
    user_id,
    pic,
    base64: res.base64
  }
  return await request({ url: "/compress", methods: "POST", body: data })
}

export default compress
