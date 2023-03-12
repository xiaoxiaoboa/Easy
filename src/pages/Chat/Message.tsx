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
import { useParams } from "react-router-dom"
import { ConversationType, PrivateMessageType } from "../../types/chat.type"
import getTimeDiff from "../../utils/getTimeDiff"
import getLocalData from "../../utils/getLocalData"
import { FriendType } from "../../types/friend.type"

const Message = () => {
  const params = useParams()
  const { state, dispatch } = React.useContext(MyContext)
  const listRef = React.useRef<any>(null)
  const sizeRef = React.useRef<{ [key: number]: number }>()
  const [messages, setMessages] = React.useState<PrivateMessageType[]>([])

  React.useEffect(() => {
    state.socket?.chat.emit(
      "private_chat_history",
      state.user_info?.result.user_id,
      params.id,
      (data: PrivateMessageType[]) => {
        setMessages(data)
        listRef.current.scrollTo(
          getLocalData("conversations_lastOffset")[
            state.current_talk?.conversation_id!
          ] || 0
        )
      }
    )

    return () => {
      setMessages([])
    }
  }, [params.id])

  React.useEffect(() => {
    state.socket?.chat.on("private_message", (data: PrivateMessageType) => {
      if (data.user_id !== state.current_talk?.user_id) return
      setMessages(prev => [...prev, data])
    })

    return () => {
      state.socket?.chat.off(state.user_info?.result.user_id!)
    }
  }, [])

  React.useEffect(() => {
    listRef.current?.scrollToItem(messages.length, "end")
  }, [messages])

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
    const newMessage: PrivateMessageType = {
      user_id: state.user_info?.result.user_id!,
      createdAt: new Date().toLocaleString(),
      msg: value,
      to_id: state.current_talk?.friend_id!
    }
    setMessages(prev => [...prev, newMessage])
    state.socket?.chat.emit("private_chat", state.current_talk?.friend_id, newMessage)
  }

  return (
    <Container className="flex-c">
      <Top>
        <TopUserInfo className="flex flex-alc">
          <Avatar src={state.current_talk?.avatar} size="44" />
          <UserInfo className="flex-c">
            <TopUserName>{state.current_talk?.nick_name}</TopUserName>
            <LastOnline className="flex">
              <span>5小时前在线</span>
            </LastOnline>
          </UserInfo>
        </TopUserInfo>
      </Top>
      <Middle className="flex flex-jcc">
        <MiddleWrapper className="flex-c">
          <Messages>
            <AutoSizer>
              {({ width, height }) => (
                <VirtualList
                  className="flex flex-jcc"
                  style={{ overflowY: "scroll", scrollBehavior: "smooth" }}
                  height={height}
                  width={width}
                  itemCount={messages.length}
                  itemSize={getSize}
                  innerElementType={ListWrapper}
                  ref={listRef}
                  overscanCount={20}
                >
                  {({ index, style }) => (
                    <RowWrapper className="flex flex-alc" style={style}>
                      <Row
                        data={messages}
                        index={index}
                        setSize={setSize}
                        user_id={state.user_info?.result.user_id!}
                        friend={state.current_talk!}
                      />
                    </RowWrapper>
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
    </Container>
  )
}

export default Message

interface RowProps {
  user_id: string
  friend: FriendType
  data: PrivateMessageType[]
  index: number
  setSize?: any
}
const Row: React.FC<RowProps> = props => {
  const { data, index, setSize, user_id, friend } = props
  const rowRef = React.useRef<HTMLDivElement>(null)

  /* 获取每个item元素的高度 */
  React.useEffect(() => {
    setSize(index, rowRef.current?.getBoundingClientRect().height)
  }, [setSize, index])

  return (
    <MessageItem ref={rowRef} className="flex">
      {data[index].user_id === user_id ? (
        <MessageItemRight className="flex-rr right">
          <MessageAvatar className="flex-c flex-jce">
            <Avatar src={friend?.avatar} size="40" />
          </MessageAvatar>
          <MessageRightText>
            {data[index].msg}
            <MessageTextTimeStamp className="flex flex-alc" style={{ color: "#dcdcdc" }}>
              {getTimeDiff(data[index].createdAt)}
              <MessageStatus className="flex flex-alc">
                <BsCheck size={20} color="#5fff50" />
                {/* <BiX size={20} color="#ff2323" /> */}
              </MessageStatus>
            </MessageTextTimeStamp>
          </MessageRightText>
        </MessageItemRight>
      ) : (
        <MessageItemLeft className="flex left">
          <MessageAvatar className="flex-c flex-jce">
            <Avatar src={friend?.avatar} size="40" />
          </MessageAvatar>
          <MessageLeftText>
            {data[index].msg}
            <MessageTextTimeStamp className="flex flex-alc">
              {getTimeDiff(data[index].createdAt)}
              <MessageStatus className="flex flex-alc">
                <BsCheck size={20} color="#00b800" />
                {/* <BiX size={20} color="#d70000" /> */}
              </MessageStatus>
            </MessageTextTimeStamp>
          </MessageLeftText>
        </MessageItemLeft>
      )}
    </MessageItem>
  )
}

const ListWrapper = styled.div`
  position: relative;
  width: calc(100% - 80px) !important;
`
const RowWrapper = styled.div``

const Container = styled.div`
  flex: 1;
`
const UserInfo = styled.div`
  gap: 4px;
`

const Top = styled.div`
  flex: 1;
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
const LastOnline = styled.div`
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
const MessageTextTimeStamp = styled.span`
  margin-left: 6px;
  position: relative;
  float: right;
  top: 8px;
  font-size: 13px;
  color: ${props => props.theme.colors.secondary};
`
const MessageStatus = styled.span``
const Bottom = styled.div`
  flex: 1;
`
const BottomWrapper = styled.div`
  width: 70%;
  border-radius: 18px;
  background-color: ${props => props.theme.colors.inputbtn_bg};
`
