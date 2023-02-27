import React from "react"
import useSnackbar from "./useSnackbar"
import { useNavigate } from "react-router-dom"
import { ResponseType } from "../types"

type useRequested = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  signInResponse: (params: ResponseType<unknown>) => void
  signUpResponse: (
    params: ResponseType<unknown>,
    handler: React.Dispatch<React.SetStateAction<boolean>>
  ) => void
  alterationCoverResponse: (params: ResponseType<unknown>) => void
  publishResponse: (params: ResponseType<unknown>) => void
}

/* 消息栏持续时间 */
const duration = 3000

const useRequested = (initState: boolean = false): useRequested => {
  const [loading, setLoading] = React.useState<boolean>(initState)
  const [openSnackbar] = useSnackbar()
  const navigate = useNavigate()

  /* 登录响应 */
  const signInResponse = (params: ResponseType<unknown>) => {
    requestedOpt(params, () => navigate("/"))
  }
  /* 注册响应 */
  const signUpResponse = (
    params: ResponseType<unknown>,
    handler: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    requestedOpt(params, () => handler(false))
  }
  /* 修改封面后的响应 */
  const alterationCoverResponse = (params: ResponseType<unknown>) => {
    requestedOpt(params)
  }
  /* 发布帖子后的响应 */
  const publishResponse = (params: ResponseType<unknown>) => {
    requestedOpt(params)
  }

  /* 通用处理函数 */
  const requestedOpt = (params: ResponseType<unknown>, option?: () => void) => {
    const { code, message, data } = params
    if (code === 0) {
      openSnackbar(message, duration)
      console.log(data)
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
    signInResponse,
    signUpResponse,
    alterationCoverResponse,
    publishResponse
  }
}

export default useRequested
