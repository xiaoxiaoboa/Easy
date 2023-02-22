import React from "react"
import styled from "styled-components"
import FeedCard from "../../components/FeedCard"
import { MyContext } from "../../context/context"
import { getUserFeeds } from "../../api/feeds.api"
import { useParams } from "react-router-dom"
import { Feed, FeedType } from "../../types/feed.type"
import { UserType } from "../../types/user.type"
import Loading from "../../components/Loading/Loading"
import useRequested from "../../hooks/useRequested"

interface MomentsProps {
  feed_user: UserType
  feeds: FeedType[]
}

const Moments = () => {
  const { state } = React.useContext(MyContext)
  const { user_id } = useParams()
  const [feeds, setFeeds] = React.useState<Feed[]>([])
  const { loading, setLoading } = useRequested()

  React.useEffect(() => {
    if (user_id) {
      getUserFeeds(user_id).then(val => {
        setFeeds(val.data)
        setLoading(true)
      })
    }
  }, [user_id])

  return (
    <Container className="flex-c flex-alc">
      {loading ? (
        feeds.map(item => (
          <FeedCard
            key={item.feed.feed_id}
            feed={item}
            user_info={state.user_info?.result}
          />
        ))
      ) : (
        <Loading />
      )}
    </Container>
  )
}

export default Moments

const Container = styled.div`
  /* width:100%; */
  padding: 20px 0;
  gap: 30px;
`
