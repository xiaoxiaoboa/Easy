import React from "react"
import styled from "styled-components"
import Avatar from "../../components/Avatar/Avatar"
import MyInput from "../../components/MyInput/MyInput"
import { Search } from "../Friends/Friends"
import { VariableSizeList as VirtualList } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import text from "../../assets/test.json"
import { BsCheck } from "react-icons/bs"
import { BiX } from "react-icons/bi"

type textType = { id: number; texts: string }

const tests = [
  {
    texts:
      "The past has no power over the present moment. Anyone who has ever made anything of importance was disciplined. A man is not old until regrets take the place of dreams.",
    id: 487
  },
  {
    texts:
      "If your Internet Service Provider (ISP) does not provide direct access to its server, Secure Tunneling Protocol (SSH) / HTTP is another solution. To connect to a database or schema,                   ",
    id: 488
  },
  {
    texts:
      "Remember that failure is an event, not a person. The reason why a great man is great is that he resolves to be a great man. Actually it is just in an idea when feel oneself can achieve                ",
    id: 489
  },
  {
    texts:
      "You will succeed because most people are lazy. To successfully establish a new connection to local/remote server - no matter via SSL or SSH, set the database login information in the General tab.",
    id: 490
  },
  {
    texts:
      "You can select any connections, objects or projects, and then select the corresponding buttons on the Information Pane. It is used while your ISPs do not allow direct connections, but                 ",
    id: 491
  },
  {
    texts:
      "After logged in the Navicat Cloud feature, the Navigation pane will be divided into Navicat Cloud and My Connections sections.",
    id: 492
  },
  {
    texts:
      "Always keep your eyes open. Keep watching. Because whatever you see can inspire you.",
    id: 493
  },
  {
    texts:
      "Export Wizard allows you to export data from tables, collections, views, or query results to any available formats.",
    id: 494
  },
  {
    texts: "Anyone who has never made a mistake has never tried anything new.",
    id: 495
  },
  {
    texts:
      "If you wait, all that happens is you get older. Navicat Monitor requires a repository to store alerts and metrics for historical analysis. Actually it is just in an idea when feel oneself             ",
    id: 496
  }
]

const MessageWindow = () => {
  const listRef = React.useRef<any>(null)
  const sizeRef = React.useRef<{ [key: number]: number }>()
  const [texts, setTexts] = React.useState<textType[]>(tests)

  /* 设置每个item高度 */
  const setSize = React.useCallback((index: number, size: number) => {
    sizeRef.current = { ...sizeRef.current, [index]: size }
    listRef.current?.resetAfterIndex(index)
  }, [])

  React.useEffect(() => {
    scrollTo()
  }, [texts])

  /* 获取item高度给虚拟列表组件 */
  const getSize = (index: number) => {
    if (sizeRef.current && sizeRef.current[index]) {
      return sizeRef.current[index] + 30
    }
    return 80
  }

  /* 发送消息 */
  const handleKeyDown = (value: string) => {
    setTexts(prev => [...prev, { id: 0, texts: value }])
  }

  /* 滚动到最后一个item的位置 */
  const scrollTo = () => {
    if (listRef.current) {
      listRef.current.scrollToItem(texts.length, "end")
    }
  }
  return (
    <Container className="flex-c">
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
        <MiddleWrapper className="flex-c">
          <Messages className="">
            <AutoSizer>
              {({ width, height }) => (
                <VirtualList
                  className="flex flex-jcc"
                  style={{ overflowY: "scroll", scrollBehavior: "smooth" }}
                  height={height}
                  width={width}
                  itemCount={texts.length}
                  itemSize={getSize}
                  innerElementType={ListWrapper}
                  itemData={texts}
                  ref={listRef}
                  overscanCount={20}
                >
                  {({ data, index, style }) => (
                    <RowWrapper className="flex flex-alc" style={style}>
                      <Row data={data} index={index} setSize={setSize} style={style} />
                    </RowWrapper>
                  )}
                </VirtualList>
              )}
            </AutoSizer>
          </Messages>
        </MiddleWrapper>
      </Middle>
      <Bottom className="flex flex-alc flex-jcc">
        <BottomWrapper>
          <MyInput placeholder="ah~" handleKeyDown={handleKeyDown} />
        </BottomWrapper>
      </Bottom>
    </Container>
  )
}

