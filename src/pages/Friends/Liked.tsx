import React from "react"
import styled from "styled-components"
import { Card, CardButton } from "./List"

const Liked = () => {
  return (
    <Container>
      <Wrapper className="flex">
        <Card name="风间彻" desc="hi，我是风间彻">
          <CardButton className="flex">
            <button>发消息</button>
            <button>取消关注</button>
          </CardButton>
        </Card>
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
