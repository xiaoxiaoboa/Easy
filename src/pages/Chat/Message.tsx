import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import MyInput from "../../components/MyInput/MyInput"
import { Search } from "../Friends/Friends"
import { VariableSizeList as VirtualList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import { BsCheck, BsExclamation } from "react-icons/bs"
import { RiErrorWarningLine } from "react-icons/ri"
import { BiX } from "react-icons/bi"
import { MyContext } from "../../context/context"
import { useParams, useNavigate } from "react-router-dom"
import { MessageType, Message_type } from "../../types/chat.type"
import { ActionTypes } from "../../types/reducer"
import { FiMoreHorizontal } from "react-icons/fi"
import EditGroup from "./EditGroup/EditGroup"
import { messageUpload, updateNotice } from "../../api/user.api"
import { TbPhoto } from "react-icons/tb"
import Upload from "../../components/Upload"
import getUnionUrl from "../../utils/getUnionUrl"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import useRequested from "../../hooks/useRequested"
import { FriendType } from "../../types/friend.type"
import useSnackbar from "../../hooks/useSnackbar"

const Message = () => {
  const params = useParams()
  const { state, dispatch } = React.useContext(MyContext)
  const listRef = React.useRef<any>(null)
  const sizeRef = React.useRef<{ [key: number]: number }>()
  const [openEditGroup, setOpenEditGroup] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const cm_cacheRef = React.useRef<MessageType[]>([])
  const { requestedOpt } = useRequested()
  const [findFriend, setFindFriend] = React.useState<FriendType>()
  const [openSnackbar] = useSnackbar()

  React.useEffect(() => {
    setFindFriend(state.friends.find(i => i.friend_id === params.id))
    console.log(params.id)
  }, [state.friends])
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
  const handleMessage = (value: string, type?: Message_type) => {
    let newMessage: MessageType
    if (state.current_talk?.isGroup) {
      newMessage = {
        user_id: state.user_info?.result.user_id!,
        createdAt: new Date().toLocaleString(),
        msg: value,
        msg_type: type || Message_type.TEXT,
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
      handleSend(newMessage)
    } else {
      newMessage = {
        user_id: state.user_info?.result.user_id!,
        createdAt: new Date().toLocaleString(),
        msg: value,
        msg_type: type || Message_type.TEXT,
        to_id: state.current_talk?.conversation_id!,
        user: {
          avatar: state.user_info?.result.avatar!,
          nick_name: state.user_info?.result.nick_name!
        },
        conversation_id: state.user_info?.result.user_id!,
        status: findFriend?.friendship ? 0 : -1
      }
      dispatch({
        type: ActionTypes.CURRENT_MESSAGES,
        payload: [...state.current_messages, newMessage]
      })
      if (findFriend?.friendship) {
        handleSend(newMessage)
      } else {
        openSnackbar("和对方不是双向好友关系", 3000)
      }
    }
  }

  /* 发送文件 */
  const hanleFiles: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file.type.includes("image")) {
        messageUpload(
          file,
          state.user_info?.result.user_id!,
          state.current_talk?.conversation_id!,
          state.user_info?.token!,
          state.current_talk?.isGroup
        ).then(val => {
          if (val.code === 1) {
            handleMessage(val.data, Message_type.IMAGE)
          } else {
            requestedOpt(val)
          }
        })
      } else if (file.type.includes("video")) {
        messageUpload(
          file,
          state.user_info?.result.user_id!,
          state.current_talk?.conversation_id!,
          state.user_info?.token!,
          state.current_talk?.isGroup
        ).then(val => {
          if (val.code === 1) {
            handleMessage(val.data, Message_type.VIDEO)
          } else {
            requestedOpt(val)
          }
        })
      }
    }
  }

  const handleSend = (data: MessageType) => {
    if (state.current_talk?.isGroup) {
      state.socket?.group.emit(
        "group_chat",
        state.current_talk?.conversation_id!,
        data,
        (res: any, err: any) => {
          dispatch({
            type: ActionTypes.CURRENT_MESSAGES,
            payload: [
              ...cm_cacheRef.current.map(i => {
                if (i.conversation_id === data.conversation_id) {
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
      state.socket?.chat.emit("private_chat", data, (res: any, err: any) => {
        if (data.msg_type === Message_type.IMAGE || data.msg_type === Message_type.VIDEO)
          return

        if (res) {
          dispatch({
            type: ActionTypes.CURRENT_MESSAGES,
            payload: [
              ...cm_cacheRef.current.map(i => {
                if (i.conversation_id === data.conversation_id) {
                  return { ...i, status: res ? 1 : -1 }
                } else {
                  return i
                }
              })
            ]
          })
        } else {
          openSnackbar("和对方不是双向好友关系", 3000)
        }
      })
    }
  }

  return (
    <Container className="flex">
      <ChatWindow className="flex-c">
        <Top>
          <TopUserInfo className="flex flex-alc">
            <Avatar
              src={state.current_talk?.avatar}
              size="44"
            />
            <UserInfo className="flex-c">
              <TopUserName
                className="flex flex-alc"
                style={{ gap: 10 }}
              >
                {state.current_talk?.name}
                {!findFriend?.friendship && !state.current_talk?.isGroup && (
                  <div title="你和对方不是双向好友关系">
                    <RiErrorWarningLine
                      size={20}
                      color="red"
                    />
                  </div>
                )}
              </TopUserName>
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
                      <div
                        className="flex flex-alc"
                        style={style}
                      >
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
          <Upload
            id="attach"
            accept="*"
            handleChange={hanleFiles}
          >
            <AttachButton className="flex flex-alc click">
              <TbPhoto
                size={22}
                className=""
              />
            </AttachButton>
          </Upload>
          <BottomWrapper>
            <MyInput
              placeholder="ah~"
              handleKeyDown={handleMessage}
            />
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

  const messageType = (data: MessageType) => {
    switch (data.msg_type) {
      case Message_type.TEXT:
        return data.user_id === user_id ? (
          <MessageRightText>
            {data.msg}
            <MessageStatus className="flex flex-alc">
              {data.status === 1 ? (
                <BsCheck
                  size={20}
                  color="#5fff50"
                />
              ) : data.status === -1 ? (
                <BiX
                  size={20}
                  color="#ff2323"
                />
              ) : (
                <></>
              )}
            </MessageStatus>
          </MessageRightText>
        ) : (
          <MessageLeftText>{data.msg}</MessageLeftText>
        )
      case Message_type.IMAGE:
        return (
          <MessageMediaWrapper className="flex">
            <Zoom>
              <img src={getUnionUrl(data.msg)} />
            </Zoom>
          </MessageMediaWrapper>
        )
      case Message_type.VIDEO:
        return (
          <MessageMediaWrapper className="flex">
            <video
              controls
              src={getUnionUrl(data.msg)}
            />
          </MessageMediaWrapper>
        )
      default:
        break
    }
  }

  return (
    <MessageItem
      ref={rowRef}
      className="flex-c"
    >
      {data[index].user_id === user_id ? (
        <>
          <MessageItemRight className="flex-rr right">
            <MessageAvatar className="flex-c flex-jce">
              <Avatar
                src={data[index].user.avatar}
                size="40"
              />
            </MessageAvatar>
            {messageType(data[index])}
          </MessageItemRight>
          <MessageRightTimeStamp className="flex flex-alc flex-jce messagestamp">
            <span>{data[index].createdAt}</span>
            <span>{data[index].user.nick_name}</span>
          </MessageRightTimeStamp>
        </>
      ) : (
        <>
          <MessageItemLeft className="flex left">
            <MessageAvatar className="flex-c flex-jce">
              <Avatar
                src={data[index].user.avatar}
                size="40"
              />
            </MessageAvatar>
            {messageType(data[index])}
          </MessageItemLeft>
          <MessageLeftTimeStamp className="flex flex-alc messagestamp">
            <span>{data[index].user.nick_name}</span>
            <span>{data[index].createdAt}</span>
          </MessageLeftTimeStamp>
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
const TopUserName = styled.div`
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
  gap: 16px;
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
const MessageMediaWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;

  & img,
  & video {
    height: 200px;
  }
  & img {
    object-fit: cover;
  }
`
const Bottom = styled.div`
  flex: 1;
  max-height: 80px;
  gap: 10px;
`
const BottomWrapper = styled.div`
  width: 70%;
  border-radius: 18px;
  background-color: ${props => props.theme.colors.inputbtn_bg};
`
const AttachButton = styled.div`
  padding: 8px;
  border-radius: 50%;
  color: ${p => p.theme.colors.secondary};

  cursor: pointer;
  &:hover {
    background-color: ${p => p.theme.colors.hovercolor};
  }
`
