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
import useRequested from "../../hooks/useRequested"

const Moments = () => {
  const { state } = React.useContext(MyContext)
  const { user_id } = useParams()
  const [feeds, setFeeds] = React.useState<FeedType[]>([])
  /* 子组件骨架屏的元素 */
  const [element, setElement] = React.useState<HTMLDivElement | null>(null)
  /* 是否还有数据，显示文字 */
  const [nothing, setNothing] = React.useState<boolean>(false)
  /* 骨架屏是否在视口内 */
  const [inViewport] = useInViewport(element, {
    threshold: 1
  })
  const limit = 10
  const offsetRef = React.useRef<number>(0)

  React.useEffect(() => {
    if (inViewport) {
      feeds_query(user_id!, limit, offsetRef.current, state.user_info?.token!).then(
        val => {
          if (val.code !== 1) return
          if (val.data.length === 0) {
            setNothing(true)
            return
          }

          setFeeds(prev => [...prev, ...val.data])
          offsetRef.current += limit
        }
      )
    }
  }, [inViewport])

  return (
    <Container className="flex-c flex-alc">
      {feeds.map(item => (
        <PhotoProvider key={item.feed_id}>
          <FeedCard user_info={state.user_info!} feed={item} />
        </PhotoProvider>
      ))}
      {!nothing && (
        <>
          <SkeletonFeed setElement={setElement} theme={state.theme} />
          <SkeletonFeed theme={state.theme} />
        </>
      )}
      {nothing && <Tip>没有啦！看看别的吧~</Tip>}
    </Container>
  )
}

export default Moments

const Container = styled.div`
  /* width:100%; */
  padding: 20px 0;
  gap: 30px;
  flex: 1;
`
