import React from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import { Search } from "../Friends/Friends"
import { NavLink } from "react-router-dom"
import { MyContext } from "../../context/context"
import { ActionTypes } from "../../types/reducer"
import { ConversationType, Message_type } from "../../types/chat.type"
import { CgAddR } from "react-icons/cg"
import GrougpChat from "./CreateGroup"

const Chat = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const [openCreate, setOpenCreate] = React.useState<boolean>(false)

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
        ...state.unread_message.map(i => {
          if (i.source_id === data.conversation_id) {
            return { ...i, done: 1 }
          } else {
            return i
          }
        })
      ]
    })
  }
  return (
    <Container>
      <Wrapper className="flex">
        <Left className="flex-c">
          <div
            className="flex-c"
            style={{ gap: "10px" }}
          >
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
  current_talk: ConversationType | null
}
interface ThisItemProps {
  avatar: string
  name: string
  isActive: boolean
}
/* 左侧联系人 */
const ListItem: React.FC<ListItemProps> = props => {
  const { data, handleTalk, current_talk } = props

  const messageType = (data: ConversationType) => {
    switch (data.msg_type) {
      case Message_type.TEXT:
        return data.msg
      case Message_type.IMAGE:
        return "[图片]"
      case Message_type.VIDEO:
        return "[视频]"
      default:
        break
    }
  }

  const ThisItem: React.FC<ThisItemProps> = props => {
    const { avatar, name, isActive } = props
    return (
      <ListItemContainer
        className="flex flex-alc"
        isActive={isActive}
      >
        <Avatar
          src={avatar}
          size="52"
        />
        <UserInfo className="flex-c">
          <UserName>{name}</UserName>
          <Notice
            className="flex"
            isActive={isActive}
          >
            {data.msg.length > 0 ? (
              <span>{`${data.user_name}：${messageType(data)}`}</span>
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
        <ThisItem
          avatar={data.avatar}
          isActive={isActive}
          name={data.name}
        />
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
