import React from "react"
import TopBar from "../components/TopBar"
import styled from "styled-components"
import { Outlet } from "react-router-dom"
import useSocketLinstener from "../hooks/useSocketListener"

const MyApp = () => {
  const nothing = useSocketLinstener()

  return (
    <>
      <Container className="flex-c">
        <TopBar />
        <Childrens className="flex flex-jcc">
          <Wrapper className="w">
            <Outlet />
          </Wrapper>
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
