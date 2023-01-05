import React from "react"
import styled from "styled-components"
import avatar from "../../assets/avatar.jpg"

interface AvatarProps {
  size: string
}
const Avatar: React.FC<AvatarProps> = (props) => {
  const {size} = props
  return (
    <Container className="flex flex-alc flex-jcc">
      <Wrapper className="flex flex-alc flex-jcc" size={size}>
        <img src={avatar} alt="" />
      </Wrapper>
    </Container>
  )
}

export default Avatar

const Container = styled.div``
interface WrapperPorps {
  size:string
}
const Wrapper = styled.div<WrapperPorps>`
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  & img {
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    object-fit: cover;
  }
`
