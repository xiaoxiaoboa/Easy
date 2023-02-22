import React from "react"
import styled, { keyframes } from "styled-components"

interface LoadingProps {
  size?: number
}
const Loading = ({ size = 12 }: LoadingProps) => {
  return (
    <Container className="flex flex-jcc flex-alc">
      <Wrapper size={size} className="flex flex-jcc flex-alc">
        <span></span>
        <span></span>
        <span></span>
      </Wrapper>
    </Container>
  )
}

export default Loading

const jump = keyframes`
  from {
    transform: translateY(-5px);
  }
  to {
    transform: translateY(3px);
  }
`

const Container = styled.div`
  width: 100%;
  height: inherit;
  /* position: absolute;
  top: 0;
  left: 0; */
`
const Wrapper = styled.div<LoadingProps>`
  height: 50px;
  width: max-content;
  gap: 4px;

  & span {
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: 50%;
    animation: ${jump} 0.8s ease-in-out alternate infinite;
  }

  & span:nth-child(1) {
    animation-delay: -0.25s;
    background-color: red;
    /* background-color: white; */
  }
  & span:nth-child(2) {
    animation-delay: -0.5s;
    background-color: yellow;
    /* background-color: white; */
  }
  & span:nth-child(3) {
    animation-delay: -0.75s;
    background-color: blue;
    /* background-color: white; */
  }
`
