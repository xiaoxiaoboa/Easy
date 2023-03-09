import React from "react"
import { MdDeleteForever } from "react-icons/md"
import styled from "styled-components"
import { comment_publish, feed_comments } from "../../api/feeds.api"
import useSnackbar from "../../hooks/useSnackbar"
import { FeedType, Feed_CommentType } from "../../types/feed.type"
import { InComplateUserType, UserType } from "../../types/user.type"
import Avatar from "../Avatar/Avatar"
import Division from "../Division/Division"
import MyInput from "../MyInput/MyInput"
import { nanoid } from "nanoid"
import getTimeDiff from "../../utils/getTimeDiff"
import useRequested from "../../hooks/useRequested"
import Loading from "../Loading/Loading"
import Confirm from "../Comfirm/Comfirm"

/* 评论 */
type CommentProps = {
  user_info: UserType //登录的用户
  feed_id: string
  isOpen: boolean
}

const message = "请登录！"
const duration = 3000

const FeedComment: React.FC<CommentProps> = props => {
  const { user_info, feed_id, isOpen } = props
  const [comments, setComment] = React.useState<Feed_CommentType[]>([])
  const commentsRef = React.useRef<HTMLDivElement>(null)
  const [openSnackbar] = useSnackbar()
  const { loading, setLoading } = useRequested()
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false)
  const [confirmData, setConfirmData] = React.useState<Feed_CommentType>()

  React.useEffect(() => {
    setLoading(true)
    feed_comments(feed_id).then(val => {
      if (val.code === 1) {
        setComment(val.data)
        setLoading(false)
      }
    })
  }, [feed_id])

  /* 发出评论 */
  const handleKeyDown = (inputValue: string) => {
    if (!user_info) return openSnackbar(message, duration)
    const newComment: Feed_CommentType = {
      feed_id: feed_id,
      comment_id: nanoid(9),
      user_id: user_info.user_id,
      comment: inputValue,
      createdAt: Date(),
      avatar: user_info.avatar,
      nick_name: user_info.nick_name
    }
    const { avatar, nick_name, createdAt, ...res } = newComment
    comment_publish(res).then(val => {
      if (val.code === 1) {
        setComment(prev => [...prev, newComment])
      }
    })
  }

  const handleDelComment = (val: Feed_CommentType) => {
    setConfirmData(val)
    setOpenConfirm(true)
  }

  return (
    <CommentContainer isOpen={isOpen}>
      <Division padding="0 20px" margin="0 0 10px 0" />
      <CommentWrapper className="flex-c">
        {/* <p>查看剩余1条评论</p> */}
        <Comments className="flex-c" ref={commentsRef}>
          {loading && <Loading size={8} />}
          {comments.map(item => (
            <AComment key={item.comment_id} className="flex">
              <div>
                <Avatar src={item.avatar} size="32" id={item.user_id} />
              </div>
              <TextWrapper className="flex-c">
                <div className="flex flex-alc">
                  <TextNickName>{item.nick_name}</TextNickName>
                  <TextTimeStamp>{getTimeDiff(item.createdAt)}</TextTimeStamp>
                </div>
                <Text>{item.comment}</Text>
              </TextWrapper>
              {user_info.user_id === item.user_id && (
                <div
                  className="delete click flex flex-alc"
                  onClick={() => handleDelComment(item)}
                >
                  <span className="flex flex-alc">
                    <MdDeleteForever size="18" className="MdDeleteForever" />
                  </span>
                </div>
              )}
            </AComment>
          ))}
        </Comments>
        {openConfirm && (
          <Confirm
            setOpenConfirm={setOpenConfirm}
            handlerType={{ type: "comment", data: confirmData! }}
            afteHandler={setComment}
          />
        )}
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

type CommentContainerProps = { isOpen: boolean }
/* styled */
const CommentContainer = styled.div<CommentContainerProps>`
  overflow: hidden;
`
const CommentWrapper = styled.div`
  padding: 0 20px;
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
  width: 100%;
  /* max-width: 100%; */
  gap: 10px;
  overflow: hidden;
  margin: 10px 0 4px 0;

  &.unfold {
    height: auto;
  }
`
const TextWrapper = styled.div`
  gap: 4px;
  padding: 8px;
  border-radius: 16px;
  background-color: ${props => props.theme.colors.inputbtn_bg};
`
const TextNickName = styled.span`
  font-size: 13px;
  font-weight: bold;
`
const Text = styled.div`
  font-size: 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
`
const TextTimeStamp = styled.span`
  margin-left: 10px;
  font-size: 12px;
  color: ${props => props.theme.colors.secondary};
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
