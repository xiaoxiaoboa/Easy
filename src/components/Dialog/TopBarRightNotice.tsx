import React from "react"
import styled from "styled-components"

const TopBarRightNotice = () => {
  return (
    <Container>
      <Wrapper></Wrapper>
    </Container>
  )
}

export default TopBarRightNotice

const Container = styled.div`
  position: absolute;
  right: 10px;
  top: 60px;
  width: 360px;
  border-radius: 10px;

  background-color: ${p => p.theme.colors.nav_bg};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`
const Wrapper = styled.div`
  padding: 10px;
`
