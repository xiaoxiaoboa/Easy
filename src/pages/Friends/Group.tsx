import React from "react"
import styled from "styled-components"
import { MyContext } from "../../context/context"
import { Card, CardButton } from "./List"
import { ChatGroupSendType, ChatGroupType, ConversationType } from "../../types/chat.type"
import { getJoinedGroups } from "../../api/chat_group.api"
import { ActionTypes } from "../../types/reducer"
import { useNavigate } from "react-router-dom"

const Group = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const navigate = useNavigate()

  /* 点击聊天 */
  const handleTalk = (data: ChatGroupType) => {
    navigate(`/chat/message/${data.group_id}`)
    const existedItem = state.conversations.find(
      item => item.conversation_id === data.group_id
    )
    if (existedItem) {
      dispatch({ type: ActionTypes.CURRENT_TALK, payload: existedItem! })
    } else {
      const newData: ConversationType = {
        conversation_id: data.group_id,
        avatar: data.group_avatar,
        name: data.group_name,
        user_name: "",
        msg: "",
        isGroup: true,
        msg_length: 0
      }
      dispatch({
        type: ActionTypes.CONVERSATIONS,
        payload: [...state.conversations, newData]
      })
      dispatch({
        type: ActionTypes.CURRENT_TALK,
        payload: newData
      })
    }
  }

  return (
    <Container className="flex-c">
      <Wrapper className="flex">
        {state.groups.map(item => (
          <Card key={item.group_id} name={item.group_name} avatar={item.group_avatar}>
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

export default Group

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const Wrapper = styled.div`
  padding: 30px;
  gap: 34px;
  flex-wrap: wrap;
`
