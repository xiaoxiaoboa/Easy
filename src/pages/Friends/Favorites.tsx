import { useInViewport } from "ahooks"
import React from "react"
import styled from "styled-components"
import { favourited_feeds } from "../../api/feeds.api"
import FeedCard from "../../components/FeedCard/FeedCard"
import { SkeletonFeed } from "../../components/Skeleton/Skeleton"
import { MyContext } from "../../context/context"
import useRequested from "../../hooks/useRequested"
import { UserFavouritedFeeds } from "../../types/feed.type"
import { Tip } from "../Home/HomeMiddle"

const Favorites = () => {
  const { state } = React.useContext(MyContext)
  const [favFeeds, setFavFeeds] = React.useState<UserFavouritedFeeds[]>([])
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
      favourited_feeds(
        state.user_info?.result.user_id!,
        limit,
        offsetRef.current,
        state.user_info?.token!
      ).then(val => {
        if (val.code !== 1) return
        if (val.data.length === 0) {
          setNothing(true)
          return
        }
        setFavFeeds(val.data)
        offsetRef.current += limit
      })
    }
  }, [inViewport])

  /* 取消收藏时，从列表中删除 */
  const cancelFav = React.useCallback((feed_id: string, isFav: boolean) => {
    !isFav && setFavFeeds(prev => prev.filter(item => item.feed_id !== feed_id))
  }, [])
  const deleteFav = React.useCallback((feed_id: string) => {
    setFavFeeds(prev => prev.filter(item => item.feed_id !== feed_id))
  }, [])

  return (
    <Container>
      <Wrapper className="flex-c flex-alc">
        {favFeeds.map(item => (
          <FeedCard
            key={item.feed_id}
            feed={item.feed}
            user_info={state.user_info!}
            handleCancelFav={cancelFav}
            handleDelFav={deleteFav}
          />
        ))}
        {!nothing && <SkeletonFeed setElement={setElement} theme={state.theme} />}
        {nothing && <Tip>没有啦！看看别的吧~</Tip>}
      </Wrapper>
    </Container>
  )
}

export default Favorites

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const Wrapper = styled.div`
  padding: 30px;
  gap: 30px;
`
