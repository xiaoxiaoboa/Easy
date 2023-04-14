import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { MyContext } from "../../context/context"
import { TopBarRightPopoverProps } from "../../types"
import { ConversationType, Message_type } from "../../types/chat.type"
import { UnReadMessageType } from "../../types/notice.type"
import { ActionTypes } from "../../types/reducer"
import getTimeDiff from "../../utils/getTimeDiff"
import Avatar from "../Avatar/Avatar"
import { Container, Wrapper } from "./TopBarRightUser"

type TopBarRightMessageProps = {} & TopBarRightPopoverProps

const TopBarRightMessage: React.FC<TopBarRightMessageProps> = props => {
  const { isOpen, setOpen } = props
  const { state, dispatch } = React.useContext(MyContext)
  const navigate = useNavigate()

  const handleClick = (item: UnReadMessageType) => {
    const isGroup = state.groups.find(i => i.group_id === item.source.user_id)
    const findeItem = state.conversations.find(
      i => i.conversation_id === item.source.user_id
    )
    dispatch({
      type: ActionTypes.CURRENT_TALK,
      payload: state.conversations.filter(
        i => i.conversation_id === item.source.user_id
      )[0]
    })
    dispatch({
      type: ActionTypes.UNREAD_MESSAGE,
      payload: [
        ...state.unread_message.map(i => {
          if (i.source.user_id === item.source.user_id) {
            return { ...i, done: 1 }
          } else {
            return i
          }
        })
      ]
    })

    if (findeItem) {
      dispatch({
        type: ActionTypes.CONVERSATIONS,
        payload: [
          {
            ...findeItem,
            msg_length: 0
          },
          ...state.conversations.filter(i => i.conversation_id !== item.source.user_id)
        ]
      })
    } else {
      const newData: ConversationType = {
        conversation_id: item.source.user_id,
        avatar: isGroup ? isGroup.group_avatar : item.source.avatar,
        name: isGroup ? isGroup.group_name : item.source.nick_name,
        user_name: item.source.nick_name,
        msg: item.message.msg,
        msg_type: item.message.msg_type,
        isGroup: isGroup ? true : false,
        msg_length: 1
      }
      dispatch({
        type: ActionTypes.CONVERSATIONS,
        payload: [newData, ...state.conversations]
      })
    }
    document.onclick = null
    setOpen(false)
    navigate(`/chat/message/${item.source.user_id}`)
  }

  const messageType = (data: UnReadMessageType) => {
    switch (data.message.msg_type) {
      case Message_type.TEXT:
        return data.message.msg
      case Message_type.IMAGE:
        return "[图片]"
      case Message_type.VIDEO:
        return "[视频]"
      default:
        break
    }
  }

  return (
    <Container isOpen={isOpen}>
      <Wrapper className="flex-c">
        <h3>聊天消息</h3>
        <List className="flex-c">
          {state.unread_message.map(item => (
            <Item
              key={item.notice_id}
              className="flex flex-alc"
              onClick={e => handleClick(item)}
            >
              <Avatar
                src={item.source.avatar}
                size="46"
              />
              <Information className="flex-c">
                <Name>{item.source.nick_name}</Name>
                <Msg className="flex flex-alc">
                  <Text>{messageType(item)}</Text>
                  <TimeStamp>{getTimeDiff(item.createdAt)}</TimeStamp>
                </Msg>
              </Information>
              {!item.done && <UnRead />}
            </Item>
          ))}
        </List>
      </Wrapper>
    </Container>
  )
}

export default TopBarRightMessage

const List = styled.div``
export const Item = styled.div`
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;

  &:hover {
    background-color: ${p => p.theme.colors.hovercolor};
  }
`
export const Information = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
`
export const Msg = styled.div`
  font-size: 14px;
  gap: 10px;
  color: ${p => p.theme.colors.primary};
`
export const Text = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const TimeStamp = styled.div`
  font-size: 12px;
  color: ${p => p.theme.colors.secondary};
`
export const UnRead = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-left: auto;
  margin: 0 10px;
  background-color: ${p => p.theme.colors.primary};
`
