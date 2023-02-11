import React from "react"
import reducer from "./reducer"
import { createContextType, ReducerState } from "../types/reducer"



const initialValue: ReducerState = {
  theme: "light"
}

export const MyContext = React.createContext<createContextType>({
  state: initialValue,
  dispatch: () => null
})

type Props = { children: React.ReactNode }
export const MyContextProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialValue)

  return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>
}
