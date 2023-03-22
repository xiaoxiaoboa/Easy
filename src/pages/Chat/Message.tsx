import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import MyInput from "../../components/MyInput/MyInput"
import { Search } from "../Friends/Friends"
import { VariableSizeList as VirtualList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import { BsCheck } from "react-icons/bs"
import { BiX } from "react-icons/bi"
import { MyContext } from "../../context/context"
import { useParams, useNavigate } from "react-router-dom"
import { MessageType, Message_type } from "../../types/chat.type"
import { FriendType } from "../../types/friend.type"
import { ActionTypes } from "../../types/reducer"
import { FiMoreHorizontal } from "react-icons/fi"
import EditGroup from "./EditGroup/EditGroup"
import { updateNotice } from "../../api/user.api"
import { usePrevious } from "ahooks"

const Message = () => {
  const params = useParams()
  const { state, dispatch } = React.useContext(MyContext)
  const listRef = React.useRef<any>(null)
  const sizeRef = React.useRef<{ [key: number]: number }>()
  const [openEditGroup, setOpenEditGroup] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const cm_cacheRef = React.useRef<MessageType[]>([])

  /* 缓存current_messages */
  React.useEffect(() => {
    cm_cacheRef.current = state.current_messages
  }, [state.current_messages])
  /* 进入聊天后，更新通知 */
  React.useEffect(() => {
    const res = state.unread_message.find(
      i => i.source_id === state.current_talk?.conversation_id
    )
    if (res && res.source_id[0] !== "g") {
      updateNotice({ source_id: res.source_id }, state.user_info?.token!)
    }
  }, [state.current_talk])

  React.useEffect(() => {
    if (!state.current_talk) {
      navigate("/chat")
    }

    return () => dispatch({ type: ActionTypes.CURRENT_TALK, payload: null })
  }, [])

  /* 获取聊天记录 */
  React.useEffect(() => {
    if (state.current_talk?.isGroup) {
      state.socket?.group.emit(
        "group_chat_history",
        state.current_talk.conversation_id,
        (data: MessageType[]) => {
          dispatch({ type: ActionTypes.CURRENT_MESSAGES, payload: data })
        }
      )
    } else {
      state.socket?.chat.emit(
        "private_chat_history",
        state.user_info?.result.user_id,
        params.id,
        (data: MessageType[]) => {
          dispatch({ type: ActionTypes.CURRENT_MESSAGES, payload: data })
        }
      )
    }

    return () => {
      dispatch({ type: ActionTypes.CURRENT_MESSAGES, payload: [] })
    }
  }, [params.id])

  React.useEffect(() => {
    listRef.current?.scrollToItem(state.current_messages.length, "end")
  }, [state.current_messages])

  /* 设置每个item高度 */
  const setSize = React.useCallback((index: number, size: number) => {
    sizeRef.current = { ...sizeRef.current, [index]: size }
    listRef.current?.resetAfterIndex(index)
  }, [])

  /* 获取item高度给虚拟列表组件 */
  const getSize = (index: number) => {
    if (sizeRef.current && sizeRef.current[index]) {
      return sizeRef.current[index] + 30
    }
    return 80
  }

  /* 发送消息 */
  const handleKeyDown = (value: string) => {
    let newMessage: MessageType
    if (state.current_talk?.isGroup) {
      newMessage = {
        user_id: state.user_info?.result.user_id!,
        createdAt: new Date().toLocaleString(),
        msg: value,
        msg_type: Message_type.TEXT,
        to_id: state.current_talk?.conversation_id!,
        user: {
          avatar: state.user_info?.result.avatar!,
          nick_name: state.user_info?.result.nick_name!
        },
        conversation_id: state.current_talk?.conversation_id!,
        status: 0
      }
      dispatch({
        type: ActionTypes.CURRENT_MESSAGES,
        payload: [...state.current_messages, newMessage]
      })
      state.socket?.group.emit(
        "group_chat",
        state.current_talk?.conversation_id!,
        newMessage,
        (res: any, err: any) => {
          dispatch({
            type: ActionTypes.CURRENT_MESSAGES,
            payload: [
              ...cm_cacheRef.current.map(i => {
                if (i.conversation_id === newMessage.conversation_id) {
                  return { ...i, status: res ? 1 : -1 }
                } else {
                  return i
                }
              })
            ]
          })
        }
      )
    } else {
      newMessage = {
        user_id: state.user_info?.result.user_id!,
        createdAt: new Date().toLocaleString(),
        msg: value,
        msg_type: Message_type.TEXT,
        to_id: state.current_talk?.conversation_id!,
        user: {
          avatar: state.user_info?.result.avatar!,
          nick_name: state.user_info?.result.nick_name!
        },
        conversation_id: state.user_info?.result.user_id!,
        status: 0
      }
      dispatch({
        type: ActionTypes.CURRENT_MESSAGES,
        payload: [...state.current_messages, newMessage]
      })
      state.socket?.chat.emit("private_chat", newMessage, (res: any, err: any) => {
        dispatch({
          type: ActionTypes.CURRENT_MESSAGES,
          payload: [
            ...cm_cacheRef.current.map(i => {
              if (i.conversation_id === newMessage.conversation_id) {
                return { ...i, status: res ? 1 : -1 }
              } else {
                return i
              }
            })
          ]
        })
      })
    }
  }

  return (
    <Container className="flex">
      <ChatWindow className="flex-c">
        <Top>
          <TopUserInfo className="flex flex-alc">
            <Avatar src={state.current_talk?.avatar} size="44" />
            <UserInfo className="flex-c">
              <TopUserName>{state.current_talk?.name}</TopUserName>
              <GroupDesc className="flex">
                {state.current_talk?.isGroup && (
                  <span>
                    {
                      state.groups.find(
                        i => i.group_id === state.current_talk?.conversation_id
                      )?.group_desc
                    }
                  </span>
                )}
              </GroupDesc>
            </UserInfo>
            {state.current_talk?.isGroup && (
              <EditBtn
                className="flex flex-alc"
                onClick={() => setOpenEditGroup(prev => !prev)}
              >
                <div className="flex flex-alc click">
                  <FiMoreHorizontal size={22} />
                </div>
              </EditBtn>
            )}
          </TopUserInfo>
        </Top>
        <Middle className="flex flex-jcc">
          <MiddleWrapper className="flex-c">
            <Messages>
              <AutoSizer>
                {({ width, height }) => (
                  <VirtualList
                    className="flex flex-jcc"
                    style={{ overflowY: "scroll" }}
                    height={height}
                    width={width}
                    itemCount={state.current_messages.length}
                    itemSize={getSize}
                    innerElementType={ListWrapper}
                    ref={listRef}
                    overscanCount={20}
                  >
                    {({ index, style }) => (
                      <div className="flex flex-alc" style={style}>
                        <Row
                          data={state.current_messages}
                          index={index}
                          setSize={setSize}
                          user_id={state.user_info?.result.user_id!}
                        />
                      </div>
                    )}
                  </VirtualList>
                )}
              </AutoSizer>
            </Messages>
          </MiddleWrapper>
        </Middle>
        <Bottom className="flex flex-alc flex-jcc">
          <BottomWrapper>
            <MyInput placeholder="ah~" handleKeyDown={handleKeyDown} />
          </BottomWrapper>
        </Bottom>
      </ChatWindow>
      {state.current_talk?.isGroup && openEditGroup && (
        <EditGroup
          group={
            state.groups.find(i => i.group_id === state.current_talk!.conversation_id)!
          }
        />
      )}
    </Container>
  )
}

export default Message

interface RowProps {
  user_id: string
  data: MessageType[]
  index: number
  setSize?: any
}
const Row: React.FC<RowProps> = React.memo(props => {
  const { data, index, setSize, user_id } = props
  const rowRef = React.useRef<HTMLDivElement>(null)

  /* 获取每个item元素的高度 */
  React.useEffect(() => {
    setSize(index, rowRef.current?.getBoundingClientRect().height)
  }, [setSize, index])

  return (
    <MessageItem ref={rowRef} className="flex-c">
      {data[index].user_id === user_id ? (
        <>
          <MessageRightTimeStamp className="flex flex-alc flex-jce messagestamp">
            <span>{data[index].createdAt}</span>
            <span>{data[index].user.nick_name}</span>
          </MessageRightTimeStamp>
          <MessageItemRight className="flex-rr right">
            <MessageAvatar className="flex-c flex-jce">
              <Avatar src={data[index].user.avatar} size="40" />
            </MessageAvatar>
            <MessageRightText>
              {data[index].msg}
              <MessageStatus className="flex flex-alc">
                {data[index].status === 1 ? (
                  <BsCheck size={20} color="#5fff50" />
                ) : data[index].status === -1 ? (
                  <BiX size={20} color="#ff2323" />
                ) : (
                  <></>
                )}
              </MessageStatus>
            </MessageRightText>
          </MessageItemRight>
        </>
      ) : (
        <>
          <MessageLeftTimeStamp className="flex flex-alc messagestamp">
            <span>{data[index].user.nick_name}</span>
            <span>{data[index].createdAt}</span>
          </MessageLeftTimeStamp>
          <MessageItemLeft className="flex left">
            <MessageAvatar className="flex-c flex-jce">
              <Avatar src={data[index].user.avatar} size="40" />
            </MessageAvatar>
            <MessageLeftText>
              {data[index].msg}
              <MessageStatus className="flex flex-alc"></MessageStatus>
            </MessageLeftText>
          </MessageItemLeft>
        </>
      )}
    </MessageItem>
  )
})

const ListWrapper = styled.div`
  position: relative;
  width: calc(100% - 80px) !important;
`

const Container = styled.div`
  flex: 1;
  height: 100%;
`
const ChatWindow = styled.div`
  flex: 1;
`
const UserInfo = styled.div`
  gap: 4px;
`

const Top = styled.div`
  flex: 1;
  max-height: 60px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`
const TopUserInfo = styled.div`
  gap: 14px;
  padding: 10px;
  border-radius: 8px;
`
const TopUserName = styled.span`
  font-size: 18px;
  font-weight: bold;
`
const EditBtn = styled.div`
  margin-left: auto;
  margin-right: 30px;
  cursor: pointer;

  & div {
    padding: 8px;
    border-radius: 50%;

    &:hover {
      background-color: ${p => p.theme.colors.hovercolor};
    }
  }
`
const GroupDesc = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.secondary};
`
const Middle = styled.div`
  flex: 8;
  overflow: hidden;
