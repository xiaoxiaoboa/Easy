import React from "react"
import { darkTheme, GlobalStyle, lightTheme } from "./theme"
import { ThemeProvider as Theme } from "styled-components"

interface Porps {
  children: React.ReactElement
}

const ThemeProvider: React.FC<Porps> = ({ children }): React.ReactElement => {
  const [mode, setMode] = React.useState<string>("light")
  return (
    <Theme theme={mode === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      {children}
    </Theme>
  )
}

export default ThemeProvider
