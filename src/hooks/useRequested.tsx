import React from "react"
import useSnackbar from "./useSnackbar"
import { useNavigate } from "react-router-dom"
import { ResponseType } from "../types"

type useRequested = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

  requestedOpt: (params: ResponseType<unknown>, handle?: () => void) => void
}

/* 消息栏持续时间 */
const duration = 3000

const useRequested = (initState: boolean = false): useRequested => {
  const [loading, setLoading] = React.useState<boolean>(initState)
  const [openSnackbar] = useSnackbar()

  /* 通用处理函数 */
  const requestedOpt = (params: ResponseType<any>, option?: () => void) => {
    const { code, message, data } = params
    if (code === 0) {
      openSnackbar(`${message}-[${data}]`, duration)
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
    requestedOpt
  }
}

export default useRequested
