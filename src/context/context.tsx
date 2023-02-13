import React from "react"
import reducer from "./reducer"
import { createContextType, ReducerState } from "../types/reducer"
import { DataType } from "../types/index"

const getUserInfo = (): DataType | null => {
  const localData = localStorage.getItem("user_info")
  return localData && JSON.parse(localData)
}

/* reducer初始化值 */
const initialValue: ReducerState = {
  theme: "light",
  user_info: getUserInfo() || {
    result: {
      id: -1,
      avatar: "",
      createAt: "",
      email: "",
      nick_name: "",
      profile_img: "",
      updateAt: "",
      user_id: ""
    },
    token: ""
  }
}

export const MyContext = React.createContext<createContextType>({
  state: initialValue,
  dispatch: () => null
})

type Props = { children: React.ReactNode }
export const MyContextProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialValue)

  React.useEffect(() => {
    console.log(state)
  }, [])

  return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>
}
