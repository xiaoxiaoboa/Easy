import React from "react"
import styled from "styled-components"
import Avatar from "../Avatar/Avatar"
import { MdNotificationsActive } from "react-icons/md"
import { BsFillChatDotsFill } from "react-icons/bs"
import { MyContext } from "../../context/context"
import getUnionUrl from "../../utils/getUnionUrl"
import { useNavigate } from "react-router-dom"
import Dialog from "../Dialog/Dialog"
import TopBarRightUser from "../Dialog/TopBarRightUser"
import TopBarRightNotice from "../Dialog/TopBarRightNotice"
import { ActionTypes } from "../../types/reducer"

const TopBarRight = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const navigate = useNavigate()
  const settingRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <Container className="flex flex-rr flex-alc flex-jcs">
      <div>
        <div
          ref={settingRef}
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: ActionTypes.POPOVERS,
              payload: { ...state.popovers, setting: true }
            })
          }
        >
          <Avatar src={state.user_info?.result.avatar} size="44" />
        </div>

        <TopBarRightUser element={settingRef.current} />
      </div>
      <div>
        <TopBarRightButton handleFun={() => {}}>
          <MdNotificationsActive size="22" />
        </TopBarRightButton>

        <TopBarRightNotice />
      </div>
      <TopBarRightButton handleFun={() => {}}>
        <BsFillChatDotsFill size="20" />
      </TopBarRightButton>
      <TopBarRightButton
        handleFun={() => navigate("/friends/list")}
        w="90"
        h="38"
        br="22px"
      >
        <span style={{ fontWeight: "bold" }}>搜索好友</span>
      </TopBarRightButton>
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
