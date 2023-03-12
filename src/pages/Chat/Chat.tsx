import React from "react"
import { Outlet, useParams } from "react-router-dom"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import { Search } from "../Friends/Friends"
import { NavLink } from "react-router-dom"
import { MyContext } from "../../context/context"
import { ActionTypes } from "../../types/reducer"
import { ConversationType } from "../../types/chat.type"

const Chat = () => {
  const { state, dispatch } = React.useContext(MyContext)

  const handleTalk = (data: ConversationType) => {
    dispatch({ type: ActionTypes.CURRENT_TALK, payload: data })
  }

  return (
    <Container>
      <Wrapper className="flex">
        <Left className="flex-c">
          <div className="flex-c" style={{ gap: "10px" }}>
            <h2>聊天</h2>
            <Search padding="0" />
          </div>
          <List className="flex-c">
            {state.conversations.map(item => (
              <NavLink
                key={item.friend_id}
                to={`message/${item.friend_id}`}
                onClick={() => handleTalk(item)}
              >
                {({ isActive, isPending }) => (
                  <ListItem className="flex flex-alc" isActive={isActive}>
                    <Avatar src={item.avatar} size="52" />
                    <UserInfo className="flex-c">
                      <UserName>{item.nick_name}</UserName>
                      <Notice className="flex" isActive={isActive}>
                        <span>hello</span>
                        <span>5小时前</span>
                      </Notice>
                    </UserInfo>
                  </ListItem>
                )}
              </NavLink>
            ))}
          </List>
        </Left>
        <Right className="flex-c">
          <Outlet />
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  height: calc(100vh - 60px);
  background-color: ${props => props.theme.colors.nav_bg};
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Left = styled.div`
  flex: 1;
  gap: 40px;
  padding: 14px;
  border-right: 1px solid #ccc;
`

const List = styled.div`
  max-height: 100%;
  overflow-y: auto;
  list-style: none;
  gap: 8px;
`

type ListItemProps = { isActive: boolean }
const ListItem = styled.div<ListItemProps>`
  gap: 14px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  color: ${p => (p.isActive ? "white" : "inherit")};
  background-color: ${p => (p.isActive ? p.theme.colors.message_bgcolor : "unset")};

  &:hover {
    background-color: ${p =>
      p.isActive ? p.theme.colors.message_bgcolor : p.theme.colors.hovercolor};
  }
`
const UserInfo = styled.div`
  gap: 4px;
`
const UserName = styled.span`
  font-size: 17px;
`
const Notice = styled.div<ListItemProps>`
  font-size: 14px;
  color: ${p => (p.isActive ? "#ced0d3" : p.theme.colors.secondary)};
  gap: 10px;
`
const Right = styled.div`
  flex: 3.5;
`
