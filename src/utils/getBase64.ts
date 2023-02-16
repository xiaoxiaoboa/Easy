type getBase64BackType = {
  message: string
  base64: string | ArrayBuffer | null
}

const getBase64 = (pic: File): Promise<getBase64BackType> => {
  return new Promise((resolve, reject) => {

    const fd = new FileReader()

    fd.onerror = () => {
      reject({ message: "图片读取失败", base64: null })
    }

    fd.onloadend = () => {
      resolve({ message: "转换base64成功", base64: fd.result })
    }
    fd.readAsDataURL(pic)
  })
}

export default getBase64
