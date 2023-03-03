import React from "react"
import styled from "styled-components"
import FeedCard from "../../components/FeedCard/FeedCard"
import { MyContext } from "../../context/context"
import { feeds_query } from "../../api/feeds.api"
import { useParams } from "react-router-dom"
import { Feed, FeedType } from "../../types/feed.type"
import { useInViewport } from "ahooks"
import { PhotoProvider } from "react-photo-view"
import { SkeletonFeed } from "../../components/Skeleton/Skeleton"
import { Tip } from "../Home/HomeMiddle"

type ChildrenRefType = { skeletonRef: () => HTMLDivElement | null }
const Moments = () => {
  const { state } = React.useContext(MyContext)
  const { user_id } = useParams()
  const [feeds, setFeeds] = React.useState<FeedType[]>([])
  /* 子组件骨架屏的ref */
  const element = React.useRef<ChildrenRefType>(null)
  /* 是否还有数据，显示文字 */
  const [nothing, setNothing] = React.useState<boolean>(false)
  /* 骨架屏是否在视口内 */
  const [inViewport] = useInViewport(element.current?.skeletonRef(), {
    threshold: 1
  })
  const limit = 10
  const offsetRef = React.useRef<number>(0)

  React.useEffect(() => {
    if (inViewport) {
      feeds_query(user_id!, limit, offsetRef.current).then(val => {
        if (val.code !== 1) return
        if (val.data.length === 0) {
          setNothing(true)
          return
        }

        setFeeds(prev => [...prev, ...val.data])
        offsetRef.current += limit
      })
    }
  }, [inViewport])

  return (
    <Container className="flex-c flex-alc">
      {feeds.map(item => (
        <PhotoProvider key={item.feed_id}>
          <FeedCard user_info={state.user_info?.result} feed={item} />
        </PhotoProvider>
      ))}
      {!nothing && <SkeletonFeed ref={element} theme={state.theme} />}
      {nothing && <Tip>没有啦！看看别的吧~</Tip>}
    </Container>
  )
}

export default Moments

const Container = styled.div`
  /* width:100%; */
  padding: 20px 0;
  gap: 30px;
`
