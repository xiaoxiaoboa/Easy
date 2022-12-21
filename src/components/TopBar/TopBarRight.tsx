import React from "react"
import styled from "styled-components"
import Avatar from "../Avatar/Avatar"
import { MdNotificationsActive } from "react-icons/md"
import { BsFillChatDotsFill } from "react-icons/bs"

const TopBarRight = () => {
  return (
    <Container className="flex flex-rr flex-alc flex-jce">
      <Avatar />
      <TopBarRightButton handleFun={() => {}}>
        <MdNotificationsActive size="22" />
      </TopBarRightButton>
      <TopBarRightButton handleFun={() => {}}>
        <BsFillChatDotsFill size="20" />
      </TopBarRightButton>
      <TopBarRightButton handleFun={() => {}} w="90" h="38" br="22px">
        <span style={{fontWeight: 'bold'}}>搜索好友</span>
      </TopBarRightButton>
    </Container>
  )
}

export default TopBarRight

/* styled */
const Container = styled.div`
  width: 280px;
  gap:10px;
  padding-right:10px;
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
    <TopBarRightButtonContainer className="flex flex-alc flex-jcc">
      <ButtonWrapper
        className="flex flex-alc flex-jcc"
        onClick={handleFun}
        w={w}
        h={h}
        br={br}
      >
        {children}
        <Shade className="shade" />
      </ButtonWrapper>
    </TopBarRightButtonContainer>
  )
}
const TopBarRightButtonContainer = styled.div`
  position: relative;

  &:active {
    transform: scale(0.95);
  }
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
  background-color: #d8dadf;
  cursor: pointer;
  transform-origin: center center;

  &:hover {
    & .shade {
      opacity: 1;
    }
  }
`
const Shade = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  position: absolute;
  background-color: #0000000f;
  opacity: 0;
  cursor: unset;
`
