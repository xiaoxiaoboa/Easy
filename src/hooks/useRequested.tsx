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
}
const duration = 3000

const useRequested = (): useRequested => {
  const [loading, setLoading] = React.useState<boolean>(false)
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

  return { loading, setLoading, signInResponse, signUpResponse }
}

export default useRequested
