import React from "react"
import getLocalData from "../../utils/getLocalData"
import { DataType } from "../../types/index"
import { Navigate } from "react-router-dom"

type Props = { children: React.ReactNode }
const RouterAuth = ({ children }: Props) => {
  const value: DataType | null = getLocalData("user_info")

  return <>{value ? children : Navigate({ to: "/login" })}</>
}

export default RouterAuth
