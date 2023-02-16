export interface ResponseType<T> {
  code: number
  message: string
  data: T
}

export interface UserType {
  id: number
  user_id: string
  nick_name: string
  email: string
  avatar: string
  profile_img: string
  profile_blurImg: string
  createAt: string
  updateAt: string
}

export interface DataType {
  result: UserType
  token: string
}

export interface CompressedType {
  compressed: string
}

export interface AlterationCoverType {
  user_id: string
  base64: {
    background: string
    background_blur: string
  }
}