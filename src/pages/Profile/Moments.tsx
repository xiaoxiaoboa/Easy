import React from "react"
import styled from "styled-components"
import FeedCard from "../../components/FeedCard/FeedCard"
import { MyContext } from "../../context/context"
import { feeds_query } from "../../api/feeds.api"
import { useParams } from "react-router-dom"
import { Feed, FeedType } from "../../types/feed.type"
import { UserType } from "../../types/user.type"
import Loading from "../../components/Loading/Loading"
import useRequested from "../../hooks/useRequested"
import LazyLoad from "../../components/LazyLoad/LazyLoad"

const Moments = () => {
  const { state } = React.useContext(MyContext)
  const { user_id } = useParams()
  const [feeds, setFeeds] = React.useState<Feed[]>([])
  const { loading, setLoading } = useRequested()

  React.useEffect(() => {
    if (user_id) {
      setLoading(true)
      feeds_query(user_id).then(val => {
        setFeeds(val.data)
        setLoading(false)
      })
    }
  }, [user_id])

  return (
    <Container className="flex-c flex-alc">
      <LazyLoad
        data={feeds}
        theme={state.theme}
        user_info={state.user_info?.result!}
        loading={loading}
      />
    </Container>
  )
}

export default Moments

const Container = styled.div`
  /* width:100%; */
  padding: 20px 0;
  gap: 30px;
`
