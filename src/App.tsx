import React from "react"
import Routes from "./routes"
import ThemeProvider from "./theme/ThemeProvider"
import TopBar from "./components/TopBar"
import styled from "styled-components"

const App = () => {
  return (
    <ThemeProvider>
      <Container className="flex-c">
        <TopBar />
        <Routes />
      </Container>
    </ThemeProvider>
  )
}

export default App
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: ${props => props.theme.colors.bgcolor};
`
