import React from "react"
import Routes from "../routes"
import ThemeProvider from "../theme/ThemeProvider"
import TopBar from "../components/TopBar"
import styled from "styled-components"
import { Outlet } from "react-router-dom"
import ToggleTheme from "../components/ToggleTheme/ToggleTheme"

const MyApp = () => {
  return (
    <>
      <Container className="flex-c">
        <TopBar />
        <Childrens className="flex flex-jcc">
          <Wrapper>
            <Outlet />
          </Wrapper>
          <ToggleTheme />
        </Childrens>
      </Container>
    </>
  )
}

export default MyApp

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: ${props => props.theme.colors.bgcolor};
`

const Childrens = styled.div`
  height: 100%;
`
const Wrapper = styled.div`
  width: 100%;
  max-width: 1536px;
`
