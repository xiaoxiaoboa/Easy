import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Avatar from "../../../components/Avatar/Avatar"

interface MumbersProps {
  data: MemberType
}
export interface MemberType {
  user_id: string
  avatar: string
  nick_name: string
}
const Mumbers: React.FC<MumbersProps> = props => {
  const { data } = props
  const navigate = useNavigate()
  return (
    <Container onClick={() => navigate(`/profile/${data.user_id}`)}>
      <Wrapper className="flex flex-alc">
        <Avatar src={data.avatar} size="40" />
        <div>
          <Name>{data.nick_name}</Name>
          <TimeStamp></TimeStamp>
        </div>
      </Wrapper>
    </Container>
  )
}

export default Mumbers

const Container = styled.div`
  width: 100%;
`
const Wrapper = styled.div`
  gap: 10px;
  overflow: hidden;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;

  &:hover {
    background-color: ${p => p.theme.colors.hovercolor};
  }
`
const Name = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const TimeStamp = styled.div`
  font-size: 13px;
  color: ${p => p.theme.colors.secondary};
`
