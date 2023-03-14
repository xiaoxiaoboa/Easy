export interface BackNoticeType<T> {
  notice: {
    notice_id: string
    type: string
  }
  data: T
}
