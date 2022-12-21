import React from "react"
import styled from "styled-components"
import TopBarLeft from "./TopBarLeft"
import TopBarMiddle from "./TopBarMiddle"
import TopBarRight from "./TopBarRight"

const TopBar = () => {
  return (
    <Nav className="flex-r">
      <TopBarLeft />
      <TopBarMiddle />
      <TopBarRight />
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
  background-color: ${props => props.theme.colors.nav_bg};
  box-shadow: ${props => props.theme.colors.nav_shadow};
`
