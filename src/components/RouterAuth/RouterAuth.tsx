import React from "react"
import { Navigate } from "react-router-dom"
import { MyContext } from "../../context/context"

type Props = { children: React.ReactNode }
const RouterAuth = ({ children }: Props) => {
  const { state } = React.useContext(MyContext)

  return <>{state.user_info ? children : Navigate({ to: "/login", replace: true })}</>
}

export default RouterAuth
