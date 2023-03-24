import React from "react"
import styled from "styled-components"
import { BsMoonStars } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
import ToggleTheme from "../ToggleTheme/ToggleTheme"
import { MyContext } from "../../context/context"
import { ActionTypes } from "../../types/reducer"
import Dialog from "./Popover"
import { TopBarRightPopoverProps } from "../../types"
import { useNavigate } from "react-router-dom"

const TopBarRightUser: React.FC<TopBarRightPopoverProps> = props => {
  const { isOpen } = props
  const { state, dispatch } = React.useContext(MyContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/", { replace: true })
    dispatch({ type: ActionTypes.USER_INFO, payload: null })
    dispatch({ type: ActionTypes.MYSOCKET, payload: null })
    dispatch({ type: ActionTypes.CONVERSATIONS, payload: [] })
    dispatch({ type: ActionTypes.UNREAD_MESSAGE, payload: [] })
    dispatch({ type: ActionTypes.FRIENDS, payload: [] })
  }

  return (
    <Container isOpen={isOpen}>
      <Wrapper className="flex-c">
        <Item style={{ cursor: "auto" }} className="flex flex-alc">
          <BsMoonStars size={22} />
          <span>夜间模式</span>
          <div style={{ marginLeft: "auto" }}>
            <ToggleTheme />
          </div>
        </Item>
        <Item className="flex flex-alc" onClick={handleLogout}>
          <FiLogOut size={22} />
          <span>退出</span>
        </Item>
      </Wrapper>
    </Container>
  )
}

export default TopBarRightUser

interface ContainerProps {
  isOpen: boolean
}
export const Container = styled.div<ContainerProps>`
  position: absolute;
  right: 10px;
  top: 65px;
  width: 360px;
  border-radius: 10px;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  transform: ${p => (p.isOpen ? "scale(1)" : "scale(0)")};

  background-color: ${p => p.theme.colors.nav_bg};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`
export const Wrapper = styled.div`
  padding: 10px;
  gap: 10px;
`
const Item = styled.div`
  padding: 12px;
  border-radius: 6px;
  gap: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.theme.colors.hovercolor};
  }
`
