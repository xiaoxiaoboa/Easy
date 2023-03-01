import { useInViewport } from "ahooks"
import React from "react"
import styled from "styled-components"
import { Feed, FeedType } from "../../types/feed.type"
import { UserType } from "../../types/user.type"
import FeedCard from "../FeedCard/FeedCard"
import { SkeletonFeed } from "../Skeleton/Skeleton"
import { PhotoProvider } from "react-photo-view"

interface LazyLoadProps {
  data: FeedType[]
  theme: "dark" | "light"
  user_info: UserType
  threshold?: number
}
type ChildrenRefType = { skeletonRef: () => HTMLDivElement | null }
/* 每次渲染的数量 */
const renderCount = 6

const LazyLoad = React.memo((props: LazyLoadProps) => {
  const { data, theme, user_info, threshold = 1 } = props

  /* 子组件骨架屏的ref */
  const element = React.useRef<ChildrenRefType>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  /* 骨架屏是否在视口内 */
  const [inViewport] = useInViewport(element.current?.skeletonRef(), {
    threshold: threshold
  })
  /* 需要渲染的数据的在data中的开始索引 */
  const startIndex = React.useRef<number>(0)
  /* 结束的索引 */
  const [endIndex, setEndIndex] = React.useState<number>(renderCount)
  /* 是否还有数据，显示文字 */
  const [nothing, setNothing] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (inViewport) {
      if (endIndex > data.length) return setNothing(true)
      setEndIndex(prev => prev + renderCount)
    }
  }, [inViewport])

  return (
    <Container className="flex-c" ref={containerRef}>
      {data.slice(startIndex.current, endIndex).map((item, index) => (
        <PhotoProvider key={item.feed_id}>
          <FeedCard user_info={user_info} feed={item} />
        </PhotoProvider>
      ))}
      {nothing && <Tip>没有啦！看看别的吧~</Tip>}
      {!nothing && <SkeletonFeed ref={element} theme={theme} />}
    </Container>
  )
})
export default LazyLoad

const Container = styled.div`
  gap: 20px;
`

const Tip = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  color: ${props => props.theme.colors.secondary};
`
