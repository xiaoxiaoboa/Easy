import React from "react"
import styled from "styled-components"
import HomeLeft from "./HomeLeft"
import HomeMiddle from "./HomeMiddle"
import HomeRight from "./HomeRight"
import { MyContext } from "../../context/context"
import { NavLink } from "react-router-dom"

const Home = () => {
  const { state } = React.useContext(MyContext)
  return (
    <Container className="flex flex-jcsb">
      {state.user_info ? (
        <HomeLeft user_info={state?.user_info.result} />
      ) : (
        <LoginPrompt />
      )}

      <HomeMiddle />
      <HomeRight />
    </Container>
  )
}

export default Home

/* styled */
const Container = styled.div`
  width: 100%;
`

const LoginPrompt = () => {
  return (
    <LoginPromptContainer>
      <LoginPromptWrapper className="flex-c">
        <h3>第一次来这里？</h3>
        <p>立即注册，开始你的精彩生活</p>
        <Btns className="flex-c flex-alc">
          <NavLink to={"login"}>登录</NavLink>
          <NavLink to={"login"}>注册</NavLink>
        </Btns>
      </LoginPromptWrapper>
    </LoginPromptContainer>
  )
}

const LoginPromptContainer = styled.div`
  position: sticky;
  top: 80px;
  flex: 1;
  border-radius: 8px;
  height: 100%;
  background-color: ${props => props.theme.colors.nav_bg};
`
const LoginPromptWrapper = styled.div`
  padding: 20px;
  gap: 10px;
  & p {
    font-size: 13px;
    color: ${props => props.theme.colors.secondary};
  }
`
const Btns = styled.div`
  gap: 8px;
  width: 100%;

  & a {
    flex: 1;
    outline: none;
    border: none;
    padding: 10px;
    width: 100%;
    border-radius: 20px;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #ccc;
    text-align: center;
  }

  & a:first-child {
    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }
  }
  & a:last-child {
    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }
  }
`
