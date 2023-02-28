import React from "react"
import { FiMoreHorizontal } from "react-icons/fi"
import Avatar from "../Avatar/Avatar"
import styled from "styled-components"
import getUnionUrl from "../../utils/getUnionUrl"
import { UserType } from "../../types/user.type"
import { Feed, FeedType, Feed_attach } from "../../types/feed.type"
import Division from "../Division/Division"
import CardFun from "./CardFun"
import FeedComment from "./FeedComment"
import { PhotoView } from "react-photo-view"
import { SlDrawer, SlTrash } from "react-icons/sl"
import { feed_delete } from "../../api/feeds.api"
import useRequested from "../../hooks/useRequested"
import Loading from "../Loading/Loading"
import { MyContext } from "../../context/context"
import { ActionTypes } from "../../types/reducer"

type FeedCard = { user_info?: UserType; feed: Feed }
const FeedCard: React.FC<FeedCard> = props => {
  const {
    user_info,
    feed: { feed, feed_user }
  } = props
  const [open, setOpen] = React.useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false)

  const selectTag = (data: Feed_attach) => {
    switch (data.attach_type) {
      case "image":
        return (
          <PhotoView src={getUnionUrl(data.attach_link)}>
            <img src={getUnionUrl(data.attach_link)} />
          </PhotoView>
        )
      case "video":
        return <video src={getUnionUrl(data.attach_link)} controls />
      default:
        break
    }
  }

  /* 根据图片或视频数量生成dom */
  const generateElement = React.useMemo(() => {
    const length = feed.feed_attach.length
    switch (length) {
      case 1:
        return (
          <div className="flex" style={{ flex: "1" }}>
            {selectTag(feed.feed_attach[0])}
          </div>
        )
      case 2:
        return (
          <div
            className="flex"
            style={{ gap: "10px", display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
          >
            <div className="flex image_wrapper">{selectTag(feed.feed_attach[0])}</div>
            <div className="flex image_wrapper">{selectTag(feed.feed_attach[1])}</div>
          </div>
        )
      case 3:
        return (
          <div
            className="flex"
            style={{ gap: "10px", display: "grid", gridTemplateColumns: "repeat(2,50%)" }}
          >
            <div className="flex">
              <div className="flex image_wrapper">{selectTag(feed.feed_attach[0])}</div>
            </div>
            <div className="flex-c flex-alc" style={{ gap: "10px" }}>
              <div className="flex image_wrapper">{selectTag(feed.feed_attach[1])}</div>
              <div className="flex image_wrapper">{selectTag(feed.feed_attach[2])}</div>
            </div>
          </div>
        )
      case 4:
        return (
          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateRows: "repeat(2,50%)",
              gridTemplateColumns: "repeat(2,50%)"
            }}
          >
            {feed.feed_attach.map((attach, index) => (
              <div key={index} className="flex">
                {selectTag(attach)}
              </div>
            ))}
          </div>
        )

      default:
        break
    }
  }, [feed])

  return (
    <FeedCardContainer>
      <FeedCardWrapper className="flex-c">
        <CardTop className="flex-r flex-alc">
          <Avatar src={feed_user.avatar} size="40" />
          <div className="cardinfo flex-c">
            <div className="carduser">{feed_user.nick_name}</div>
            <div className="cardtimestamp">{feed.createdAt}</div>
          </div>
          <div className="cardfun click flex-r flex-alc" onClick={() => setOpen(true)}>
            <FiMoreHorizontal size="22" className="FiMoreHorizontal" />
          </div>
          {open && (
            <CardTopRight className="flex-c flex-alc" onClick={() => setOpen(false)}>
              <div
                style={{
                  position: `${open ? "fixed" : "static"}`,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1
                }}
                onClick={() => setOpen(false)}
              ></div>

              <CardTopRightWrapper>
                <span className="flex flex-alc collect">
                  <SlDrawer />
                  收藏帖子
                </span>
                <span
                  className="flex flex-alc remove"
                  onClick={() => setOpenConfirm(true)}
                >
                  <SlTrash />
                  删除帖子
                </span>
              </CardTopRightWrapper>
            </CardTopRight>
          )}
        </CardTop>
        <Division margin="6px 0 0 0" />
        <CardContent>
          <TextAndEmoj>{feed.feed_text}</TextAndEmoj>
          <PicAndVid className="flex">{generateElement}</PicAndVid>
        </CardContent>
        <Division />
        <CardFun user_info={user_info} feed={feed} />
        <Division padding="0 20px" margin="0 0 10px 0" />
        <FeedComment user_info={user_info} feed={feed} feedUser={feed_user} />
        {openConfirm && (
          <Confirm
            setOpenConfirm={setOpenConfirm}
            feed={feed}
            user_id={user_info?.user_id!}
          />
        )}
      </FeedCardWrapper>
    </FeedCardContainer>
  )
}

export default FeedCard

/* styled */
const FeedCardContainer = styled.div`
  width: 600px;
`
const FeedCardWrapper = styled.div`
  padding-top: 10px;
  background-color: ${props => props.theme.colors.nav_bg};
  border-radius: 8px;
  box-shadow: ${props => props.theme.colors.fd_boxshadow};
`
const CardTop = styled.div`
  padding: 0 20px;
  position: relative;
  & .cardinfo {
    margin-left: 10px;
    gap: 4px;
  }
  & .carduser {
    font-size: 14px;
    font-weight: bold;
  }
  & .cardtimestamp {
    font-size: 12px;
    color: ${porps => porps.theme.colors.secondary};
  }
  & .cardfun {
    border-radius: 50%;
    cursor: pointer;
    padding: 6px;
    margin-left: auto;

    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }

    & .FiMoreHorizontal {
      color: ${porps => porps.theme.colors.secondary};
    }
  }
`
const CardTopRight = styled.div``
const CardTopRightWrapper = styled.div`
  background-color: ${props => props.theme.colors.nav_bg};
  box-shadow: ${props => props.theme.colors.fd_toprightboxshadow};
  padding: 10px;
  border-radius: 10px 0 10px 10px;
  position: absolute;
  right: 60px;
  top: 28px;
  z-index: 1;

  & .collect,
  & .remove {
    padding: 10px;
    gap: 10px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.colors.hovercolor};
    }
    &:active {
      background-color: ${props => props.theme.colors.clicked_hovercolor};
    }
  }
`

const CardContent = styled.div`
  width: 100%;
`
const TextAndEmoj = styled.div`
  height: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 10px 20px 12px 20px;
`
const PicAndVid = styled.div`
  user-select: none;
  width: 100%;
  overflow: hidden;
  max-height: 600px;

  & img,
  & video {
    width: 100%;
    object-fit: cover;
  }
`

interface ConfirmProps {
  feed: FeedType
  user_id: string
  setOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>
}
const Confirm: React.FC<ConfirmProps> = props => {
  const { setOpenConfirm, feed, user_id } = props
  const { loading, setLoading, deleteResponse } = useRequested()
  const { state, dispatch } = React.useContext(MyContext)

  const handleConfirm = () => {
    setLoading(true)
    feed_delete({ feed_id: feed.feed_id, user_id }).then(val => {
      deleteResponse(val, () => {
        setLoading(false)
        setOpenConfirm(false)
        dispatch({
          type: ActionTypes.HOME_FEEDS,
          payload: [
            ...state.home_feeds.filter(item => item.feed.feed_id !== feed.feed_id)
          ]
        })
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
