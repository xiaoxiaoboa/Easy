import React from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import { Search } from "../Friends/Friends"
import { NavLink } from "react-router-dom"
import { MyContext } from "../../context/context"
import { ActionTypes } from "../../types/reducer"
import { ConversationType, MessageSendType } from "../../types/chat.type"
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
    /* 先查找现在对话列表中是否有 */
    const newMessageObj = state.conversations.find(item => {
      if ("friend_id" in item) {
        return (
          item.user_id === state.unread_message[state.unread_message.length - 1]?.to_id
        )
      } else {
        return (
          item.conversation_id ===
          state.unread_message[state.unread_message.length - 1]?.to_id
        )
      }
    })
    if (newMessageObj) {
      dispatch({
        type: ActionTypes.CONVERSATIONS,
        payload: [
          newMessageObj,
          ...state.conversations.filter(
            i => i.conversation_id !== newMessageObj?.conversation_id
          )
        ]
      })
    } else {
      /* 查找是好友，还是群组 */
      const newMessageObj = state.friends.find(
        i => i.friend_id === state.unread_message[0]?.conversation_id
      )
      if (newMessageObj) {
        const newData: ConversationType = {
          conversation_id: newMessageObj.friend_id,
          ...newMessageObj
        }
        dispatch({
          type: ActionTypes.CONVERSATIONS,
          payload: [newData, ...state.conversations]
        })
      } else {
        const newMessageObj = state.groups.find(
          i => i.group_id === state.unread_message[0]?.conversation_id
        )
        if (newMessageObj) {
          const newData: ConversationType = {
            conversation_id: newMessageObj.group_id,
            ...newMessageObj
          }
          console.log(newData)
          dispatch({
            type: ActionTypes.CONVERSATIONS,
            payload: [newData, ...state.conversations]
          })
        }
      }
    }
  }, [state.unread_message])

  const handleTalk = (data: ConversationType) => {
    if (state.current_talk?.conversation_id === data.conversation_id) return

    dispatch({ type: ActionTypes.CURRENT_TALK, payload: data })

    if ("friend_id" in data) {
      dispatch({
        type: ActionTypes.UNREAD_MESSAGE,
        payload: [
          ...state.unread_message.filter(item => item.user_id !== data.conversation_id)
        ]
      })
    } else {
      dispatch({
        type: ActionTypes.UNREAD_MESSAGE,
        payload: [
          ...state.unread_message,
          ...state.unread_message.filter(
            item => item.conversation_id !== data.conversation_id
          )
        ]
      })
    }
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
  unread_message: MessageSendType[]
}
interface ThisItemProps {
  avatar: string
  name: string
  isActive: boolean
}
/* 左侧联系人 */
const ListItem: React.FC<ListItemProps> = props => {
  const { data, handleTalk, unread_message } = props

  const msgs = React.useMemo(() => {
    return "friend_id" in data
      ? unread_message.filter(i => i.user_id === data.friend_id)
      : unread_message.filter(i => i.conversation_id === data.conversation_id)
  }, [unread_message])

  /* 筛选出最新消息 */
  const handleNewMessage = React.useCallback(() => {
    // if (msgs.length < 1) return <></>

    const res =
      msgs.length > 0 ? `${msgs[0]?.user.nick_name}：${msgs[msgs.length - 1].msg}` : ""

    return res
  }, [unread_message])

  /* 未读消息数量 */
  const HandleNewMessageCount = React.useCallback(() => {
    const length = msgs.length
    return length > 0 ? (
      <MessageCount className="flex flex-alc flex-jcc">{length}</MessageCount>
    ) : (
      <></>
    )
  }, [unread_message])

  const ThisItem: React.FC<ThisItemProps> = props => {
    const { avatar, name, isActive } = props
    return (
      <ListItemContainer className="flex flex-alc" isActive={isActive}>
        <Avatar src={avatar} size="52" />
        <UserInfo className="flex-c">
          <UserName>{name}</UserName>
          <Notice className="flex" isActive={isActive}>
            <span>{handleNewMessage()}</span>
          </Notice>
        </UserInfo>
        <HandleNewMessageCount />
      </ListItemContainer>
    )
  }

  return "friend_id" in data ? (
    <NavLink
      key={data.friend_id}
      to={`message/${data.conversation_id}`}
      onClick={() => handleTalk(data)}
    >
      {({ isActive, isPending }) => (
        <ThisItem avatar={data.avatar} isActive={isActive} name={data.nick_name} />
      )}
    </NavLink>
  ) : (
    <NavLink
      key={data.group_id}
      to={`message/${data.conversation_id}`}
      onClick={() => handleTalk(data)}
    >
      {({ isActive, isPending }) => (
        <ThisItem avatar={data.group_avatar} isActive={isActive} name={data.group_name} />
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
