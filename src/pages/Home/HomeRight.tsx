import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"

const HomeRight = () => {
  return (
    <Container>
      <Wrapper className="flex-c">
        <FriendsRequest className="flex-c">
          <RequestHead className="flex flex-jcsb">
            <span>好友请求</span>
            <span>查看全部</span>
          </RequestHead>
          <RequestMain>
            <UserItem isShowTimeStamp />
          </RequestMain>
        </FriendsRequest>
        <Contacts className="flex-c">
          <ContactsHead>联系人</ContactsHead>
          <UserItem />
        </Contacts>
      </Wrapper>
    </Container>
  )
}

export default HomeRight

const Container = styled.div`
  flex: 2;
`
const Wrapper = styled.div`
  padding: 20px 10px;
  /* height: 100%; */
  position: sticky;
  top: 60px;
  gap: 20px;
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
const RequestMain = styled.div``

const Contacts = styled.div`
  gap: 8px;
`
const ContactsHead = styled.div`
  padding: 0 8px;
  color: ${props => props.theme.colors.secondary};
`

interface UserItemPorps {
  isShowTimeStamp?: boolean
}
const UserItem: React.FC<UserItemPorps> = props => {
  const { isShowTimeStamp = false } = props
  return (
    <ItemContainer className="flex flex-alc flex-jcsb" title="点击查看">
      <div className="flex flex-alc">
        <Avatar size="36" isOnline isShowOnline />
        <span>Xiaoxin Yuan</span>
      </div>
      {isShowTimeStamp ? <span className="reqtimestamp">1天前</span> : <></>}
      <MaskLayer></MaskLayer>
    </ItemContainer>
  )
}
const ItemContainer = styled.div`
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

  & div:nth-child(1) {
    gap: 10px;
  }
  & .reqtimestamp {
    font-size: 14px;
    color: ${props => props.theme.colors.secondary};
  }

  &:hover {
    background-color: ${props => props.theme.colors.hovercolor};
  }
`
const MaskLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`
