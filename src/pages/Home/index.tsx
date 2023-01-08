import React from "react"
import styled from "styled-components"
import HomeLeft from "./HomeLeft"
import HomeMiddle from "./HomeMiddle"
import HomeRight from "./HomeRight"

const Home = () => {
  return (
    <Container className="flex">
      <HomeLeft />
      <HomeMiddle />
      <HomeRight />
    </Container>
  )
}

export default Home

/* styled */
const Container = styled.div`
  /* position:relative; */
`
