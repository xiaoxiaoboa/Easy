import React from "react"
import styled from "styled-components"
import { comment_delete, feed_delete } from "../../api/feeds.api"
import { MyContext } from "../../context/context"
import useRequested from "../../hooks/useRequested"
import { FeedType, Feed_CommentType } from "../../types/feed.type"
import { ActionTypes } from "../../types/reducer"
import Loading from "../Loading/Loading"

interface HandlerType {
  type: "feed" | "comment"
  data: FeedType | Feed_CommentType
}

interface ConfirmProps {
  handlerType: HandlerType
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>
  afteHandler?: (...args: any) => void
}
const Confirm: React.FC<ConfirmProps> = props => {
  const {
    setOpenConfirm,
    handlerType: { type, data },
    afteHandler
  } = props
  const { loading, setLoading, requestedOpt } = useRequested()
  const { state, dispatch } = React.useContext(MyContext)

  const handleConfirm = () => {
    switch (type) {
      case "feed":
        deleteFeed()
        break
      case "comment":
        deleteComment()
        break
      default:
        break
    }
  }

  /* 删除帖子 */
  const deleteFeed = () => {
    setLoading(true)
    feed_delete(data.feed_id, state.user_info?.token!).then(val => {
      requestedOpt(val, () => {
        setLoading(false)
        setOpenConfirm(false)

        dispatch({
          type: ActionTypes.HOME_FEEDS,
          payload: [...state.home_feeds.filter(item => item.feed_id !== data.feed_id)]
        })
        if (afteHandler) afteHandler(data.feed_id)
      })
    })
  }

  /* 删除评论 */
  const deleteComment = () => {
    setLoading(true)
    const id = (data as Feed_CommentType).comment_id

    comment_delete(id, state.user_info?.token!).then(val => {
      requestedOpt(val, () => {
        if (afteHandler) {
          setLoading(false)
          setOpenConfirm(false)
          afteHandler((prev: Feed_CommentType[]) =>
            prev.filter(item => item.comment_id !== id)
          )
        }
      })
    })
  }
  return (
    <ConfirmContainer className=" flex flex-alc flex-jcc">
      <ConfirmWrapper className="flex-c flex-alc">
        <Title className="flex-c flex-alc">
          <h2>确定要删除吗？</h2>
          <p>此操作不可恢复！</p>
        </Title>
        {loading && <Loading />}
        {!loading && (
          <Btns className="flex flex-alc">
            <button onClick={() => setOpenConfirm(false)}>取消</button>
            <button onClick={handleConfirm}>确定</button>
          </Btns>
        )}
      </ConfirmWrapper>
    </ConfirmContainer>
  )
}

export default Confirm

const ConfirmContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.publish_layer_color};
`
const ConfirmWrapper = styled.div`
  padding: 10px;
  gap: 20px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.nav_bg};
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.18);
`
const Title = styled.div``

const Btns = styled.div`
  gap: 10px;
  & button {
    outline: none;
    border: none;
    padding: 6px 50px;
    cursor: pointer;
    border-radius: 8px;
    font-size: 18px;

    &:first-child {
      background-color: transparent;
    }
    &:last-child {
      color: white;
      font-weight: bold;
      background-color: ${props => props.theme.colors.primary};
    }
  }
`
