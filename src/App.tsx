import React from "react"
import Routes from "./routes"
import ThemeProvider from "./theme/ThemeProvider"
import TopBar from "./components/TopBar"
import styled from "styled-components"
import MyApp from "./pages"

const App = () => {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  )
}

export default App
