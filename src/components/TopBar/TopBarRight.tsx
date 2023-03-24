import React from "react"
import styled from "styled-components"
import Avatar from "../Avatar/Avatar"
import { MdNotificationsActive } from "react-icons/md"
import { BsFillChatDotsFill } from "react-icons/bs"
import { MyContext } from "../../context/context"
import getUnionUrl from "../../utils/getUnionUrl"
import { useNavigate } from "react-router-dom"
import Popover from "../Popovers/Popover"
import TopBarRightUser from "../Popovers/TopBarRightUser"
import TopBarRightNotice from "../Popovers/TopBarRightNotice"
import { ActionTypes } from "../../types/reducer"
import TopBarRightMessage from "../Popovers/TopBarRightMessage"
import { queryMessageNotice } from "../../api/user.api"
import { UnReadMessageType } from "../../types/notice.type"
import { getGroupUnReadMsg } from "../../api/chat_group.api"

const TopBarRight = () => {
  const { state, dispatch } = React.useContext(MyContext)
  const navigate = useNavigate()
  const [haveNewMessage, setHaveNewMessage] = React.useState<boolean>(false)
  const [haveNewNotice, setHaveNewNotice] = React.useState<boolean>(false)
  const um_cacheRef = React.useRef<UnReadMessageType[]>([])

  /* 缓存unread_message的值 */
  React.useEffect(() => {
    um_cacheRef.current = state.unread_message
  }, [state.unread_message])

  /* 监听新通知消息 */
  React.useEffect(() => {
    /* 监听未处理信息 */
    state.socket?.notice.on(`new_notice_message`, (val: UnReadMessageType) => {
      if (val.message.user_id === state.user_info?.result.user_id!) return
      dispatch({
        type: ActionTypes.UNREAD_MESSAGE,
        payload: [val, ...um_cacheRef.current.filter(i => i.source_id !== val.source_id)]
      })
    })
    return () => {
      state.socket?.notice.off(`new_message`)
    }
  }, [])

  /* 获取私聊的未读消息 */
  React.useEffect(() => {
    queryMessageNotice(
      state.user_info?.result.user_id!,
      "1",
      state.user_info?.token!
    ).then(val => {
      if (val.code === 1) {
        dispatch({ type: ActionTypes.UNREAD_MESSAGE, payload: val.data })
      }
    })

    return () => {
      state.socket?.notice.off(`notice_messages_${state.user_info?.result.user_id!}`)
    }
  }, [])

  /* 获取下线后未读的群组消息 */
  React.useEffect(() => {
    if (!state.user_info || state.groups.length === 0) return
    getGroupUnReadMsg(
      [...state.groups.map(i => i.group_id)],
      state.user_info.result.user_id!,
      state.user_info.token!
    ).then(
      val =>
        val.code === 1 &&
        dispatch({
          type: ActionTypes.UNREAD_MESSAGE,
          payload: [...state.unread_message, ...val.data]
        })
    )
  }, [state.groups, state.user_info])

  /* 是否还有新消息 */
  React.useEffect(() => {
    setHaveNewMessage(state.unread_message.filter(i => i.done === 0).length > 0)
  }, [state.unread_message])
  /* 是否还有新通知 */
  React.useEffect(() => {
    setHaveNewNotice(state.notice.filter(i => i.done === 0).length > 0)
  }, [state.notice])

  return (
    <Container className="flex flex-rr flex-alc flex-jcs">
      <Popover>
        {({ open, setOpen }) => (
          <>
            <div style={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
              <Avatar src={state.user_info?.result.avatar} size="44" />
            </div>

            <TopBarRightUser isOpen={open} setOpen={() => {}} />
          </>
        )}
      </Popover>
      <Popover>
        {({ open, setOpen }) => (
          <>
            <TopBarRightButton handleFun={() => setOpen(true)}>
              <>
                <MdNotificationsActive size="22" />
                {haveNewNotice && <NewNotice />}
              </>
            </TopBarRightButton>
            <TopBarRightNotice isOpen={open} setOpen={setOpen} />
          </>
        )}
      </Popover>
      <Popover>
        {({ open, setOpen }) => (
          <>
            <TopBarRightButton handleFun={() => setOpen(true)}>
              <>
                <BsFillChatDotsFill size="20" />
                {haveNewMessage && <NewNotice />}
              </>
            </TopBarRightButton>
            <TopBarRightMessage isOpen={open} setOpen={setOpen} />
          </>
        )}
      </Popover>

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
const NewNotice = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${p => p.theme.colors.primary};
`
