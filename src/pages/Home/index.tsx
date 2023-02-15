import React from "react"
import styled from "styled-components"
import HomeLeft from "./HomeLeft"
import HomeMiddle from "./HomeMiddle"
import HomeRight from "./HomeRight"
import getLocalData from "../../utils/getLocalData"
import { DataType } from "../../types/index"

const Home = () => {
  const userData = getLocalData("user_info") as DataType | null
  return (
    <Container className="flex flex-jcc">
      <HomeLeft />
      <HomeMiddle />
      {userData && <HomeRight />}
    </Container>
  )
}

export default Home

/* styled */
const Container = styled.div`
  /* position:relative; */
  height:100%;
  width:100%;
`
