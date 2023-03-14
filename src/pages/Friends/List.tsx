import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import bg from "../../assets/bg.jpg"
import Avatar from "../../components/Avatar/Avatar"
import { MyContext } from "../../context/context"
import { FriendType } from "../../types/friend.type"
import { ActionTypes } from "../../types/reducer"
import { nanoid } from "nanoid"

const List = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const navigate = useNavigate()

  const handleTalk = (data: FriendType) => {
    navigate(`/chat/message/${data.friend_id}`)

    const isExist = state.conversations.some(
      item => (item as FriendType).friend_id === data.friend_id
    )
    if (isExist) {
      const existedItem = state.conversations.find(
        item => (item as FriendType).friend_id === data.friend_id
      )
      dispatch({ type: ActionTypes.CURRENT_TALK, payload: existedItem! })
    } else {
      dispatch({
        type: ActionTypes.CONVERSATIONS,
        payload: [...state.conversations, { ...data, conversation_id: data.friend_id }]
      })
      dispatch({
        type: ActionTypes.CURRENT_TALK,
        payload: { ...data, conversation_id: data.friend_id }
      })
    }
  }

  return (
    <Container className="flex-c">
      <Wrapper className="flex">
        {state.friends.map(item => (
          <Card key={item.friend_id} name={item.nick_name} avatar={item.avatar}>
            <CardButton className="flex">
              <button onClick={() => handleTalk(item)}>发消息</button>
              <button>删除</button>
            </CardButton>
          </Card>
        ))}
      </Wrapper>
    </Container>
  )
}

export default List

interface CardProps {
  name: string
  avatar: string
  children: React.ReactElement
}
export const Card = (props: CardProps) => {
  const { name, avatar, children } = props
  return (
    <CardContainer>
      <CardWrapper className="flex-c flex-alc">
        <UserAvatar>
          <Avatar src={avatar} size="60" />
        </UserAvatar>
        <Name>{name}</Name>
        {children}
      </CardWrapper>
    </CardContainer>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const Wrapper = styled.div`
  padding: 30px;
  gap: 34px;
  flex-wrap: wrap;
`
const CardContainer = styled.div`
  height: max-content;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.nav_bg};
`
const CardWrapper = styled.div`
  width: 240px;
  gap: 6px;
  padding: 14px 0;
  overflow: hidden;
`
const UserAvatar = styled.div`
  border: 3px solid;
  border-color: ${props => props.theme.colors.nav_bg};
  border-radius: 50%;
`
const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Desc = styled.p`
  font-size: 14px;
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${props => props.theme.colors.secondary};
`
export const CardButton = styled.div`
  gap: 8px;
  width: 100%;
  padding: 0 10px;
  margin-top: 10px;

  & button {
    border: none;
    outline: none;
    color: white;
    flex: 1;
    font-size: 17px;
    border-radius: 4px;
    cursor: pointer;
    padding: 3px 0;
    background-color: ${props => props.theme.colors.primary};
  }
  & button:last-child {
    background-color: #eb455f;
  }
`
