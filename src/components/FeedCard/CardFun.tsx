import React from "react";
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa";
import { TiArrowForwardOutline } from "react-icons/ti";
import styled from "styled-components"
import useSnackbar from "../../hooks/useSnackbar";
import { UserType } from "../../types/user.type"

const message = "请登录！"
const duration = 3000

/* card点赞、评论、分享功能 */
type CardFunType = { user_info: UserType | undefined }
const CardFun = React.memo(({ user_info }: CardFunType) => {
  const [openSnackbar] = useSnackbar()
  const handleLike = () => {
    if (!user_info) return openSnackbar(message, duration)
    console.log("like")
  }
  const handleShare = () => {
    if (!user_info) return openSnackbar(message, duration)
    console.log("share")
  }
  return (
    <CardFunContainer className="flex flex-alc flex-jcc">
      <div className="like click flex flex-alc flex-jcc" onClick={handleLike}>
        <FaRegThumbsUp size="20" className="FaRegThumbsUp" />赞
      </div>
      <div className="comment flex flex-alc flex-jcc">
        <FaRegComment size="20" className="FaRegComment" />
        评论
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
const CardFunContainer = styled.div`
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
    color: ${props => props.theme.colors.secondary};

    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }
  }
`
