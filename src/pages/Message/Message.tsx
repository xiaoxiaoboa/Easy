import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import MyInput from "../../components/MyInput/MyInput"
import { Search } from "../Friends/Friends"
import { VariableSizeList as VirtualList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

const Message = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<any>(null)
  const sizeRef = React.useRef<{ [key: string]: number }>()

  const test = [
    "sahbfasbgm.abg;iaubgamd,fvbisbegkja",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore hic libero optio quisquam culpa. Voluptates incidunt quasi illo deserunt dicta esse! Nobis, eius placeat facilis consectetur aperiam fugit similique inventore!",
    "owytqoiyhldmnb,cvmnbkeur",
    "uwhriuer jbkwj b.,jbglseubglaieugh;aehojbdvj.zmcbzvhkdb;agehkbgkesjgbsjgbsjhbglsebhgl"
  ]

  const setSize = React.useCallback((index: number, size: number) => {
    sizeRef.current = { ...sizeRef.current, [index]: size }
    listRef.current?.resetAfterIndex(index)
  }, [])

  return (
    <Container>
      <Wrapper className="flex">
        <Left className="flex-c">
          <div className="flex-c" style={{ gap: "10px" }}>
            <h2>聊天</h2>
            <Search padding="0" />
          </div>
          <List className="flex-c">
            <ListItem className="flex flex-alc">
              <Avatar src={undefined} size="52" />
              <UserInfo className="flex-c">
                <UserName>Yuan Xiaoxin</UserName>
                <Notice className="flex">
                  <span>hello</span>
                  <span>5小时前</span>
                </Notice>
              </UserInfo>
            </ListItem>
          </List>
        </Left>
        <Right className="flex-c">
          <Top>
            <TopUserInfo className="flex flex-alc">
              <Avatar src={undefined} size="44" />
              <UserInfo className="flex-c">
                <TopUserName>Yuan Xiaoxin</TopUserName>
                <LastOnline className="flex">
                  <span>5小时前在线</span>
                </LastOnline>
              </UserInfo>
            </TopUserInfo>
          </Top>
          <Middle className="flex flex-jcc">
            <MiddleWrapper className="flex-c w" ref={containerRef}>
              <Messages className=" messages" ref={wrapperRef}>
                <AutoSizer>
                  {({ width, height }) => (
                    <VirtualList
                      className="flex flex-jcc"
                      height={height}
                      width={width}
                      itemCount={test.length}
                      itemSize={() => 50}
                      innerElementType={ListWrapper}
                      itemData={test}
                      ref={listRef}
                    >
                      {({ data, index, style }) => (
                        <Row data={data} index={index} setSize={setSize} style={style} />
                      )}
                    </VirtualList>
                  )}
                </AutoSizer>
              </Messages>
            </MiddleWrapper>
          </Middle>
          <Bottom className="flex flex-alc flex-jcc">
            <BottomWrapper>
              <MyInput placeholder="ah" />
            </BottomWrapper>
          </Bottom>
        </Right>
      </Wrapper>
    </Container>
  )
}

interface RowProps {
  data: any
  index: number
  setSize: any
  style: any
}
const Row: React.FC<RowProps> = props => {
  const { data, index, setSize, style } = props
  const rowRef = React.useRef<HTMLDivElement>(null)

  return (
    <MessageItemLeft ref={rowRef} className="flex" style={style}>
      <Avatar src={undefined} size="40" />
    </MessageItemLeft>
  )
}

export default Message

const ListWrapper = styled.div`
  position: absolute;
  width: 70% !important;
`

const Container = styled.div`
  height: calc(100vh - 60px);
  background-color: ${props => props.theme.colors.nav_bg};
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Left = styled.div`
  flex: 1;
  gap: 40px;
  padding: 14px;
  border-right: 1px solid #ccc;
`
const Right = styled.div`
  flex: 3.5;
`
const List = styled.div`
  max-height: 100%;
  overflow-y: auto;
  list-style: none;
`
const ListItem = styled.div`
  gap: 14px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;

  &:hover {
    background-color: ${props => props.theme.colors.hovercolor};
  }
`
const UserInfo = styled.div`
  gap: 4px;
`
const UserName = styled.span`
  font-size: 17px;
`
const Notice = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.secondary};
  gap: 10px;
`
const Top = styled.div`
  flex: 1;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`
const TopUserInfo = styled(ListItem)`
  cursor: auto;
  &:hover {
    background-color: unset;
  }
`
const TopUserName = styled.span`
  font-size: 18px;
  font-weight: bold;
`
const LastOnline = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.secondary};
`
const Middle = styled.div`
  flex: 8;
`
const MiddleWrapper = styled.div`
  width: 100%;
`
const Messages = styled.div`
  /* width: 70%; */
  flex: 1;
`
const MessageItemLeft = styled.div`
  width: 100%;
`
const Bottom = styled.div`
  flex: 1;
`
const BottomWrapper = styled.div`
  width: 70%;
  border-radius: 18px;
  background-color: ${props => props.theme.colors.inputbtn_bg};
`
