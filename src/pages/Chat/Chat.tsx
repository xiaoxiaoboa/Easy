import React from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import { Search } from "../Friends/Friends"
import { NavLink } from "react-router-dom"
import { MyContext } from "../../context/context"
import { ActionTypes } from "../../types/reducer"
import { ConversationType, MessageType } from "../../types/chat.type"
import { CgAddR } from "react-icons/cg"
import GrougpChat from "./CreateGroup"

const Chat = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const [openCreate, setOpenCreate] = React.useState<boolean>(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (state.current_talk) {
      navigate(`message/${state.current_talk.conversation_id}`)
    }
  }, [])

  /* 来信消息时，需要把对话推到顶部 */
  React.useEffect(() => {
    const lastObj = state.unread_message[state.unread_message.length - 1]
    /* 先查找现在对话列表中是否有 */
    const newMessageObj = state.conversations.find(
      item => item.conversation_id === lastObj?.conversation_id
    )
    if (newMessageObj) {
      dispatch({
        type: ActionTypes.CONVERSATIONS,
        payload: [
          {
            ...newMessageObj,
            msg: lastObj.msg,
            user_name: lastObj.user.nick_name,
            msg_length:
              state.current_talk?.conversation_id === newMessageObj.conversation_id
                ? 0
                : newMessageObj.msg_length + 1
          },
          ...state.conversations.filter(
            i => i.conversation_id !== newMessageObj?.conversation_id
          )
        ]
      })
      if (state.current_talk?.conversation_id === newMessageObj.conversation_id) {
        dispatch({
          type: ActionTypes.UNREAD_MESSAGE,
          payload: [
            ...state.unread_message.filter(
              i => i.conversation_id !== newMessageObj.conversation_id
            )
          ]
        })
      }
    } else {
      /* 查找是好友，还是群组 */
      const newMessageObj = state.friends.find(
        i =>
          i.friend_id ===
          state.unread_message[state.unread_message.length - 1]?.conversation_id
      )
      if (newMessageObj) {
        const newData: ConversationType = {
          conversation_id: newMessageObj.friend_id,
          avatar: newMessageObj.avatar,
          name: newMessageObj.nick_name,
          user_name: state.unread_message[state.unread_message.length - 1].user.nick_name,
          msg: state.unread_message[state.unread_message.length - 1].msg,
          isGroup: false,
          msg_length: 1
        }
        dispatch({
          type: ActionTypes.CONVERSATIONS,
          payload: [newData, ...state.conversations]
        })
      } else {
        const newMessageObj = state.groups.find(
          i =>
            i.group_id ===
            state.unread_message[state.unread_message.length - 1]?.conversation_id
        )
        if (newMessageObj) {
          const newData: ConversationType = {
            conversation_id: newMessageObj.group_id,
            avatar: newMessageObj.group_avatar,
            name: newMessageObj.group_name,
            user_name:
              state.unread_message[state.unread_message.length - 1].user.nick_name,
            msg: state.unread_message[state.unread_message.length - 1].msg,
            isGroup: true,
            msg_length: 1
          }
          dispatch({
            type: ActionTypes.CONVERSATIONS,
            payload: [newData, ...state.conversations]
          })
        }
      }
    }
  }, [state.unread_message])

  /* 打开对话窗口 */
  const handleTalk = (data: ConversationType) => {
    if (state.current_talk?.conversation_id === data.conversation_id) return

    dispatch({ type: ActionTypes.CURRENT_TALK, payload: { ...data, msg_length: 0 } })

    dispatch({
      type: ActionTypes.CONVERSATIONS,
      payload: [
        ...state.conversations.map(i => {
          if (i.conversation_id === data.conversation_id) {
            return { ...i, msg_length: 0 }
          } else {
            return i
          }
        })
      ]
    })

    dispatch({
      type: ActionTypes.UNREAD_MESSAGE,
      payload: [
        ...state.unread_message.filter(i => i.conversation_id !== data.conversation_id)
      ]
    })
  }
  return (
    <Container>
      <Wrapper className="flex">
        <Left className="flex-c">
          <div className="flex-c" style={{ gap: "10px" }}>
            <div className="flex flex-alc flex-jcsb">
              <h2>聊天</h2>
              <CreateGroup
                className="flex flex-alc click"
                onClick={() => setOpenCreate(true)}
              >
                <CgAddR size={22} />
              </CreateGroup>
              {openCreate && <GrougpChat handleClose={setOpenCreate} />}
            </div>
            <Search padding="0" />
          </div>
          <List className="flex-c">
            {state.conversations.map((item, index) => (
              <ListItem
                key={item.conversation_id}
                data={item}
                handleTalk={handleTalk}
                unread_message={state.unread_message}
                current_talk={state.current_talk}
              />
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

interface ListItemProps {
  data: ConversationType
  handleTalk: (data: ConversationType) => void
  unread_message: MessageType[]
  current_talk: ConversationType | null
}
interface ThisItemProps {
  avatar: string
  name: string
  isActive: boolean
}
/* 左侧联系人 */
const ListItem: React.FC<ListItemProps> = props => {
  const { data, handleTalk, unread_message, current_talk } = props

  const ThisItem: React.FC<ThisItemProps> = props => {
    const { avatar, name, isActive } = props
    return (
      <ListItemContainer className="flex flex-alc" isActive={isActive}>
        <Avatar src={avatar} size="52" />
        <UserInfo className="flex-c">
          <UserName>{name}</UserName>
          <Notice className="flex" isActive={isActive}>
            {data.msg.length > 0 ? (
              <span>{`${data.user_name}：${data.msg}`}</span>
            ) : (
              <></>
            )}
          </Notice>
        </UserInfo>
        {current_talk?.conversation_id !== data.conversation_id && data.msg_length > 0 ? (
          <MessageCount className="flex flex-alc flex-jcc">
            {data.msg_length}
          </MessageCount>
        ) : (
          <></>
        )}
      </ListItemContainer>
    )
  }

  return (
    <NavLink
      key={data.conversation_id}
      to={`message/${data.conversation_id}`}
      onClick={() => handleTalk(data)}
    >
      {({ isActive, isPending }) => (
        <ThisItem avatar={data.avatar} isActive={isActive} name={data.name} />
      )}
    </NavLink>
  )
}

const Container = styled.div`
  height: calc(100vh - 60px);
  background-color: ${props => props.theme.colors.nav_bg};
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Left = styled.div`
  flex: 1;
  gap: 40px;
  padding: 14px;
  max-width: 360px;
  border-right: 1px solid #ccc;
`
const CreateGroup = styled.div`
  cursor: pointer;

  padding: 10px;
  border-radius: 50%;

  &:hover {
    background-color: ${p => p.theme.colors.hovercolor};
  }
`

const List = styled.div`
  max-height: 100%;
  overflow-y: auto;
  list-style: none;
  gap: 8px;
`

type ListItemContainerProps = { isActive: boolean }
const ListItemContainer = styled.div<ListItemContainerProps>`
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
const MessageCount = styled.div`
  margin-left: auto;
  border-radius: 20px;
  color: white;
  height: 22px;
  padding: 0 6px;
  font-size: 14px;
  font-weight: bold;
  background-color: ${p => p.theme.colors.message_count_bgcolor};
`

const UserInfo = styled.div`
  gap: 4px;
  max-width: 70%;
  overflow: hidden;
`
const UserName = styled.span`
  font-size: 17px;
`
const Notice = styled.div<ListItemContainerProps>`
  width: 100%;
  font-size: 14px;
  gap: 10px;
  color: ${p => (p.isActive ? "#ced0d3" : p.theme.colors.secondary)};

  & span {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
const Right = styled.div`
  flex: 3.5;
`
