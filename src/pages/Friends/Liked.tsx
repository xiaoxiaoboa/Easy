import React from "react"
import styled from "styled-components"
import TestSocket from "../../components/TestSocket/TestSocket"
import { MyContext } from "../../context/context"
import { Card, CardButton } from "./List"

const Liked = () => {
  const { state } = React.useContext(MyContext)
  return (
    <Container>
      <Wrapper className="flex">
        {/* <Card name={item.nick_name} desc="">
            <CardButton className="flex">
              <button>发消息</button>
              <button>取消关注</button>
            </CardButton>
          </Card> */}
      </Wrapper>
    </Container>
  )
}

export default Liked

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const Wrapper = styled.div`
  padding: 30px;
  gap: 34px;
  flex-wrap: wrap;
`
