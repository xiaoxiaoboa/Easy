import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import Division from "../../components/Division/Division"
import { MyContext } from "../../context/context"
import { UserType } from "../../types/user.type"
import { getFriends, queryUser } from "../../api/user.api"
import getTimeDiff from "../../utils/getTimeDiff"
import { Socket } from "socket.io-client"
import { FriendType } from "../../types/friend.type"
import { ActionTypes } from "../../types/reducer"

interface HomeRightProps {}
const HomeRight: React.FC<HomeRightProps> = props => {
  const {} = props
  const { state, dispatch } = React.useContext(MyContext)
  const [friends, setFriends] = React.useState<FriendType[]>([])

  React.useEffect(() => {
    getFriends(state.user_info?.result.user_id!).then(val => {
      if (val.code === 1) {
        setFriends(prev => [...prev, ...val.data])
      }
    })
  }, [])

  const handleAgree = (friend_id: string, notice_id: string) => {
    state.socket?.notice.emit(
      "agreeRequest",
      state.user_info?.result.user_id,
      friend_id,
      notice_id,
      (res: any, err: any) => {
        if (res) {
          getFriends(state.user_info?.result.user_id!).then(val => {
            if (val.code === 1) {
              setFriends(prev => [...prev, ...val.data])
              dispatch({
                type: ActionTypes.REQUESTFRIENDS,
                payload: state.requestFriends.filter(
                  item => item.notice.notice_id !== notice_id
                )
              })
            }
          })
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
      payload: state.requestFriends.filter(item => item.notice.notice_id !== notice_id)
    })
  }

  return (
    <Container>
      {state.user_info ? (
        <Wrapper className="flex-c">
          <FriendsRequest className="flex-c">
            <RequestHead className="flex flex-jcsb">
              <span>好友请求</span>
              <span>查看全部</span>
            </RequestHead>
            <Main className="flex-c">
              {state.requestFriends.map(item => (
                <UserItem
                  key={item.data.user_id}
                  handleAgree={() =>
                    handleAgree(item.data.user_id, item.notice.notice_id)
                  }
                  handleReject={() =>
                    handleReject(item.notice.notice_id, item.data.user_id)
                  }
                  avatarUrl={item.data.avatar}
                  timestamp={item.data.timestamp}
                  nick_name={item.data.nick_name}
                />
              ))}
            </Main>
          </FriendsRequest>
          <Division margin="8px 0 4px 0" />
          <Contacts className="flex-c">
            <ContactsHead>联系人</ContactsHead>
            <Main className="flex-c">
              {friends.map(item => (
                <UserItem
                  key={item.friend_id}
                  avatarUrl={item.avatar}
                  nick_name={item.nick_name}
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
  position: fixed;
  right: 0;
  /* width: 340px; */
  margin-right: 30px;

  @media (max-width: 1400px) {
    display: none;
  }
`
const Wrapper = styled.div`
  padding: 20px 10px;
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
  & span:nth-child(2) {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`
const Main = styled.div`
  gap: 4px;
  min-width: 320px;
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
  handleAgree?: () => void
  handleReject?: () => void
}
const UserItem: React.FC<UserItemPorps> = props => {
  const { avatarUrl, timestamp, nick_name, handleAgree, handleReject } = props

  return (
    <ItemContainer
      className="flex flex-alc"
      style={{ cursor: `${!timestamp ? "pointer" : "unset"}` }}
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
