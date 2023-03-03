import React from "react"
import useSnackbar from "./useSnackbar"
import { useNavigate } from "react-router-dom"
import { ResponseType } from "../types"

type useRequested = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  deleteResponse: (params: ResponseType<unknown>, handler: () => void) => void
  requestedOpt: (params: ResponseType<unknown>, handle?: () => void) => void
}

/* 消息栏持续时间 */
const duration = 3000

const useRequested = (initState: boolean = false): useRequested => {
  const [loading, setLoading] = React.useState<boolean>(initState)
  const [openSnackbar] = useSnackbar()

  /* 删除帖子后响应 */
  const deleteResponse = (params: ResponseType<unknown>, handler: () => void) => {
    requestedOpt(params, handler)
  }

  /* 通用处理函数 */
  const requestedOpt = (params: ResponseType<unknown>, option?: () => void) => {
    const { code, message } = params
    if (code === 0) {
      openSnackbar(message, duration)
      setLoading(false)
      return
    }
    setLoading(false)
    openSnackbar(message, duration)
    option && option()
  }

  return {
    loading,
    setLoading,
    requestedOpt,
    deleteResponse
  }
}

export default useRequested
