import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Avatar from "../../components/Avatar/Avatar"
import { BsPeople, BsPeopleFill } from "react-icons/bs"
import { UserType } from "../../types/user.type"
import { ConversationType } from "../../types/chat.type"

interface HomeLeftProps {
  user_info: UserType | undefined
}
const HomeLeft: React.FC<HomeLeftProps> = props => {
  const { user_info } = props
  return (
    <Container>
      <Wrapper className="flex">
        <Ul className="flex-c">
          <Li>
            <MyLink
              to={`profile/${user_info?.user_id}`}
              icon={<Avatar src={user_info?.avatar} size="40" />}
              text={user_info!.nick_name}
            />
          </Li>
          <Li>
            <MyLink to="friends/list" classname="friends" text="搜索好友" />
          </Li>
          <Li>
            <MyLink to="friends/favorites" classname="favorite" text="收藏夹" />
          </Li>
          <Li>
            <MyLink to="chat" classname="message" text="Message" />
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
  position: fixed;
  left: 0;
  width: 320px;
  height: 100%;

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
const Li = styled.li`
  border-radius: 8px;
  z-index: 2;
  &:hover {
    background-color: ${props => props.theme.colors.hovercolor};
  }
  &:active {
    background-color: ${props => props.theme.colors.clicked_hovercolor};
  }
`

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
`
