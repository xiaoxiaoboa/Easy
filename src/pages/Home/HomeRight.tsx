import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import Division from "../../components/Division/Division"
import { MyContext } from "../../context/context"
import { UserType } from "../../types/user.type"
import { getFriends, queryNotice } from "../../api/user.api"
import getTimeDiff from "../../utils/getTimeDiff"
import { Socket } from "socket.io-client"
import { FriendType } from "../../types/friend.type"
import { ActionTypes } from "../../types/reducer"
import { useNavigate } from "react-router-dom"

interface HomeRightProps {}
const HomeRight: React.FC<HomeRightProps> = props => {
  const {} = props
  const { state, dispatch } = React.useContext(MyContext)
  const navigate = useNavigate()

  React.useEffect(() => {
    queryNotice(state.user_info?.result.user_id!, "0", state.user_info?.token!).then(
      val => {
        if (val.code === 1) {
          dispatch({
            type: ActionTypes.REQUESTFRIENDS,
            payload: [...state.requestFriends, ...val.data]
          })
        }
      }
    )
  }, [])

  const handleAgree = (friend_id: string, notice_id: string) => {
    state.socket?.notice.emit(
      "agreeRequest",
      state.user_info?.result.user_id,
      friend_id,
      notice_id,
      (res: any, err: any) => {
        if (res) {
          getFriends(state.user_info?.result.user_id!, state.user_info?.token!).then(
            val => {
              if (val.code === 1) {
                dispatch({
                  type: ActionTypes.FRIENDS,
                  payload: val.data
                })
                dispatch({
                  type: ActionTypes.REQUESTFRIENDS,
                  payload: state.requestFriends.filter(
                    item => item.notice_id !== notice_id
                  )
                })
              }
            }
          )
        }
      }
    )
  }

  const handleReject = (notice_id: string, friend_id: string) => {
    state.socket?.notice.emit(
      "rejectRequest",
      notice_id,
      friend_id,
      state.user_info?.result.user_id
    )
    dispatch({
      type: ActionTypes.REQUESTFRIENDS,
      payload: state.requestFriends.filter(item => item.notice_id !== notice_id)
    })
  }

  return (
    <Container>
      {state.user_info ? (
        <Wrapper className="flex-c">
          <FriendsRequest className="flex-c">
            <RequestHead className="flex flex-jcsb">
              <span>好友请求</span>
            </RequestHead>
            <Main className="flex-c">
              {state.requestFriends.map(item => (
                <UserItem
                  key={item.source.user_id}
                  handleAgree={() => handleAgree(item.source.user_id, item.notice_id)}
                  handleReject={() => handleReject(item.notice_id, item.source.user_id)}
                  avatarUrl={item.source.avatar}
                  timestamp={item.createdAt}
                  nick_name={item.source.nick_name}
                />
              ))}
            </Main>
          </FriendsRequest>
          <Division margin="8px 0 4px 0" />
          <Contacts className="flex-c">
            <ContactsHead>联系人</ContactsHead>
            <Main className="flex-c">
              {state.friends.map(item => (
                <UserItem
                  key={item.friend_id}
                  avatarUrl={item.avatar}
                  nick_name={item.nick_name}
                  handleClick={() =>
                    navigate(`/profile/${item.friend_id}`, { state: { isFriend: false } })
                  }
                />
              ))}
            </Main>
          </Contacts>
        </Wrapper>
      ) : (
        <ReferredUsers />
      )}
    </Container>
  )
}

export default HomeRight

const Container = styled.div`
  flex: 1;
  position: sticky;
  top: 60px;
  height: 100%;
`
const Wrapper = styled.div`
  padding: 20px 10px;
  @media (max-width: 1300px) {
    display: none;
  }
`
const FriendsRequest = styled.div`
  gap: 8px;
`

const RequestHead = styled.div`
  & span {
    font-weight: bold;
  }
  & span:nth-child(1) {
    color: ${props => props.theme.colors.secondary};
  }
`
const Main = styled.div`
  gap: 4px;
  /* min-width: 320px; */
`

const Contacts = styled.div`
  gap: 8px;
`
const ContactsHead = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.secondary};
`

interface UserItemPorps {
  avatarUrl: string
  nick_name: string
  timestamp?: string
  handleClick?: () => void
  handleAgree?: () => void
  handleReject?: () => void
}
const UserItem: React.FC<UserItemPorps> = props => {
  const { avatarUrl, timestamp, nick_name, handleAgree, handleReject, handleClick } =
    props

  return (
    <ItemContainer
      className="flex flex-alc"
      style={{ cursor: `${!timestamp ? "pointer" : "unset"}` }}
      onClick={handleClick}
    >
      <UserInfo className="flex flex-alc">
        <Avatar src={avatarUrl} size="44" />
        <span title={nick_name}>{nick_name}</span>
      </UserInfo>
      {timestamp ? (
        <>
          <Btns className="flex flex-alc flex-jcc">
            <button className="click" onClick={handleAgree}>
              同意
            </button>
            <button className="click" onClick={handleReject}>
              拒绝
            </button>
          </Btns>
          <span className="reqtimestamp">{timestamp && getTimeDiff(timestamp)}</span>
        </>
      ) : (
        <></>
      )}
    </ItemContainer>
  )
}
const ItemContainer = styled.div`
  padding: 6px 8px;
  border-radius: 8px;
  position: relative;

  & .reqtimestamp {
    flex: 0.5;
    font-size: 12px;
    text-align: right;
    color: ${props => props.theme.colors.secondary};
  }

  &:hover {
    background-color: ${props => props.theme.colors.hovercolor};
  }
`
const UserInfo = styled.div`
  gap: 10px;
  flex: 1.3;
  overflow: hidden;

  & span {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
const Btns = styled.div`
  flex: 1;
  gap: 6px;
  margin-right: 6px;
  & button {
    outline: none;
    border: none;
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
  }

  & button:first-child {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
  & button:last-child {
    background-color: ${props => props.theme.colors.hovercolor};
  }
`

const ReferredUsers = () => {
  return (
    <ReferredUsersContainer>
      <ReferredUsersWrapper className="flex-c">
        <h4>推荐用户</h4>
        <Main className="flex-c">{/* <UserItem avatarUrl="" /> */}</Main>
      </ReferredUsersWrapper>
    </ReferredUsersContainer>
  )
}

const ReferredUsersContainer = styled.div`
  padding: 20px 10px;
`
const ReferredUsersWrapper = styled.div`
  gap: 10px;
  & h4 {
    color: ${props => props.theme.colors.secondary};
  }
`
