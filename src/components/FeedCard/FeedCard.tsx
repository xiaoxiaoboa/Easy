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
import { PhotoProvider, PhotoView } from "react-photo-view"
import { SlDrawer, SlTrash } from "react-icons/sl"
import { feed_fav } from "../../api/feeds.api"
import Confirm from "../Comfirm/Comfirm"

interface FeedCard {
  user_info?: UserType
  feed: FeedType
  handleCancelFav?: (feed_id: string, option: any) => void
  handleDelFav?: (feed_id: string) => void
}
const FeedCard: React.FC<FeedCard> = props => {
  const { user_info, feed, handleCancelFav, handleDelFav } = props
  const [openRightWindow, setOpenRightWindow] = React.useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false)
  const [openComment, setOpenComment] = React.useState<boolean>(false)
  const [isFav, setIsFav] = React.useState<boolean>(
    feed.user_favourites.some(item => item.user_id === user_info?.user_id)
  )

  const selectTag = (data: Feed_attach) => {
    switch (data.type) {
      case "image":
        return (
          <PhotoProvider>
            <PhotoView src={getUnionUrl(data.link)}>
              <img src={getUnionUrl(data.link)} />
            </PhotoView>
          </PhotoProvider>
        )
      case "video":
        return <video src={getUnionUrl(data.link)} controls />
      default:
        break
    }
  }

  /* 根据图片或视频数量生成dom */
  const generateElement = React.useMemo(() => {
    const length = feed.feed_attach.attach.length
    switch (length) {
      case 1:
        return (
          <div className="flex" style={{ flex: "1" }}>
            {selectTag(feed.feed_attach.attach[0])}
          </div>
        )
      case 2:
        return (
          <div
            className="flex"
            style={{ gap: "10px", display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
          >
            <div className="flex image_wrapper">
              {selectTag(feed.feed_attach.attach[0])}
            </div>
            <div className="flex image_wrapper">
              {selectTag(feed.feed_attach.attach[1])}
            </div>
          </div>
        )
      case 3:
        return (
          <div
            className="flex"
            style={{ gap: "10px", display: "grid", gridTemplateColumns: "repeat(2,50%)" }}
          >
            <div className="flex">
              <div className="flex image_wrapper">
                {selectTag(feed.feed_attach.attach[0])}
              </div>
            </div>
            <div className="flex-c flex-alc" style={{ gap: "10px" }}>
              <div className="flex image_wrapper">
                {selectTag(feed.feed_attach.attach[1])}
              </div>
              <div className="flex image_wrapper">
                {selectTag(feed.feed_attach.attach[2])}
              </div>
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
            {feed.feed_attach.attach.map((attach, index) => (
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

  const handleFavourite = () => {
    /* 收藏帖子 */
    feed_fav(feed.feed_id, user_info?.user_id!).then(val => {
      if (val.code === 1) {
        setIsFav(prev => !prev)
        if (handleCancelFav) handleCancelFav(feed.feed_id, !isFav)
      }
    })
  }

  return (
    <FeedCardContainer>
      <FeedCardWrapper className="flex-c">
        <CardTop className="flex-r flex-alc">
          <Avatar src={feed.user.avatar} size="40" id={user_info?.user_id} />
          <div className="cardinfo flex-c">
            <div className="carduser">{feed.user.nick_name}</div>
            <div className="cardtimestamp">{feed.createdAt}</div>
          </div>
          <div
            className="cardfun click flex-r flex-alc"
            onClick={() => setOpenRightWindow(true)}
          >
            <FiMoreHorizontal size="22" className="FiMoreHorizontal" />
          </div>
          {openRightWindow && (
            <CardTopRight
              className="flex-c flex-alc"
              onClick={() => setOpenRightWindow(false)}
            >
              <div
                style={{
                  position: `${openRightWindow ? "fixed" : "static"}`,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1
                }}
                onClick={() => setOpenRightWindow(false)}
              ></div>

              <CardTopRightWrapper>
                <span className="flex flex-alc collect" onClick={handleFavourite}>
                  <SlDrawer />
                  {isFav ? "取消收藏" : "收藏帖子"}
                </span>
                {user_info?.user_id === feed.feed_userID && (
                  <span
                    className="flex flex-alc remove"
                    onClick={() => setOpenConfirm(true)}
                  >
                    <SlTrash />
                    删除帖子
                  </span>
                )}
              </CardTopRightWrapper>
            </CardTopRight>
          )}
        </CardTop>
        <CardContent>
          <TextAndEmoj>{feed.feed_text}</TextAndEmoj>
          <PicAndVid className="flex">{generateElement}</PicAndVid>
        </CardContent>
        <Division />
        <CardFun
          user_id={user_info?.user_id!}
          feed={feed}
          setopenComment={setOpenComment}
        />

        {openComment && (
          <FeedComment
            isOpen={openComment}
            user_info={user_info!}
            feed_id={feed.feed_id}
          />
        )}

        {openConfirm && (
          <Confirm
            setOpenConfirm={setOpenConfirm}
            handlerType={{ type: "feed", data: feed }}
            afteHandler={handleDelFav}
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
  padding: 10px 0;
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
