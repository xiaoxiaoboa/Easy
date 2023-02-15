import React from "react"
import styled from "styled-components"
import TopBarLeft from "./TopBarLeft"
import TopBarMiddle from "./TopBarMiddle"
import TopBarRight from "./TopBarRight"
import getLocalData from "../../utils/getLocalData"
import { DataType } from "../../types/index"

const TopBar = () => {
  const userData = getLocalData("user_info") as DataType | null

  return (
    <Nav className="flex-r">
      <TopBarLeft />
      <TopBarMiddle />
      {userData && <TopBarRight />}
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
  z-index: 1;
  /* max-width:1536px; */
  background-color: ${props => props.theme.colors.nav_bg};
  border-bottom: 1px solid;
  border-color: ${props => props.theme.colors.nav_border_bottom};
`
