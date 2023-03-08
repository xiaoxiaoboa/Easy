import React from "react"
import styled from "styled-components"
import { FiUserPlus, FiList } from "react-icons/fi"
import { BsCollection, BsChevronRight } from "react-icons/bs"
import { RiChatHeartLine } from "react-icons/ri"
import { NavLink, Outlet } from "react-router-dom"
import { BsChatText } from "react-icons/bs"

const Friends = () => {
  return (
    <Container className="flex">
      <Left>
        <LeftWrapper>
          <h2>好友</h2>
          <Search />
          <ul className="flex-c">
            <MyNavLink path="list">
              <li>
                <FiList size={25} />
                好友列表
                <BsChevronRight size={20} />
              </li>
            </MyNavLink>
            <MyNavLink path="favorites">
              <li>
                <BsCollection size={23} />
                收藏夹
                <BsChevronRight size={20} />
              </li>
            </MyNavLink>
            <MyNavLink path="liked">
              <li>
                <RiChatHeartLine size={25} />
                特别关注
                <BsChevronRight size={20} />
              </li>
            </MyNavLink>
          </ul>
        </LeftWrapper>
      </Left>
      <Right>
        <Outlet />
      </Right>
    </Container>
  )
}

export default Friends

interface MyNavLinkProps {
  path: string
  children: React.ReactElement
}
const MyNavLink = (props: MyNavLinkProps) => {
  const { path, children } = props
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "leftNavClass" : undefined)}
    >
      {children}
    </NavLink>
  )
}

const Container = styled.div`
  height: 100%;
`

const Left = styled.div`
  flex: 0.5;
  position: fixed;
  padding: 16px;
  height: inherit;
  background-color: ${props => props.theme.colors.nav_bg};
`
const LeftWrapper = styled.div`
  & h2 {
    margin-left: 10px;
  }

  & ul {
    list-style: none;
    width: 300px;
    gap: 8px;
    margin-top: 14px;

    & li {
      display: flex;
      align-items: center;
      padding: 13px;
      font-size: 17px;
      border-radius: 8px;
      cursor: pointer;

      & svg:last-child {
        margin-left: auto;
      }
      & svg:first-child {
        margin-right: 14px;
      }

      &:hover {
        background-color: ${props => props.theme.colors.hovercolor};
      }
    }

    & .leftNavClass {
      & li svg:last-child {
        color: ${props => props.theme.colors.primary};
      }
    }
  }
`
const Right = styled.div`
  padding-left: 340px;
  width: 100%;
  height: 100%;
`

interface SearchProps {
  padding?: string
}
export const Search: React.FC<SearchProps> = props => {
  const { padding } = props
  return (
    <SearchContainer>
      <SearchWrapper style={{ padding: padding ? padding : "10px 10px 0 10px" }}>
        <input type="text" placeholder="搜索" />
      </SearchWrapper>
    </SearchContainer>
  )
}
const SearchContainer = styled.div``
const SearchWrapper = styled.div`
  padding: 10px 10px 0 10px;

  & input {
    border: 1px solid transparent;
    outline: none;
    background-color: ${props => props.theme.colors.nav_inputbg};
    padding: 10px;
    border-radius: 20px;
    width: 100%;

    &:focus {
      border: 1px solid;
      border-color: ${props => props.theme.colors.primary};
    }
  }
`
