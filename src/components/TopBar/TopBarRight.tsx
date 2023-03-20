import React from "react"
import styled from "styled-components"
import Avatar from "../Avatar/Avatar"
import { MdNotificationsActive } from "react-icons/md"
import { BsFillChatDotsFill } from "react-icons/bs"
import { MyContext } from "../../context/context"
import getUnionUrl from "../../utils/getUnionUrl"
import { useNavigate } from "react-router-dom"
import Dialog from "../Popovers/Popover"
import TopBarRightUser from "../Popovers/TopBarRightUser"
import TopBarRightNotice from "../Popovers/TopBarRightNotice"
import { ActionTypes } from "../../types/reducer"
import TopBarRightMessage from "../Popovers/TopBarRightMessage"
import { queryNotice } from "../../api/user.api"
import { ConversationType } from "../../types/chat.type"

const TopBarRight = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const navigate = useNavigate()

  React.useEffect(() => {
    queryNotice(state.user_info?.result.user_id!, "1", state.user_info?.token!).then(
      val => {
        if (val.code === 1) {
          console.log(val)
          dispatch({ type: ActionTypes.UNREAD_MESSAGE, payload: val.data })
          // const findeItem = c_cacheRef.current.find(
          //   i => i.conversation_id === data.conversation_id
          // )
        }
      }
    )
    // state.socket?.notice.on("new_message", (data: UnReadMessageType) => {
    //   setUnReadMessages(prev => [
    //     data,
    //     ...prev.filter(i => i.source_id !== data.source_id)
    //   ])
    // })

    return () => {
      state.socket?.notice.off(`notice_messages_${state.user_info?.result.user_id!}`)
    }
  }, [])

  // React.useEffect(() => {
  //   state.unread_message.map(item => {
  //     const findeItem = state.conversations.find(
  //       i => i.conversation_id === item.source_id
  //     )
      
  //     if (!findeItem) {
  //       const newData: ConversationType = {
  //         conversation_id: item.source_id,
  //         avatar: item.source.avatar,
  //         name: item.source.nick_name,
  //         user_name: item.source.nick_name,
  //         msg: item.message.msg,
  //         isGroup: state.groups.find(i => i.group_id === item.source_id) ? true : false,
  //         msg_length: 1
  //       }
  //       dispatch({
  //         type: ActionTypes.CONVERSATIONS,
  //         payload: [newData, ...state.conversations]
  //       })
  //     }
  //   })
  // }, [state.unread_message])

  return (
    <Container className="flex flex-rr flex-alc flex-jcs">
      <Dialog>
        {({ open }) => (
          <>
            <div style={{ cursor: "pointer" }} onClick={() => {}}>
              <Avatar src={state.user_info?.result.avatar} size="44" />
            </div>

            <TopBarRightUser isOpen={open} />
          </>
        )}
      </Dialog>
      <Dialog>
        {({ open }) => (
          <>
            <TopBarRightButton handleFun={() => {}}>
              <MdNotificationsActive size="22" />
            </TopBarRightButton>
            <TopBarRightNotice isOpen={open} />
          </>
        )}
      </Dialog>
      <Dialog>
        {({ open }) => (
          <>
            <TopBarRightButton handleFun={() => {}}>
              <BsFillChatDotsFill size="20" />
            </TopBarRightButton>
            <TopBarRightMessage isOpen={open} data={state.unread_message} />
          </>
        )}
      </Dialog>

      <TopBarRightButton
        handleFun={() => navigate("/friends/list")}
        w="90"
        h="38"
        br="22px"
      >
        <span style={{ fontWeight: "bold" }}>搜索好友</span>
      </TopBarRightButton>
    </Container>
  )
}

export default TopBarRight

/* styled */
const Container = styled.div`
  height: 100%;
  right: 0;
  gap: 10px;
  padding-right: 10px;
  position: absolute;
`

/* 导航栏右侧功能键 */
interface TopBarRightButtonProps {
  children: React.ReactElement
  handleFun: () => void
  br?: string
  w?: string
  h?: string
}
const TopBarRightButton: React.FC<TopBarRightButtonProps> = props => {
  const { children, handleFun, br, w, h } = props
  return (
    <TopBarRightButtonContainer className="flex flex-alc flex-jcc click">
      <ButtonWrapper
        className="flex flex-alc flex-jcc"
        onClick={handleFun}
        w={w}
        h={h}
        br={br}
      >
        {children}
      </ButtonWrapper>
    </TopBarRightButtonContainer>
  )
}
const TopBarRightButtonContainer = styled.div`
  position: relative;
`
interface ButtonWrapperProps {
  w?: string
  h?: string
  br?: string
}
const ButtonWrapper = styled.div<ButtonWrapperProps>`
  width: ${props => (props.w ? props.w : "42")}px;
  height: ${props => (props.h ? props.h : "42")}px;
  border-radius: ${props => (props.br ? props.br : "50%")};
  background-color: ${props => props.theme.colors.nav_btn_bgcolor};
  cursor: pointer;
  transform-origin: center center;
`
