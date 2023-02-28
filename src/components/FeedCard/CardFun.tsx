import React from "react"
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"
import { TiArrowForwardOutline } from "react-icons/ti"
import styled from "styled-components"
import { feed_like } from "../../api/feeds.api"
import useSnackbar from "../../hooks/useSnackbar"
import { FeedType } from "../../types/feed.type"
import { UserType } from "../../types/user.type"

const message = "请登录！"
const duration = 3000

/* card点赞、评论、分享功能 */
type CardFunType = { user_info: UserType | undefined; feed: FeedType }
const CardFun = React.memo(({ user_info, feed }: CardFunType) => {
  const [openSnackbar] = useSnackbar()
  const [likedCount, setLikedCount] = React.useState<number>(feed.feed_likedCount)
  const [isLike, setIsLike] = React.useState<boolean>(
    feed.feed_liked.includes(user_info?.user_id!)
  )

  React.useEffect(() => {
    if (isLike !== feed.feed_liked.includes(user_info?.user_id!)) {
    }
  }, [isLike])

  const handleLike = () => {
    if (!user_info) return openSnackbar(message, duration)
    feed_like({ feed_id: feed.feed_id, user_id: user_info?.user_id! }).then(val => {
      
      if (val.code === 1) {
        setLikedCount(prev => (isLike ? prev - 1 : prev + 1))
        setIsLike(prev => !prev)
      }
    })
  }
  const handleShare = () => {
    if (!user_info) return openSnackbar(message, duration)
    console.log("share")
  }
  return (
    <CardFunContainer liked={isLike} className="flex flex-alc flex-jcc">
      <div className="like click flex flex-alc flex-jcc" onClick={handleLike}>
        {isLike ? (
          <FaThumbsUp size="20" className="FaThumbsUp" />
        ) : (
          <FaRegThumbsUp size="20" />
        )}
        赞 {likedCount > 0 ? `(${likedCount})` : ""}
      </div>
      <div className="comment flex flex-alc flex-jcc">
        <FaRegComment size="20" className="FaRegComment" />
        评论{feed.feed_commentCount > 0 ? `(${feed.feed_commentCount})` : ""}
      </div>
      <div className="share flex flex-alc flex-jcc" onClick={handleShare}>
        <TiArrowForwardOutline size="24" className="TiArrowForwardOutline" />
        分享
      </div>
    </CardFunContainer>
  )
})

export default CardFun

/* styled */
interface CardFunContainerProps {
  liked: boolean
}
const CardFunContainer = styled.div<CardFunContainerProps>`
  width: 100%;
  gap: 4px;
  padding: 4px;
  position: relative;

  & .like,
  & .comment,
  & .share {
    width: 185px;
    gap: 6px;
    padding: 6px 0;
    cursor: pointer;
    border-radius: 6px;
    font-weight: bold;
    color: ${props => props.theme.colors.secondary};

    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }
  }

  & .like {
    color: ${props =>
      props.liked ? props.theme.colors.primary : props.theme.colors.secondary};
  }
`
