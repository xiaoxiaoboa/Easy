import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Avatar from "../../components/Avatar/Avatar"
import { BsPeople, BsPeopleFill } from "react-icons/bs"
import friendsIcon from "../../assets/friends.png"
import getUnionUrl from "../../utils/getUnionUrl"
import { MyContext } from "../../context/context"

const HomeLeft = () => {
  const { state } = React.useContext(MyContext)
  console.log(getUnionUrl(state.user_info?.result.avatar))
  return (
    <Container>
      <Wrapper className="flex">
        <Ul className="flex-c">
          <Li>
            <MyLink
              to="profile"
              icon={
                <Avatar
                  src={getUnionUrl(state.user_info?.result.avatar)}
                  size="40"
                  isOnline
                />
              }
              text={state.user_info?.result.nick_name || "请登录！"}
            />
          </Li>
          <Li>
            <MyLink to="friends/list" classname="friends" text="搜索好友" />
          </Li>
          <Li>
            <MyLink to="friends/favorites" classname="favorite" text="收藏夹" />
          </Li>
          <Li>
            <MyLink to="#" classname="message" text="Message" />
          </Li>
          <Li>
            <MyLink to="friends/liked" classname="star" text="特别关注" />
          </Li>
        </Ul>
      </Wrapper>
    </Container>
  )
}

export default HomeLeft

/* styled */
const Container = styled.div`
  padding: 10px;
  position: absolute;
  left: 0;
  width: 320px;

  @media (max-width: 1100px) {
    display: none;
  }
`
const Wrapper = styled.div`
  position: sticky;
  top: 70px;
`
const Ul = styled.ul`
  list-style: none;
  width: 100%;
  gap: 4px;
`
const Li = styled.li``

/* 封装NavLink */
interface NavLinkProps {
  to: string
  text: string
  icon?: React.ReactElement
  classname?: string
}
const MyLink: React.FC<NavLinkProps> = props => {
  const { to, icon, text, classname } = props
  return (
    <Link to={to}>
      <NavLinkWrapper className="flex-r flex-alc">
        <div className={`icon ${classname}`}>{icon}</div>
        <div className="text">{text}</div>
      </NavLinkWrapper>
    </Link>
  )
}
/* styled */
const NavLinkWrapper = styled.div`
  gap: 14px;
  padding: 8px;
  border-radius: 8px;

  & .friends,
  & .favorite,
  & .message,
  & .star {
    width: 32px;
    height: 32px;
    margin: 4px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${props => props.theme.icon.icons});
  }

  & .friends {
    background-position: center -30px;
  }
  & .favorite {
    background-position: center -65px;
  }
  & .message {
    background-position: center -98px;
  }
  & .star {
    background-position: center -135px;
  }

  &:hover {
    background-color: ${props => props.theme.colors.hovercolor};
  }
`
