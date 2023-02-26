import React from "react"
import styled from "styled-components"
import FeedCard from "../../components/FeedCard/FeedCard"

const Favorites = () => {
  return (
    <Container>
      <Wrapper className="flex-c flex-alc">
        {/* <FeedCard />
        <FeedCard /> */}
      </Wrapper>
    </Container>
  )
}

export default Favorites

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const Wrapper = styled.div`
  padding: 30px;
  gap: 30px;
`