`
const MiddleWrapper = styled.div`
  width: 100%;
  height: 100%;
`
const Messages = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.bgcolor};
`
const MessageItem = styled.div`
  width: 100%;
  overflow: hidden;

  &:hover {
    & .messagestamp {
      opacity: 1;
    }
  }
`
const MessageItemLeft = styled.div`
  width: 100%;
  gap: 20px;
`
const MessageItemRight = styled(MessageItemLeft)``

const MessageAvatar = styled.div``
const MessageLeftText = styled.div`
  max-width: 60%;
  border-radius: 14px 14px 14px 0;
  padding: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: ${props => props.theme.colors.nav_bg};
`
const MessageRightText = styled(MessageLeftText)`
  border-radius: 14px 14px 0 14px;
  color: white;
  background-color: ${props => props.theme.colors.message_bgcolor};
`
const MessageRightTimeStamp = styled.span`
  font-size: 13px;
  gap: 10px;
  opacity: 0;
  color: ${props => props.theme.colors.secondary};
`
const MessageLeftTimeStamp = styled(MessageRightTimeStamp)``
const MessageStatus = styled.span`
  margin-left: 6px;
  position: relative;
  float: right;
  top: 8px;
`
const Bottom = styled.div`
  flex: 1;
  max-height: 80px;
`
const BottomWrapper = styled.div`
  width: 70%;
  border-radius: 18px;
  background-color: ${props => props.theme.colors.inputbtn_bg};
`
