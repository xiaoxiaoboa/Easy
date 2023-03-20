import React from "react"
import styled from "styled-components"
import { MyContext } from "../../context/context"
import { TopBarRightPopoverProps } from "../../types"
import { UnReadMessageType } from "../../types/chat.type"
import { ActionTypes } from "../../types/reducer"
import getTimeDiff from "../../utils/getTimeDiff"
import Avatar from "../Avatar/Avatar"
import { Container, Wrapper } from "./TopBarRightUser"

type TopBarRightMessageProps = {
  data: any[]
} & TopBarRightPopoverProps

const TopBarRightMessage: React.FC<TopBarRightMessageProps> = props => {
  const { isOpen, data } = props
  const { state, dispatch } = React.useContext(MyContext)

  React.useEffect(() => {
    /* 获取下线后未读的消息 */
    if (!state.user_info || state.groups.length === 0) return
    state.socket?.notice.emit(
      "unreadMessages",
      [state.user_info?.result.user_id!, ...state.groups.map(i => i.group_id)],
      state.user_info?.result.user_id!,
      (res: UnReadMessageType[]) => {
        console.log(res)
        dispatch({
          type: ActionTypes.UNREAD_MESSAGE,
          payload: res
        })
      }
    )
  }, [state.groups, state.user_info])

  React.useEffect(() => {
    dispatch({
      type: ActionTypes.UNREAD_MESSAGE,
      payload: [
        ...state.unread_message.map(i => {
          if (!i.isGroup && i.user_id === state.current_talk?.conversation_id) {
            return { ...i, read: true }
          } else if (i.isGroup && i.to_id === state.current_talk?.conversation_id) {
            return { ...i, read: true }
          } else {
            return i
          }
        })
      ]
    })
  }, [state.current_talk])

  return (
    <Container isOpen={isOpen}>
      <Wrapper className="flex-c" style={{ gap: "10px" }}>
        <h3>聊天消息</h3>
        <List className="flex-c">
          {state.unread_message.map(item => (
            <Item key={item.id} className="flex flex-alc">
              <Avatar src={item.source.avatar} size="46" />
              <Information className="flex-c">
                <Name>
                  {item.isGroup ? item.source.group.group_name : item.source.nick_name}
                </Name>
                <Msg className="flex flex-alc">
                  <Text>{item.msg}</Text>
                  <TimeStamp>{getTimeDiff(item.createdAt)}</TimeStamp>
                </Msg>
              </Information>
              {!item.read && <UnRead />}
            </Item>
          ))}
        </List>
      </Wrapper>
    </Container>
  )
}

export default TopBarRightMessage

const List = styled.div``
const Item = styled.div`
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;

  &:hover {
    background-color: ${p => p.theme.colors.hovercolor};
  }
`
const Information = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
`
const Msg = styled.div`
  font-size: 14px;
  gap: 10px;
  color: ${p => p.theme.colors.primary};
`
const Text = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const TimeStamp = styled.div`
  font-size: 12px;
  color: ${p => p.theme.colors.secondary};
`
const UnRead = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-left: auto;
  margin: 0 10px;
  background-color: ${p => p.theme.colors.primary};
`
