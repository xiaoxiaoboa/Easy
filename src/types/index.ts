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
  createAt: string
  updateAt: string
}