export default MessageWindow

interface RowProps {
  data: textType[]
  index: number
  setSize?: any
  style?: any
}
const Row: React.FC<RowProps> = props => {
  const { data, index, setSize, style } = props
  const rowRef = React.useRef<HTMLDivElement>(null)

  /* 获取每个item元素的高度 */
  React.useEffect(() => {
    setSize(index, rowRef.current?.getBoundingClientRect().height)
  }, [setSize, index])

  return (
    <MessageItem ref={rowRef} className="flex">
      {index % 2 === 0 ? (
        <MessageItemRight className="flex-rr right">
          <MessageAvatar className="flex-c flex-jce">
            <Avatar src={undefined} size="40" />
          </MessageAvatar>
          <MessageRightText>
            {data[index].texts}
            <MessageTextTimeStamp className="flex flex-alc" style={{ color: "#dcdcdc" }}>
              5天前
              <MessageStatus className="flex flex-alc">
                <BsCheck size={20} color="#5fff50" />
                {/* <BiX size={20} color="#ff2323" /> */}
              </MessageStatus>
            </MessageTextTimeStamp>
          </MessageRightText>
        </MessageItemRight>
      ) : (
        <MessageItemLeft className="flex left">
          <MessageAvatar className="flex-c flex-jce">
            <Avatar src={undefined} size="40" />
          </MessageAvatar>

          <MessageLeftText>
            {data[index].texts}
            <MessageTextTimeStamp className="flex flex-alc">
              5天前
              <MessageStatus className="flex flex-alc">
                <BsCheck size={20} color="#00b800" />
                {/* <BiX size={20} color="#d70000" /> */}
              </MessageStatus>
            </MessageTextTimeStamp>
          </MessageLeftText>
        </MessageItemLeft>
      )}
    </MessageItem>
  )
}

const ListWrapper = styled.div`
  position: relative;
  width: calc(100% - 80px) !important;
`
const RowWrapper = styled.div``

const Container = styled.div`
  flex: 1;
`
const UserInfo = styled.div`
  gap: 4px;
`

const Top = styled.div`
  flex: 1;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`
const TopUserInfo = styled.div`
  gap: 14px;
  padding: 10px;
  border-radius: 8px;
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
  overflow: hidden;
`
const MiddleWrapper = styled.div`
  width: 100%;
  height: 100%;
`
const Messages = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.bgcolor};
`
const MessageItem = styled.div`
  width: 100%;
  overflow: hidden;
`
const MessageItemLeft = styled.div`
  width: 100%;
  gap: 20px;
`
const MessageItemRight = styled(MessageItemLeft)``

const MessageAvatar = styled.div``
const MessageLeftText = styled.div`
  max-width: 60%;
  border-radius: 14px 14px 14px 0;
  padding: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: ${props => props.theme.colors.nav_bg};
`
const MessageRightText = styled(MessageLeftText)`
  border-radius: 14px 14px 0 14px;
  color: white;
  background-color: ${props => props.theme.colors.message_bgcolor};
`
const MessageTextTimeStamp = styled.span`
  margin-left: 6px;
  position: relative;
  float: right;
  top: 8px;
  font-size: 13px;
  color: ${props => props.theme.colors.secondary};
`
const MessageStatus = styled.span``
const Bottom = styled.div`
  flex: 1;
`
const BottomWrapper = styled.div`
  width: 70%;
  border-radius: 18px;
  background-color: ${props => props.theme.colors.inputbtn_bg};
`
