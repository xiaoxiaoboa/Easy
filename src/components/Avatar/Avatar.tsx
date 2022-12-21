import React from "react"
import styled from "styled-components"
import avatar from "../../assets/avatar.jpg"

const Avatar = () => {
  return (
    <Container className="flex flex-alc flex-jcc">
      <Wrapper className="flex flex-alc flex-jcc">
        <img src={avatar} alt="" />
      </Wrapper>
    </Container>
  )
}

export default Avatar

const Container = styled.div``
const Wrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  & img {
    width: 44px;
    height: 44px;
    object-fit: cover;
  }
`
