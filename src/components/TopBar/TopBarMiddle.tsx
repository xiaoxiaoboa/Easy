import React from "react"
import { useLocation, NavLink } from "react-router-dom"
import { AiFillHome, AiOutlineHome } from "react-icons/ai"
import { BsPeople, BsPeopleFill } from "react-icons/bs"
import styled from "styled-components"

const TopBarMiddle = () => {
  const location = useLocation()
  const isHome = React.useMemo(() => location.pathname === "/", [location])
  const isFriends = React.useMemo(() => location.pathname === "/friends", [location])
  return (
    <Container className="flex flex-alc flex-jcc" isHome={isHome} isFriends={isFriends}>
      <div className="nav-btn flex-r flex-alc">
        <NavLink to="/" className="homewrapper">
          <div className="underline"></div>
          <div className="home flex flex-alc flex-jcc" title="首页">
            {isHome ? <AiFillHome size="28" /> : <AiOutlineHome size="28" />}
          </div>
        </NavLink>
        <NavLink to="friends" className="friendswrapper">
          <div className="underline"></div>
          <div className="friends flex flex-alc flex-jcc" title="好友">
            {isFriends ? <BsPeopleFill size="28" /> : <BsPeople size="28" />}
          </div>
        </NavLink>
      </div>
    </Container>
  )
}
export default React.memo(TopBarMiddle)

interface ContainerStyleProps {
  isHome: boolean
  isFriends: boolean
}
const Container = styled.div<ContainerStyleProps>`
  width: 100%;

  & .nav-btn {
    height: 100%;
    gap: 40px;
  }

  & .homewrapper,
  .friendswrapper {
    width: 110px;
    height: 100%;
    position: relative;
    overflow: hidden;

    & .underline {
      position: absolute;
      height: 3px;
      width: 100%;
      background-color: ${props => props.theme.colors.primary};
      bottom: -3px;
      transition: transform 0.2s linear;
    }
  }
  & .home > svg {
    color: ${props =>
      props.isHome ? props.theme.colors.primary : props.theme.colors.nav_icon};
  }
  .friends > svg {
    color: ${props =>
      props.isFriends ? props.theme.colors.primary : props.theme.colors.nav_icon};
  }

  & .home,
  .friends {
    position: absolute;
    width: 110px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    top: 6px;

    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }
  }
`
