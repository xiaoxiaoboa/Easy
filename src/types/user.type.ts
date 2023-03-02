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

export type InComplateUserType = Pick<UserType, "user_id" | "nick_name" | "avatar">

/* =====================user_favourite=========================== */

export interface User_FavouriteType {
  user_id: string
  feed_id: string
  createdAt: string
}
export type InComplateFavouriteType = Omit<User_FavouriteType, "feed_id">
