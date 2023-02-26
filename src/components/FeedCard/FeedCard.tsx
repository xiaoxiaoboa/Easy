import React from "react"
import { FiMoreHorizontal } from "react-icons/fi"
import Avatar from "../Avatar/Avatar"
import styled from "styled-components"
import Emoji from "../Emoji"
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa"
import { TiArrowForwardOutline } from "react-icons/ti"
import { MdDeleteForever } from "react-icons/md"
import MyInput from "../MyInput/MyInput"
import getUnionUrl from "../../utils/getUnionUrl"
import useSnackbar from "../../hooks/useSnackbar"
import { UserType } from "../../types/user.type"
import { Feed, FeedType } from "../../types/feed.type"
import Division from "../Division/Division"
import CardFun from "./CardFun"
import FeedComment from "./FeedComment"

type FeedCard = { user_info?: UserType; feed: Feed }
const FeedCard: React.FC<FeedCard> = props => {
  const {
    user_info,
    feed: { feed, feed_user }
  } = props

  React.useEffect(() => {}, [feed])

  const generateElement = React.useMemo(() => {
    const length = feed.feed_attach.length
    switch (length) {
      case 1:
        return (
          <div className="flex image_wrapper">
            <img src={getUnionUrl(feed.feed_attach[0].attach_link)} alt="" />
          </div>
        )
      case 2:
        return (
          <div className="flex" style={{ gap: "10px" }}>
            <div className="flex image_wrapper">
              <img src={getUnionUrl(feed.feed_attach[0].attach_link)} alt="" />
            </div>
            <div className="flex image_wrapper">
              <img src={getUnionUrl(feed.feed_attach[1].attach_link)} alt="" />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="flex" style={{ gap: "10px" }}>
            <div className="flex image_wrapper">
              <img src={getUnionUrl(feed.feed_attach[0].attach_link)} alt="" />
            </div>
            <div className="flex-c flex-alc" style={{ gap: "10px" }}>
              <div className="flex image_wrapper">
                <img src={getUnionUrl(feed.feed_attach[1].attach_link)} alt="" />
              </div>
              <div className="flex image_wrapper">
                <img src={getUnionUrl(feed.feed_attach[2].attach_link)} alt="" />
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="flex" style={{ flexWrap: "wrap", gap: "10px" }}>
            {feed.feed_attach.map((attach, index) => (
              <div key={index} className="flex image_wrapper">
                <img src={getUnionUrl(attach.attach_link)} alt="" />
              </div>
            ))}
          </div>
        )

      default:
        break
    }
  }, [feed])

  return (
    <FeedCardContainer className="feed_card">
      <FeedCardWrapper className="flex-c">
        <CardTop className="flex-r flex-alc">
          <Avatar src={feed_user.avatar} size="40" />
          <div className="cardinfo flex-c">
            <div className="carduser">{feed_user.nick_name}</div>
            <div className="cardtimestamp">{feed.createdAt}</div>
          </div>
          <div className="cardfun click flex-r flex-alc">
            <FiMoreHorizontal size="22" className="FiMoreHorizontal" />
          </div>
        </CardTop>
        <Division margin="6px 0 0 0" />
        <CardContent>
          <TextAndEmoj>{feed.feed_text}</TextAndEmoj>
          <PicAndVid className="flex ">
            {/* {feed.feed_attach.map((attach, index) => (
              <ImageWrapper key={index} className="flex">
                <img src={getUnionUrl(attach.attach_link)} alt="" />
              </ImageWrapper>
            ))} */}
            {generateElement}
          </PicAndVid>
        </CardContent>
        <Division />
        <CardFun user_info={user_info} />
        <Division padding="0 20px" margin="0 0 10px 0" />
        <FeedComment user_info={user_info} feed={feed} feedUser={feed_user} />
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

  & .image_wrapper {
    flex: 1;
    min-width: 290px;
    & img {
      width: 100%;
      object-fit: cover;
    }
  }
`
