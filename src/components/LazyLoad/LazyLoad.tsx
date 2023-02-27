import { useInViewport } from "ahooks"
import React from "react"
import styled from "styled-components"
import { Feed } from "../../types/feed.type"
import { ReducerState } from "../../types/reducer"
import { UserType } from "../../types/user.type"
import FeedCard from "../FeedCard/FeedCard"
import { SkeletonFeed } from "../Skeleton/Skeleton"
import { PhotoProvider } from "react-photo-view"

interface LazyLoadProps {
  data: Feed[]
  theme: "dark" | "light"
  user_info: UserType
  loading: boolean
  threshold?: number
}
type ChildrenRefType = { skeletonRef: () => HTMLDivElement | null }
/* 每次渲染的数量，实际会多1，因为从0算起 */
const renderCount = 6

const LazyLoad: React.FC<LazyLoadProps> = props => {
  const { data, theme, user_info, loading, threshold = 1 } = props

  /* 子组件骨架屏的ref */
  const element = React.useRef<ChildrenRefType>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  /* 骨架屏是否在视口内 */
  const [inViewport] = useInViewport(element.current?.skeletonRef(), {
    threshold: threshold
  })
  /* 需要渲染的数据 */
  const [render, setRender] = React.useState<Feed[]>([])
  /* 需要渲染的数据的在data中的开始索引 */
  const startIndex = React.useRef<number>(0)
  /* 结束索引 */
  const endIndex = React.useRef<number>(renderCount)
  /* 是否还有数据，显示文字 */
  const [nothing, setNothing] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (data.length > 0) {
      const first = new Date(data[0].feed.createdAt)
      const last = new Date(data[data.length - 1].feed.createdAt)
      if (first < last) {
        setRender(prev => [data[data.length - 1], ...prev])
      } else if (data[0].feed.feed_id === data[data.length - 1].feed.feed_id) {
        setData()
      }
    }
  }, [data])

  React.useEffect(() => {
    if (inViewport && !loading) {
      setData()
    }
  }, [inViewport, data])

  const setData = () => {
    /* 截取出来的数据 */
    const renderData = data.slice(startIndex.current, endIndex.current)
    setRender(prev => [...prev, ...renderData])

    /* true则表示还有数据，索引继续变化，否则表示没有数据 */
    if (render.length < data.length) {
      startIndex.current = endIndex.current
      endIndex.current += renderCount
    } else {
      setNothing(true)
      startIndex.current = render.length
      endIndex.current = startIndex.current + renderCount
    }
  }

  return (
    <Container className="flex-c" ref={containerRef}>
      {render.map(item => (
        <PhotoProvider key={item.feed.feed_id}>
          <FeedCard user_info={user_info} feed={item} />
        </PhotoProvider>
      ))}
      {!nothing ? (
        <SkeletonFeed ref={element} theme={theme} />
      ) : (
        <Tip>没有啦！看看别的吧~</Tip>
      )}
    </Container>
  )
}
export default React.memo(LazyLoad)

const Container = styled.div`
  gap: 20px;
`

const Tip = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 10px;
  color: ${props => props.theme.colors.secondary};
`
