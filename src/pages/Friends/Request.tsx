import React from "react"
import styled from "styled-components"
import { Card, CardButton } from "./List"

const Request = () => {
  return (
    <Container>
      <Wrapper className="flex">
        <Card name="Xiaoxin" desc="我是野原新之助">
          <CardButton className="flex">
            <button>同意</button>
            <button>拒绝</button>
          </CardButton>
        </Card>
        <Card name="Xiaoxin" desc="我是野原新之助">
          <CardButton className="flex">
            <button>同意</button>
            <button>拒绝</button>
          </CardButton>
        </Card>
        <Card name="Xiaoxin" desc="我是野原新之助">
          <CardButton className="flex">
            <button>同意</button>
            <button>拒绝</button>
          </CardButton>
        </Card>
        <Card name="Xiaoxin" desc="我是野原新之助">
          <CardButton className="flex">
            <button>同意</button>
            <button>拒绝</button>
          </CardButton>
        </Card>
        <Card name="Xiaoxin" desc="我是野原新之助">
          <CardButton className="flex">
            <button>同意</button>
            <button>拒绝</button>
          </CardButton>
        </Card>
        <Card name="Xiaoxin" desc="我是野原新之助">
          <CardButton className="flex">
            <button>同意</button>
            <button>拒绝</button>
          </CardButton>
        </Card>
        <Card name="Xiaoxin" desc="我是野原新之助">
          <CardButton className="flex">
            <button>同意</button>
            <button>拒绝</button>
          </CardButton>
        </Card>
      </Wrapper>
    </Container>
  )
}

export default Request

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const Wrapper = styled.div`
  padding: 30px;
  gap: 34px;
  flex-wrap: wrap;
`
