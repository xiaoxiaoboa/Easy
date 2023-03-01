import React from "react"
import { MdDeleteForever } from "react-icons/md"
import styled from "styled-components"
import useSnackbar from "../../hooks/useSnackbar"
import { FeedType } from "../../types/feed.type"
import { UserType } from "../../types/user.type"
import Avatar from "../Avatar/Avatar"
import MyInput from "../MyInput/MyInput"

/* 评论 */
type CommentProps = {
  user_info: UserType | undefined
  feedUser: UserType
  feed: FeedType
}

const message = "请登录！"
const duration = 3000

const FeedComment: React.FC<CommentProps> = props => {
  const { user_info, feedUser, feed } = props
  const [comments, setComment] = React.useState<string[]>(feed.feed_comment.comment)
  const commentsRef = React.useRef<HTMLDivElement>(null)
  const [openSnackbar] = useSnackbar()

  const handleKeyDown = (inputValue: string) => {
    if (!user_info) return openSnackbar(message, duration)
    console.log(inputValue)
  }

  return (
    <CommentContainer>
      <CommentWrapper className="flex-c">
        <p>查看剩余1条评论</p>
        <Comments className="flex-c" ref={commentsRef}>
          {comments.map((comment, index) => (
            <AComment key={index} className="flex">
              <div className="avatar">
                <Avatar src={undefined} size="32" />
              </div>
              <div className="text flex-c">
                <span>Xiaoxin Yuan</span>
                <p>{comment}</p>
              </div>
              <div className="delete click flex flex-alc">
                <span className="flex flex-alc">
                  <MdDeleteForever size="18" className="MdDeleteForever" />
                </span>
              </div>
            </AComment>
          ))}
        </Comments>
        <WriteComment className="flex-r flex-alc">
          <Avatar src={user_info?.avatar} size="32" />
          <CommentInput className="flex-r flex-jce flex-alc">
            <MyInput handleKeyDown={handleKeyDown} placeholder="写下你的评论把~" />
          </CommentInput>
        </WriteComment>
      </CommentWrapper>
    </CommentContainer>
  )
}

export default FeedComment

/* styled */
const CommentContainer = styled.div``
const CommentWrapper = styled.div`
  padding: 0 20px;

  & > p {
    cursor: pointer;
    color: ${props => props.theme.colors.secondary};
    &:hover {
      text-decoration: underline;
    }
  }
`
const WriteComment = styled.div`
  gap: 10px;
  padding: 10px 0;
`
const CommentInput = styled.div`
  background-color: ${props => props.theme.colors.inputbtn_bg};
  border-radius: 22px;
  flex: 1;
`
const Comments = styled.div`
  width: max-content;
  max-width: 100%;
  gap: 10px;
  overflow: hidden;

  &.unfold {
    height: auto;
  }
`
const AComment = styled.div`
  gap: 10px;

  &:hover {
    & .delete {
      & span {
        transform: scale(1);
      }
    }
  }

  & .text {
    padding: 10px;
    border-radius: 16px;
    background-color: ${props => props.theme.colors.inputbtn_bg};

    & span {
      font-size: 13px;
      font-weight: 500;
    }
    & p {
      font-size: 15px;
    }
  }

  & .delete {
    & span {
      padding: 6px;
      border-radius: 50%;
      cursor: pointer;
      transform: scale(0);

      &:hover {
        background-color: ${props => props.theme.colors.inputbtn_bg};
      }

      & .MdDeleteForever {
        color: ${props => props.theme.colors.secondary};
      }
    }
  }
`
