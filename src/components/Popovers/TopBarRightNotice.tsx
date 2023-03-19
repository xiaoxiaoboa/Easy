import React from "react"
import styled from "styled-components"
import { Container, Wrapper } from "./TopBarRightUser"

interface TopBarRightNoticeProps {
  isOpen: boolean
}
const TopBarRightNotice: React.FC<TopBarRightNoticeProps> = props => {
  const { isOpen } = props
  return (
    <Container isOpen={isOpen}>
      <Wrapper>hello</Wrapper>
    </Container>
  )
}

export default TopBarRightNotice
