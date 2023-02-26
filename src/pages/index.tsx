import React from "react"
import TopBar from "../components/TopBar"
import styled from "styled-components"
import { Outlet } from "react-router-dom"
import ToggleTheme from "../components/ToggleTheme/ToggleTheme"

const MyApp = () => {
  return (
    <>
      <Container className="flex-c">
        <TopBar />
        <Childrens className="flex">
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

const Container = styled.div``

const Childrens = styled.div``
const Wrapper = styled.div`
  width: 100%;
  max-width: 1536px;
`
