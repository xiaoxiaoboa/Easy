import React from "react"
import styled from "styled-components"
import Avatar from "../Avatar/Avatar"
import { MdNotificationsActive } from "react-icons/md"
import { BsFillChatDotsFill } from "react-icons/bs"
import { MyContext } from "../../context/context"
import getUnionUrl from "../../utils/getUnionUrl"

const TopBarRight = () => {
  const { state } = React.useContext(MyContext)

  return (
    <Container className="flex flex-rr flex-alc flex-jcs">
      <Avatar
        src={state.user_info?.result.avatar}
        size="44"
        id={state.user_info?.result.user_id || ""}
      />
      <TopBarRightButton handleFun={() => {}}>
        <MdNotificationsActive size="22" />
      </TopBarRightButton>
      <TopBarRightButton handleFun={() => {}}>
        <BsFillChatDotsFill size="20" />
      </TopBarRightButton>
      <TopBarRightButton handleFun={() => {}} w="90" h="38" br="22px">
        <span style={{ fontWeight: "bold" }}>搜索好友</span>
      </TopBarRightButton>

      {/* <NotificationBar /> */}
    </Container>
  )
}

export default TopBarRight

/* styled */
const Container = styled.div`
  height: 100%;
  right: 0;
  gap: 10px;
  padding-right: 10px;
  position: absolute;
`

/* 导航栏右侧功能键 */
interface TopBarRightButtonProps {
  children: React.ReactElement
  handleFun: () => void
  br?: string
  w?: string
  h?: string
}
const TopBarRightButton: React.FC<TopBarRightButtonProps> = props => {
  const { children, handleFun, br, w, h } = props
  return (
    <TopBarRightButtonContainer className="flex flex-alc flex-jcc click">
      <ButtonWrapper
        className="flex flex-alc flex-jcc"
        onClick={handleFun}
        w={w}
        h={h}
        br={br}
      >
        {children}
      </ButtonWrapper>
    </TopBarRightButtonContainer>
  )
}
const TopBarRightButtonContainer = styled.div`
  position: relative;
`
interface ButtonWrapperProps {
  w?: string
  h?: string
  br?: string
}
const ButtonWrapper = styled.div<ButtonWrapperProps>`
  width: ${props => (props.w ? props.w : "42")}px;
  height: ${props => (props.h ? props.h : "42")}px;
  border-radius: ${props => (props.br ? props.br : "50%")};
  background-color: ${props => props.theme.colors.nav_btn_bgcolor};
  cursor: pointer;
  transform-origin: center center;
`

const NotificationBar = () => {
  return (
    <NBContainer>
      <NBWrapper>
        <h2>通知</h2>
      </NBWrapper>
    </NBContainer>
  )
}

const NBContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const NBWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 70px;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.nav_bg};
`
