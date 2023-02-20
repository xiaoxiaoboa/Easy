import React from "react"
import styled from "styled-components"
import TopBarLeft from "./TopBarLeft"
import TopBarMiddle from "./TopBarMiddle"
import TopBarRight from "./TopBarRight"
import { MyContext } from "../../context/context"

const TopBar = () => {
  const { state } = React.useContext(MyContext)

  return (
    <Nav className="flex-r">
      <TopBarLeft />
      <TopBarMiddle />
      {state.user_info && <TopBarRight />}
    </Nav>
  )
}

export default TopBar

/* styled */
const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 4;
  background-color: ${props => props.theme.colors.nav_bg};
  border-bottom: 1px solid;
  border-color: ${props => props.theme.colors.nav_border_bottom};
`
