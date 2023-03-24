import React from "react"
import styled from "styled-components"
import { Container, Wrapper } from "./TopBarRightUser"
import {
  Item,
  Information,
  Msg,
  Name,
  Text,
  TimeStamp,
  UnRead
} from "./TopBarRightMessage"
import Avatar from "../Avatar/Avatar"
import { queryNotice, updateNotice } from "../../api/user.api"
import { MyContext } from "../../context/context"
import { ActionTypes } from "../../types/reducer"
import getTimeDiff from "../../utils/getTimeDiff"
import { TopBarRightPopoverProps } from "../../types"

type TopBarRightNoticeProps = TopBarRightPopoverProps
const TopBarRightNotice: React.FC<TopBarRightNoticeProps> = props => {
  const { isOpen, setOpen } = props
  const { state, dispatch } = React.useContext(MyContext)

  /* 获取相关通知 */
  React.useEffect(() => {
    /* 获取添加好友相关的通知 */
    queryNotice(state.user_info?.result.user_id!, state.user_info?.token!).then(val => {
      if (val.code === 1) {
        dispatch({ type: ActionTypes.NOTICE, payload: [...state.notice, ...val.data] })
      }
    })
  }, [])

  const handleClick = (id: string) => {
    updateNotice({ notice_id: id }, state.user_info?.token!)
    dispatch({
      type: ActionTypes.NOTICE,
      payload: [
        ...state.notice.map(i => {
          if (i.notice_id === id) {
            return { ...i, done: 1 }
          } else {
            return i
          }
        })
      ]
    })
    document.onclick = null
    setOpen(false)
  }

  return (
    <Container isOpen={isOpen}>
      <Wrapper className="flex-c">
        <h3>通知</h3>
        <div className="flex-c">
          {state.notice.map(item => (
            <Item
              key={item.notice_id}
              className="flex flex-alc"
              onClick={() => handleClick(item.notice_id)}
              title={item.comment_msg || ""}
            >
              <Avatar src={item.source.avatar} size="46" />
              <Information className="flex-c">
                <Name>{item.source.nick_name}</Name>
                <Msg className="flex flex-alc">
                  <Text>{item.msg}</Text>
                  <TimeStamp>{getTimeDiff(item.createdAt)}</TimeStamp>
                </Msg>
              </Information>
              {!item.done && <UnRead />}
            </Item>
          ))}
        </div>
      </Wrapper>
    </Container>
  )
}

export default TopBarRightNotice
