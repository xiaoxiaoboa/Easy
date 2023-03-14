import React from "react"
import styled from "styled-components"
import { MyContext } from "../../context/context"
import { Card, CardButton } from "./List"
import { ChatGroupSendType, ChatGroupType } from "../../types/chat.type"
import { getJoinedGroups } from "../../api/chat_group.api"
import { ActionTypes } from "../../types/reducer"
import { useNavigate } from "react-router-dom"

const Group = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const navigate = useNavigate()

  const handleTalk = (data: ChatGroupType) => {
    navigate(`/chat/message/${data.group_id}`)
    const isExist = state.conversations.some(
      item => (item as ChatGroupType).group_id === data.group_id
    )
    if (isExist) {
      const existedItem = state.conversations.find(
        item => (item as ChatGroupType).group_id === data.group_id
      )
      dispatch({ type: ActionTypes.CURRENT_TALK, payload: existedItem! })
    } else {
      dispatch({
        type: ActionTypes.CONVERSATIONS,
        payload: [...state.conversations, { ...data, conversation_id: data.group_id }]
      })
      dispatch({
        type: ActionTypes.CURRENT_TALK,
        payload: { ...data, conversation_id: data.group_id }
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
