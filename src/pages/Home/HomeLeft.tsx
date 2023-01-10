import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import Avatar from "../../components/Avatar/Avatar"
import { BsPeople, BsPeopleFill } from "react-icons/bs"
import friendsIcon from "../../assets/friends.png"

const HomeLeft = () => {
  return (
    <Container>
      <Wrapper className="flex">
        <Ul className="flex-c">
          <Li>
            <MyLink to="profile" icon={<Avatar size="40" isOnline />} text="Xiaoxin Yuan" />
          </Li>
          <Li>
            <MyLink to="#" classname="friends" text="搜索好友" />
          </Li>
          <Li>
            <MyLink to="#" classname="favorite" text="收藏夹" />
          </Li>
          <Li>
            <MyLink to="#" classname="message" text="Message" />
          </Li>
          <Li>
            <MyLink to="#" classname="star" text="特别关注" />
          </Li>
        </Ul>
      </Wrapper>
    </Container>
  )
}

export default HomeLeft

/* styled */
const Container = styled.div`
  flex: 2;
  padding: 10px;
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
