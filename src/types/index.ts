import { UserType } from "./user.type"

export interface ResponseType<T> {
  code: number
  message: string
  data: T
}

export interface DataType {
  result: UserType
  token: string
}
