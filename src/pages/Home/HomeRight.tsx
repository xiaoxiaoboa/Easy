import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import { UserType } from "../../types"

interface HomeRightProps {
  user_info: UserType | undefined
}
const HomeRight: React.FC<HomeRightProps> = props => {
  const { user_info } = props
  return (
    <Container>
      {user_info ? (
        <Wrapper className="flex-c">
          <FriendsRequest className="flex-c">
            <RequestHead className="flex flex-jcsb">
              <span>好友请求</span>
              <span>查看全部</span>
            </RequestHead>
            <Main className="flex-c"></Main>
          </FriendsRequest>
          <Contacts className="flex-c">
            <ContactsHead>联系人</ContactsHead>
            <Main className="flex-c"></Main>
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
  width: 340px;
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

  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.fd_divisioncolor};
  }
`

const RequestHead = styled.div`
  padding: 0 8px;

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
`

const Contacts = styled.div`
  gap: 8px;
`
const ContactsHead = styled.div`
  padding: 0 8px;
  color: ${props => props.theme.colors.secondary};
`

interface UserItemPorps {
  isShowTimeStamp?: boolean
  avatarUrl: string
}
const UserItem: React.FC<UserItemPorps> = props => {
  const { isShowTimeStamp = false, avatarUrl } = props
  return (
    <ItemContainer className="flex flex-alc">
      <UserInfo className="flex flex-alc">
        <Avatar src={avatarUrl} size="36" isOnline isShowOnline />
        <span>Xiaoxin Yuan</span>
      </UserInfo>
      {isShowTimeStamp ? (
        <>
          <Btns className="flex flex-alc">
            <button className="click" onClick={() => console.log("@")}>
              同意
            </button>
            <button className="click">拒绝</button>
          </Btns>
          <span className="reqtimestamp">123天前</span>
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
    font-size: 12px;
    color: ${props => props.theme.colors.secondary};
  }

  &:hover {
    background-color: ${props => props.theme.colors.hovercolor};
  }
`
const UserInfo = styled.div`
  gap: 10px;
  flex: 2;
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
  gap: 4px;
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
        <Main className="flex-c">
          <UserItem avatarUrl="" />
        </Main>
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
