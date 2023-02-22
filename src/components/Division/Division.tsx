import React from "react"
import styled from "styled-components"

interface DivisionProps {
  margin?: string
  padding?: string
}

const Division: React.FC<DivisionProps> = props => {
  const { margin, padding } = props
  return (
    <Container margin={margin} padding={padding}>
      <Wrapper></Wrapper>
    </Container>
  )
}

export default Division

const Container = styled.div<DivisionProps>`
  width: 100%;
  /* height: 1px; */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`
const Wrapper = styled.div`
  border-top: 1px solid;
  width: 100%;
  height: 100%;
  border-color: ${props => props.theme.colors.fd_divisioncolor};
`
