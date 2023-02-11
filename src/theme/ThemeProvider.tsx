import React from "react"
import { darkTheme, GlobalStyle, lightTheme } from "./theme"
import { ThemeProvider as Theme } from "styled-components"
import { MyContextProvider, MyContext } from "../context/context"

interface Porps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<Porps> = ({ children }): React.ReactElement => {
  const { state } = React.useContext(MyContext)
  return (
    <MyContextProvider>
      <Theme theme={state.theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        {children}
      </Theme>
    </MyContextProvider>
  )
}

export default ThemeProvider
