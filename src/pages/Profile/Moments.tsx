import React from "react"
import styled from "styled-components"
import FeedCard from "../../components/FeedCard"

const Moments = () => {
  return (
    <Container className="flex-c flex-alc">
      <FeedCard />
    </Container>
  )
}

export default Moments

const Container = styled.div`
  /* width:100%; */
  padding: 20px 0;
`
